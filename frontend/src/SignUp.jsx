import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

function SignUp() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            toast.success('Sign up successful! You can now log in.');
            setTimeout(() => {
                window.location.href = '/login'; // Redirect to login page after 2 seconds
            }, 2000);
        } else {
            toast.error(data.detail || 'Sign up failed');
        }
    };

    return (
        <div className="SignUp">
            <h2 className="signup-welcome">Welcome to BookEcho!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="username" placeholder="Username" required />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Password" required />
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;