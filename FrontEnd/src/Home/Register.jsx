import "./Register.css";

function Register({ setPage }) {

    async function handleRegister(e) {

        e.preventDefault();

        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim().toLowerCase();
        const password = e.target.password.value;


        try {

            const response = await fetch(
                "http://localhost:5000/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();

            console.log(
                "Register Response:",
                data
            );


            if (!response.ok) {

                alert(data.message);

                return;
            }


            alert(data.message);

            // Go to Login
            setPage("login");


        } catch (error) {

            console.error(
                "Register Error:",
                error
            );

            alert(
                "Cannot connect to backend server"
            );
        }
    }


    return (

        <div className="register-page">

            {/* Navbar */}

            <nav className="register-navbar">

                <h2 className="register-logo">
                    AI Resume Matcher
                </h2>


                <button
                    className="register-home-btn"
                    onClick={() =>
                        setPage("home")
                    }
                >
                    Home
                </button>

            </nav>


            {/* Register */}

            <div className="register-container">

                <div className="register-box">

                    <h1>
                        Register
                    </h1>


                    <form
                        onSubmit={handleRegister}
                    >

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            required
                        />


                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />


                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />


                        <button
                            type="submit"
                            className="register-submit"
                        >
                            Register
                        </button>

                    </form>


                    <p>
                        Already have an account?
                    </p>


                    <button
                        className="login-link"
                        onClick={() =>
                            setPage("login")
                        }
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Register;