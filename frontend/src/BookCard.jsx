import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function BookCard({ book }) {
    const [selected, setSelected] = useState(false);

    const openForm = () => {
        setSelected(true);
    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const reviewText = formData.get('review-text');
        const rating = formData.get('rating');
        const payload = {
            user_id: parseInt(sessionStorage.getItem('userId')),
            title: book.title,
            author: book.author,
            comment: reviewText,
            rating: parseInt(rating),
        };
        try {
            const response = await fetch('http://localhost:8000/create-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                alert('Review created successfully!');
                setSelected(false); // Hide the form after submission
            } else {
                const errorData = await response.json();
                alert(`Error creating review: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to create review. Please try again later.');
        }
    };

    return (
        <li className="list-group-item book-card">
            <div className="book-card-row">
                <div className="book-card-info">
                    <h5 className="book-title">{book.title}</h5>
                    <p className="book-author">Author: {book.author}</p>
                </div>
                <button className="btn btn-secondary book-select-button" onClick={openForm}>Select</button>
            </div>
            <div style={{ display: selected ? 'block' : 'none' }}>
                <form className="book-review-form mt-3" onSubmit={handleReviewSubmit}>
                    <div className="mb-3">
                        <label htmlFor="review-text" className="form-label">Write your review</label>
                        <textarea className="form-control" id="review-text" name="review-text" rows="3" required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <select className="form-select" id="rating" required>
                            <option value="">Select a rating</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Create Review</button>
                </form>
            </div>
        </li>
    );
}

export default BookCard;