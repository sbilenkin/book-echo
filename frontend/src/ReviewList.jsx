import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReviewCard from './ReviewCard';
import BookCard from './BookCard';

function ReviewList({ reviews, onReviewUpdated }) {
    const [editingReviewId, setEditingReviewId] = useState(null);

    const handleDelete = async (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            const response = await fetch(`http://localhost:8000/delete-review/${reviewId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                if (onReviewUpdated) onReviewUpdated(); // Refresh the list
            } else {
                alert("Failed to delete review.");
            }
        }
    };

    return (
        <div className="ReviewList">
            <ul className="review-cards list-group">
                {reviews.map((review, index) => 
                    editingReviewId === review.id ? (
                        <BookCard
                            key={index}
                            book={review.book}
                            initialReviewText={review.comment}
                            initialRating={review.rating}
                            onClose={() => setEditingReviewId(null)}
                            editing={true}
                            reviewId={review.id}
                            onReviewUpdated={onReviewUpdated} />
                    ) : (<ReviewCard
                            key={review.id}
                            review={review}
                            onEdit={() => setEditingReviewId(review.id)}
                            onDelete={() => handleDelete(review.id)} />))}
            </ul>
        </div>
    );
}

export default ReviewList;