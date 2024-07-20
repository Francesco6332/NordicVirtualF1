-- schema.sql
CREATE TABLE races (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    grand_prix TEXT NOT NULL
);

CREATE TABLE standings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    position INTEGER NOT NULL,
    name TEXT NOT NULL,
    points INTEGER NOT NULL
);

CREATE TABLE incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL
);

-- Table for storing users
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    hashed_password TEXT NOT NULL,
    role TEXT CHECK(role IN ('driver', 'steward', 'admin')) NOT NULL
);
