import 'bootstrap/dist/css/bootstrap.css';

function Home({ loggedIn, username }) {
    const handleLogout = () => {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        window.location.reload();
    };

    return (
        <div className="Home">
            {loggedIn && <h2>Welcome, {username}</h2>}
            {/* will ultimately put a "my books" list on the homepage
            listing book reviews in order of most recent */}
            <button id="logout-button" className="btn btn-primary" onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Home;