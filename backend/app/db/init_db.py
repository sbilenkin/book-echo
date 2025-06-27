from .database import engine
from sqlalchemy import text

def create_tables():
    with engine.connect() as connection:
        connection.execute(text("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(128) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        """))
        connection.execute(text("""
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                book JSONB NOT NULL,
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                status VARCHAR(20) DEFAULT 'pending'
            )
        """))
        connection.commit()

def insert_default_data():
    with engine.connect() as connection:
        result = connection.execute(text("""
            SELECT * FROM users WHERE username = :username
        """), {"username": "sadie"})
        if not result.first():
            connection.execute(text("""
                INSERT INTO users (username, password) VALUES (:username, :password)
            """), {"username": "sadie", "password": "test1"})
            connection.commit()

def init_db():
    create_tables()
    insert_default_data()

if __name__ == "__main__":
    init_db()
    print("Database initialized and default data inserted.")