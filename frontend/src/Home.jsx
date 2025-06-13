import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import BookSearch from './BookSearch';

function Home({ loggedIn, username }) {
    const [addingReview, setAddingReview] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        window.location.reload();
    };

    const handleAddReview = () => {
        setAddingReview(true);
    }

    return (
        <div className="Home">
            {loggedIn && <h2>Welcome, {username}</h2>}
            {/* will ultimately put a "my books" list on the homepage
            listing book reviews in order of most recent */}
            <div>
                {!addingReview && <button className="btn btn-primary" onClick={handleAddReview}>Add Review</button>}
                <div>
                    {addingReview && <BookSearch />}
                </div>
            </div>
            <div>
                <button id="logout-button" className="btn btn-primary" onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    );
}

export default Home;