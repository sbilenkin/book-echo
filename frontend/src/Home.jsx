import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BookSearch from './BookSearch';
import ReviewList from './ReviewList';

function Home({ loggedIn, username }) {
    const [addingReview, setAddingReview] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (loggedIn) {
            async function fetchReviews() {
                const response = await fetch(`https://vigilant-chainsaw-r979r9w4xvhwpwx-8000.app.github.dev/reviews?userId=${sessionStorage.getItem('userId')}`);
                if (response.ok) {
                    const data = await response.json();
                    setReviews(data.reviews || []);
                } else {
                    console.error('Failed to fetch reviews');
                }
            }
            fetchReviews();
        }
    }, [loggedIn]);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        window.location.reload();
    };

    const handleAddReview = () => {
        setAddingReview(true);
    }

    return (
        <div className="Home">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">BookEcho</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
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
            <h2>Welcome, {username}</h2>
            {/* will ultimately put a "my books" list on the homepage
            listing book reviews in order of most recent */}
            <div>
                {!addingReview && <button className="btn btn-primary" onClick={handleAddReview}>Add Review</button>}
                <div>
                    {addingReview && <BookSearch onClose={() => setAddingReview(false)} />}
                </div>
            </div>
            <div className="review-list-container">
                <ReviewList element={reviews} />
            </div>
        </div>
    );
}

export default Home;