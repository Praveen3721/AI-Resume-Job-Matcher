import "./Profile.css";

function Profile({ setPage }) {

    const savedUser =
        localStorage.getItem("user");

    const user =
        savedUser
            ? JSON.parse(savedUser)
            : null;


    if (!user) {

        return (
            <div className="profile-page">

                <h2>Please login first</h2>

                <button
                    onClick={() => setPage("login")}
                >
                    Login
                </button>

            </div>
        );
    }


    const skills =
        user.skills
            ? user.skills.split(",")
            : [];


    return (

        <div className="profile-page">

            <nav className="profile-navbar">

                <h2>
                    AI Resume Matcher
                </h2>

                <button
                    onClick={() =>
                        setPage("dashboard")
                    }
                >
                    Dashboard
                </button>

            </nav>


            <div className="profile-box">

                <h1>
                    My Profile
                </h1>


                <div className="profile-info">

                    <h3>
                        Name
                    </h3>

                    <p>
                        {user.name}
                    </p>


                    <h3>
                        Email
                    </h3>

                    <p>
                        {user.email}
                    </p>


                    <h3>
                        Experience
                    </h3>

                    <p>
                        {user.experience || "Not analyzed yet"}
                    </p>


                    <h3>
                        Skills
                    </h3>

                    {skills.length > 0 ? (

                        <div className="profile-skills">

                            {skills.map(
                                (skill, index) => (

                                    <span
                                        key={index}
                                        className="skill"
                                    >
                                        {skill.trim()}
                                    </span>

                                )
                            )}

                        </div>

                    ) : (

                        <p>
                            No skills found yet
                        </p>

                    )}

                </div>


                <button
                    onClick={() =>
                        setPage("resume")
                    }
                >
                    Upload Resume
                </button>


                <button
                    onClick={() =>
                        setPage("dashboard")
                    }
                >
                    Back to Dashboard
                </button>

            </div>

        </div>

    );
}

export default Profile;