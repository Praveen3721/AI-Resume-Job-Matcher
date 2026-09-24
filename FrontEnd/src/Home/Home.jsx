import "./Home.css";

function Home({ setPage }) {

    return (
        <div className="home">

            <nav className="navbar">

                <h2 className="logo">
                    AI Resume Matcher
                </h2>

                <div className="nav-buttons">

                    <button
                        className="nav-login"
                        onClick={() => setPage("login")}
                    >
                        Login
                    </button>

                    <button
                        className="nav-register"
                        onClick={() => setPage("register")}
                    >
                        Register
                    </button>

                </div>

            </nav>


         

            <main className="home-main">

                <div className="home-text">

                    <h1 className="home-title">
                        AI-Powered Resume Job Matcher
                    </h1>

                    <p className="home-description">
                        Find the right job using your resume and skills.
                        Our system analyzes your skills and finds suitable
                        job opportunities.
                    </p>

                </div>


            

                <div className="home-image-container">

                    <img
                        src="https://img.freepik.com/free-vector/resume-concept-illustration_114360-545.jpg"
                 alt="Resume Illustration"
               className="home-image"
                    />

                </div>

            </main>

        </div>
    );
}

export default Home;