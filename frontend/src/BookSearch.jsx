import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BookCard from './BookCard';

function BookSearch({ onClose }) {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('book-title');
        if (!title) {
            console.error('Title is required');
            return;
        }
        const response = await fetch(`http://localhost:8000/book-search?title=${encodeURIComponent(title)}`);
        if (response.ok) {
            const data = await response.json();
            const cleanedBooks = (data.books || []).map(book => ({
                title: book.title || 'Unknown Title',
                author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
            }));
            setBooks(cleanedBooks);
            console.log(cleanedBooks)
        } else {
            console.error('Failed to fetch books');
        }
    };

    const handleClose = () => {
        setSearch('');
        setBooks([]);
        onClose();
    }

    return (
        <div className="BookSearch">
            <form onSubmit={handleSearch}>
                <div>
                    <label htmlFor="book-title">Search for a book</label>
                </div>
                <div>
                    <input id="book-title" type="text" value={search} onChange={e => setSearch(e.target.value)} name="book-title"></input>
                </div>
                <button className="close-button" onClick={handleClose}>x</button>
                <div>
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </form>
            <ul className="list-group">
                {books.map((book, idx) => <BookCard id={`book${idx}`} book={book} />)}
            </ul>
        </div>
    );
}

export default BookSearch;