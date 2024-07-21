import sqlite3

conn = sqlite3.connect('data/nordic_f1.db')

conn.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    role TEXT NOT NULL
)
''')

conn.execute('''
CREATE TABLE IF NOT EXISTS races (
    id INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    grand_prix TEXT NOT NULL
)
''')

conn.execute('''
CREATE TABLE IF NOT EXISTS standings (
    id INTEGER PRIMARY KEY,
    position INTEGER NOT NULL,
    name TEXT NOT NULL,
    points INTEGER NOT NULL
)
''')

conn.execute('''
CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    driver_id INTEGER NOT NULL,
    FOREIGN KEY (driver_id) REFERENCES users(id)
)
''')

conn.close()
