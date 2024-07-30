from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import JWTError, jwt
import sqlite3
from typing import List

app = FastAPI()

# CORS Configuration
origins = [
    #"http://3.77.234.169:3000",  # React development server
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE = 'data/nordic_f1.db'
SECRET_KEY = "a-secret-key"  # Replace with a secure key in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Cryptography context for hashing passwords
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Models
class User(BaseModel):
    username: str
    role: str

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str
    role: str
    id: int

class Login(BaseModel):
    username: str
    password: str

class Race(BaseModel):
    id: int
    date: str
    grand_prix: str

class Driver(BaseModel):
    id: int
    position: int
    name: str
    points: int

class IncidentReport(BaseModel):
    id: int
    title: str
    description: str
    status: str
    driver_id: int

class CreateIncidentReport(BaseModel):
    title: str
    description: str
    status: str = "opened"
    driver_id: int

class UpdateIncidentReport(BaseModel):
    description: str
    status: str

class CreateUser(BaseModel):
    username: str
    password: str
    role: str

# Endpoints
@app.post("/token", response_model=Token)
def login(form_data: Login):
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE username = ?", (form_data.username,)).fetchone()
    conn.close()
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user["username"], "role": user["role"], "id": user["id"]}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        role: str = payload.get("role")
        user_id: int = payload.get("id")  # Add id retrieval
        if username is None or role is None or user_id is None:
            raise credentials_exception
        token_data = TokenData(username=username, role=role, id=user_id)
    except JWTError:
        raise credentials_exception
    return token_data

@app.get("/users/me", response_model=User)
def read_users_me(current_user: TokenData = Depends(get_current_user)):
    return {"username": current_user.username, "role": current_user.role}

@app.post("/users/", response_model=User)
def create_user(user: CreateUser):
    if user.role not in ["driver", "steward"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid role. Role must be 'driver' or 'steward'."
        )
    conn = get_db_connection()
    try:
        hashed_password = get_password_hash(user.password)
        conn.execute(
            "INSERT INTO users (username, hashed_password, role) VALUES (?, ?, ?)",
            (user.username, hashed_password, user.role)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists."
        )
    finally:
        conn.close()
    return user

@app.get("/api/calendar", response_model=List[Race])
def read_calendar():
    conn = get_db_connection()
    races = conn.execute('SELECT * FROM races').fetchall()
    conn.close()
    return [dict(race) for race in races]

@app.get("/api/standings", response_model=List[Driver])
def read_standings():
    conn = get_db_connection()
    standings = conn.execute('SELECT * FROM standings').fetchall()
    conn.close()
    return [dict(driver) for driver in standings]

@app.post("/api/report_incident", response_model=IncidentReport)
def report_incident(report: CreateIncidentReport, current_user: TokenData = Depends(get_current_user)):
    if current_user.role != "driver":
        raise HTTPException(status_code=403, detail="Only drivers can report incidents")
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO incidents (title, description, status, driver_id) VALUES (?, ?, ?, ?)',
                   (report.title, report.description, report.status, current_user.id))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {**report.dict(), "id": new_id}

@app.get("/api/incidents", response_model=List[IncidentReport])
def get_incidents(current_user: TokenData = Depends(get_current_user)):
    conn = get_db_connection()
    if current_user.role == "driver":
        # Use driver_id correctly
        incidents = conn.execute('SELECT * FROM incidents WHERE driver_id = ?', (current_user.id,)).fetchall()
    elif current_user.role == "steward":
        incidents = conn.execute('SELECT * FROM incidents').fetchall()
    conn.close()
    return [dict(incident) for incident in incidents]


@app.put("/api/incidents/{incident_id}", response_model=IncidentReport)
def update_incident(incident_id: int, report: UpdateIncidentReport, current_user: TokenData = Depends(get_current_user)):
    if current_user.role != "steward":
        raise HTTPException(status_code=403, detail="Only stewards can update incidents")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE incidents SET description = ?, status = ? WHERE id = ?',
                   (report.description, report.status, incident_id))
    conn.commit()
    updated_report = cursor.execute('SELECT * FROM incidents WHERE id = ?', (incident_id,)).fetchone()
    conn.close()
    if updated_report is None:
        raise HTTPException(status_code=404, detail="Incident not found")
    return dict(updated_report)
