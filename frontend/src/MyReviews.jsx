import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReviewList from './ReviewList';

function MyReviews({ loggedIn }) {
    const [reviews, setReviews] = React.useState([]);
    const [drafts, setDrafts] = React.useState([]);

    React.useEffect(() => {
        if (loggedIn) {
            async function fetchReviews() {
                console.log('Fetching reviews for user:', sessionStorage.getItem('userId'));
                const response = await fetch(`http://localhost:8000/reviews?user_id=${sessionStorage.getItem('userId')}`);
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data.reviews || []);
                    console.log('Fetched reviews:', data.reviews);
                } else {
                    console.error('Failed to fetch reviews');
                }
            }
            fetchReviews();
            async function fetchDrafts() {
                console.log('Fetching drafts for user:', sessionStorage.getItem('userId'));
                const response = await fetch(`http://localhost:8000/review-drafts?user_id=${sessionStorage.getItem('userId')}`);
                if (response.ok) {
                    const data = await response.json();
                    setDrafts(data.drafts || []);
                    console.log('Fetched drafts:', data.drafts);
                } else {
                    console.error('Failed to fetch drafts');
                }
            }
            fetchDrafts();
        }
    }, [loggedIn]);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        window.location.reload();
    }

    return (
        <div className="MyReviews">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">BookEcho</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="#">My Reviews</a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>
                        <button id="logout-button" className="btn btn-primary ms-auto" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </nav>
            <h2 className="review-heading">My Review Drafts</h2>
            {drafts.length > 0 ? <ReviewList reviews={drafts} /> : <p className="no-reviews">You have no review drafts.</p>}
            <h2 className="review-heading">My Published Reviews</h2>
            {reviews.length > 0 ? <ReviewList reviews={reviews} /> : <p className="no-reviews">You have no published reviews.</p>}
        </div>
    );
}

export default MyReviews;