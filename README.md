# BookEcho

**BookEcho** is a book reviewing platform where users can record ratings and comments of books they've read. It is a full-stack application that uses PostgreSQL, Python with FastAPI, and React.js.

## Features

- User authentication and account creation
- Search for books by title
- Star ratings and written reviews

### Search for books
![Book search screen](https://github.com/user-attachments/assets/3ac12966-5c4f-40a2-bf0a-f9f289d8394d)

### Rate and review
![Star ratings and written reviews](https://github.com/user-attachments/assets/104be84e-f6b2-44ff-a71d-f4a079233925)

## Tech Stack

### Frontend
- React (with Vite)
- Bootstrap 5

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- Docker

## How to Use
### 1. Clone the repo
    git clone https://github.com/your-username/book-echo.git
    cd book-echo
### 2. Create a `.env` file
Create a file named `.env` in the root folder containing the following:

    POSTGRES_USER=devuser
    POSTGRES_PASSWORD=devpass
    POSTGRES_DB=devdb

### 3. Start the backend, database, and frontend

    docker-compose up --build

Visit [http://localhost:5173](http://localhost:5173)

