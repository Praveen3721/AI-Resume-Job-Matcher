import { useEffect, useState } from "react";
import "./Jobs.css";

function Jobs({ setPage }) {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function findJobs() {

            try {
                const savedUser =
                    localStorage.getItem("user");

                if (!savedUser) {
                    alert("Please login first");
                    setPage("login");
                    return;
                }


                const user = JSON.parse(savedUser);


                const userSkills = user?.skills
                    ? user.skills
                        .split(",")
                        .map(skill => skill.trim())
                        .filter(skill => skill !== "")
                    : [];


              
                if (userSkills.length === 0) {

                    setJobs([]);
                    setLoading(false);

                    return;
                }

                const response = await fetch(
                    "https://ai-resume-job-matcher-ardp.onrender.com/match",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            skills: userSkills
                        })
                    }
                );


                const data = await response.json();


                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Job matching failed"
                    );
                }


                console.log(
                    "Job Match Response:",
                    data
                );


                setJobs(data.jobs || []);

            } catch (error) {

                console.error(
                    "Job matching error:",
                    error
                );

                alert(
                    "Unable to connect to backend"
                );

            } finally {

                setLoading(false);
            }
        }


        findJobs();

    }, [setPage]);


    return (

        <div className="jobs-page">

            <nav className="jobs-navbar">

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

            <main className="jobs-content">

                <h1>
                    Jobs Matching Your Resume
                </h1>

                <p>
                    Jobs are ranked according to your resume skills.
                </p>

                {loading && (
                    <h3>
                        Finding Matching Jobs...
                    </h3>
                )}

                {!loading && jobs.length === 0 && (

                    <div className="no-jobs">

                        <h2>
                            No Resume Skills Found
                        </h2>

                        <p>
                            Upload your resume first
                            to find matching jobs.
                        </p>


                        <button
                            onClick={() =>
                                setPage("resume")
                            }
                        >
                            Upload Resume
                        </button>

                    </div>
                )}

                {!loading && jobs.length > 0 && (

                    <div className="jobs-list">

                        {jobs.map(job => (

                            <div
                                className="job-card"
                                key={job.id}
                            >

                                <h2>
                                    {job.title}
                                </h2>


                                <h3>
                                    {job.company}
                                </h3>


                                <p>
                                    Location:{" "}
                                    {job.location}
                                </p>


                                <p>
                                    Required Skills:{" "}
                                    {job.skills.join(", ")}
                                </p>


                                <p>
                                    Matched Skills:{" "}

                                    {job.matchedSkills &&
                                    job.matchedSkills.length > 0
                                        ? job.matchedSkills.join(", ")
                                        : "None"
                                    }
                                </p>


                                <h3>
                                    Resume Match:{" "}
                                    {job.matchPercentage}%
                                </h3>


                                <button>
                                    View Job
                                </button>

                            </div>

                        ))}

                    </div>
                )}


                <button
                    className="back-button"
                    onClick={() =>
                        setPage("dashboard")
                    }
                >
                    Back to Dashboard
                </button>

            </main>

        </div>
    );
}

export default Jobs;