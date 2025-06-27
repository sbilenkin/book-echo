import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

function BookCard({ book, initialReviewText = '', initialRating = '', onClose, editing = false, reviewId = null, onReviewUpdated }) {
    const [selected, setSelected] = useState(editing);
    const [reviewText, setReviewText] = useState(initialReviewText);
    const [rating, setRating] = useState(initialRating);

    const openForm = () => {
        setSelected(true);
    };

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const reviewText = formData.get('review-text');
        const rating = formData.get('rating');
        const status = formData.get('status');
        const payload = {
            user_id: parseInt(sessionStorage.getItem('userId')),
            title: book.title,
            author: book.author,
            cover_i: book.cover_i,
            comment: reviewText,
            rating: parseInt(rating),
            status,
        };
        console.log(payload);
        const url = editing
            ? `http://localhost:8000/edit-review/${reviewId}`
            : 'http://localhost:8000/create-review';
        const method = editing ? 'PUT' : 'POST';
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                toast.success('Review updated successfully!');
                setSelected(false);
                if (onClose) onClose();
                if (onReviewUpdated) onReviewUpdated();
            } else {
                const errorData = await response.json();
                toast.error(`Error creating review: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to create review. Please try again later.');
        }
    };

    return (
        <li className="list-group-item book-card">
            <div className="book-card-row">
                {book.cover_url && (<img src={book.cover_url}
                    alt={`Cover for ${book.title}`}
                    className="book-cover" />)}
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
                        <textarea className="form-control" id="review-text" name="review-text" rows="3" required
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <select name="rating" className="form-select" id="rating" required
                        value={rating} onChange={e => setRating(e.target.value)}>
                            <option value="">Select a rating</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <input type="hidden" id="review-status" name="status" value="finished"></input>
                    <button type="submit"
                        className="btn btn-primary"
                        onClick={() => document.getElementById('review-status').value = 'finished'}>
                        Create Review</button>
                    <button type="submit"
                        className="btn btn-primary ms-2"
                        onClick={() => document.getElementById('review-status').value = 'draft'}>
                        Save Draft</button>
                    {onClose && (
                        <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
                            Cancel
                        </button>
                    )}
                </form>
            </div>
        </li>
    );
}

export default BookCard;