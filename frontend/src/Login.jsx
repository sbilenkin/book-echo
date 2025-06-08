import 'bootstrap/dist/css/bootstrap.css';

function Login() {
    return (
        <div className="Login">
            <form action="https://organic-space-engine-qrvr9r6pwjc9q76-8000.app.github.dev/login" method="POST">
                <div>
                    <label for="username">Username </label>
                    <input id="username" type="text" name="username" required />
                </div>
                <div>
                    <label for="password">Password </label>
                    <input id="password" type="password" name="password" required />
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login