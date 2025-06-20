from fastapi import FastAPI, Depends, HTTPException, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.orm import Session
from pydantic import BaseModel
import requests
import json

from app.db.database import SessionLocal

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:5173"],
    allow_origins=["*"],  # Allow all origins for development; restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ReviewCreate(BaseModel):
    user_id: int
    title: str
    author: str
    cover_i: int | None = None
    comment: str
    rating: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Database health check endpoint, will remove in prod
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
    ).mappings().fetchone()
    if user:
        return {"message": "Login successful", "user": user}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/signup")
def signup(
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    # db query to create a new user
    try:
        db.execute(
            text("INSERT INTO users (username, password) VALUES (:username, :password)"),
            {"username": username, "password": password}
        )
        db.commit()
        return {"message": "User created successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/book-search")
def book_search(title: str = Query(...)):
    openlibrary_url = f"https://openlibrary.org/search.json?title={title}"
    try:
        response = requests.get(openlibrary_url)
        response.raise_for_status()  # Raises an HTTPError if the response was unsuccessful
        data = response.json()
        books = []
        for doc in data.get("docs", []):
            cover_i = doc.get("cover_i")
            cover_url = (
                f"https://covers.openlibrary.org/b/id/{cover_i}-M.jpg"
                if cover_i else None
            )
            books.append({
                "title": doc.get("title"),
                "author_name": doc.get("author_name", []),
                "cover_i": cover_i,
                "cover_url": cover_url,
            })
        return {"books": books}
    except requests.RequestException as e:
        return {"error": str(e)}

@app.post("/create-review")
def create_review(
    review: ReviewCreate, db: Session = Depends(get_db)
):
    book_json = json.dumps({"title": review.title, "author": review.author, "cover_i": review.cover_i})
    try:
        db.execute(
            text("INSERT INTO reviews (user_id, book, rating, comment) VALUES (:user_id, :book, :rating, :comment)"),
            {"user_id": review.user_id, "book": book_json, "rating": review.rating, "comment": review.comment}
        )
        db.commit()
        return {"message": "Review created successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/reviews")
def get_reviews(user_id: int = Query(...), db: Session = Depends(get_db)):
    try:
        print(f"Fetching reviews for user_id: {user_id}")
        reviews = db.execute(
            text("SELECT * FROM reviews WHERE user_id = :user_id"),
            {"user_id": user_id}
        ).mappings().fetchall()
        return {"reviews": reviews}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))