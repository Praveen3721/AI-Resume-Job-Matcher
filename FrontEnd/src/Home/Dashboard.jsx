import "./Dashboard.css";

function Dashboard({ setPage }) {

    const savedUser = localStorage.getItem("user");

    const user = savedUser
        ? JSON.parse(savedUser)
        : null;


    if (!user) {

        return (
            <div className="dashboard-page">

                <h2>Please login first</h2>

                <button
                    onClick={() => setPage("login")}
                >
                    Login
                </button>

            </div>
        );
    }


    return (

        <div className="dashboard-page">

            

            <nav className="dashboard-navbar">

                <h2>
                    AI Resume Matcher
                </h2>

                <div>

                    <button
                        onClick={() =>
                            setPage("profile")
                        }
                    >
                        Profile
                    </button>

                    <button
                        onClick={() =>
                            setPage("resume")
                        }
                    >
                        Resume
                    </button>

                    <button
                        onClick={() =>
                            setPage("jobs")
                        }
                    >
                        Jobs
                    </button>

                    <button
                        onClick={() => {

                            localStorage.removeItem("user");

                            localStorage.removeItem(
                                "loggedInEmail"
                            );

                            setPage("login");

                        }}
                    >
                        Logout
                    </button>

                </div>

            </nav>

            <main className="dashboard-content">

                <div className="welcome-box">

                    <h1>
                        Welcome, {user.name}
                    </h1>

                    <p>
                        {user.email}
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>
                        My Skills
                    </h2>

                    {user.skills ? (

                        <div className="dashboard-skills">

                            {user.skills
                                .split(",")
                                .map(
                                    (skill, index) => (

                                        <span
                                            key={index}
                                            className="dashboard-skill"
                                        >
                                            {skill.trim()}
                                        </span>

                                    )
                                )}

                        </div>

                    ) : (

                        <p>
                            Upload your resume to
                            detect your skills.
                        </p>

                    )}

                </div>

                <div className="dashboard-card">

                    <h2>
                        Experience
                    </h2>

                    <p>
                        {user.experience ||
                            "Not analyzed yet"}
                    </p>

                </div>

                <div className="dashboard-card">

                    <h2>
                        Resume
                    </h2>

                    <p>
                        Upload your resume to find
                        matching jobs.
                    </p>

                    <button
                        onClick={() =>
                            setPage("resume")
                        }
                    >
                        Upload Resume
                    </button>

                </div>

            </main>

        </div>

    );
}

export default Dashboard;