import "./Login.css";

function Login({ setPage }) {

    async function handleLogin(e) {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {

            const response = await fetch(
                "https://ai-resume-job-matcher-ardp.onrender.com/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log("Login Response:", data);

            if (!response.ok) {
                alert(data.message);
                return;
            }

        
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            
            localStorage.setItem(
                "loggedInEmail",
                data.user.email
            );

            alert(data.message);

          
            setPage("dashboard");

        } catch (error) {

            console.error("Login Error:", error);

            alert(
                "Cannot connect to backend server"
            );
        }
    }
    return (
        <div className="login-page">

            <nav className="navbar">

                <h2 className="logo">
                    AI Resume Matcher
                </h2>

                <button
                    className="home-btn"
                    onClick={() => setPage("home")}
                >
                    Home
                </button>

            </nav>


            {/* Login */}

            <div className="login-container">

                <div className="login-box">

                    <h1>Login</h1>

                    <form onSubmit={handleLogin}>

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />


                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />


                        <button
                            type="submit"
                            className="login-submit"
                        >
                            Login
                        </button>

                    </form>


                    <p>
                        Don't have an account?

                        <button
                            className="register-link"
                            onClick={() => setPage("register")}
                        >
                            Register
                        </button>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;