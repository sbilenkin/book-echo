import 'bootstrap/dist/css/bootstrap.css';

function Home({ loggedIn, username }) {
    const handleLogout = () => {
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        window.location.reload(); // Reload to reflect the changes
    };

    return (
        <div className="Home">
            {loggedIn && <h2>Welcome, {username}</h2>}
            <button className="btn btn-primary" onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default Home;