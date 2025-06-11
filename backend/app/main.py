from fastapi import FastAPI, Depends, HTTPException, Form
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.db.database import SessionLocal

app = FastAPI()

# Database check
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health")
def health_check(db: Session = Depends(get_db)):
    try:
        db.execute(text("SELECT 1"))
        return {"status": "ok"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}

@app.post("/login")
def login(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    # db query to check user credentials
    user = db.execute(
        text("SELECT * FROM users WHERE username = :username AND password = :password"),
        {"username": username, "password": password}
    ).fetchone()
    if user:
        return {"message": "Login successful", "user": user}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")