import 'bootstrap/dist/css/bootstrap.css';

function Home({loggedIn}) {
    return (
        <div className="Home">
            Home page!!!!!
            {loggedIn ? <div>Logged in</div> : <div>Not logged in</div>}
        </div>
    );
}

export default Home;