import { useState } from "react";
import "./Resume.css";

function Resume({ setPage }) {

    const [file, setFile] = useState(null);
    const [skills, setSkills] = useState([]);
    const [experience, setExperience] = useState("");
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);


  

    function handleFileChange(e) {

        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            return;
        }

        setFile(selectedFile);
    }


   

    async function handleUpload() {

    if (!file) {
        alert("Please select a resume");
        return;
    }

    if (file.type !== "application/pdf") {
        alert("Please upload a PDF");
        return;
    }

    const loggedInEmail =
        localStorage.getItem("loggedInEmail");

    if (!loggedInEmail) {
        alert("Please login first");
        setPage("login");
        return;
    }

    setLoading(true);

    try {

        const formData = new FormData();

        formData.append("resume", file);
        formData.append("email", loggedInEmail);

        const response = await fetch(
            "http://localhost:5000/analyze-resume",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        console.log("Backend Response:", data);

        if (!response.ok) {
            throw new Error(
                data.message ||
                "Resume analysis failed"
            );
        }

        setSkills(
            data.matchedSkills || []
        );


        

        setExperience(
            data.experience || ""
        );


       

        setJobs(
            data.jobs || []
        );




        if (data.user) {

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

        }


        alert(
            "Resume analyzed successfully!"
        );

    }

    catch (error) {

        console.error(
            "Resume analysis error:",
            error
        );

        alert(
            "Resume analysis failed: " +
            error.message
        );

    }

    finally {

        setLoading(false);

    }
}


    return (

        <div className="resume-page">


            {/* Navbar */}

            <nav className="resume-navbar">

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


            {/* Resume Content */}

            <main className="resume-content">

                <div className="resume-box">

                    <h1>
                        Upload Resume
                    </h1>


                    <p>
                        Upload your PDF resume to
                        find skills and matching jobs.
                    </p>


                    {/* File */}

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                    />


                    {/* Upload */}

                    <button
                        className="upload-button"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading
                            ? "Analyzing..."
                            : "Upload Resume"
                        }
                    </button>


                    {/* Skills */}

                    {skills.length > 0 && (

                        <div className="skills-result">

                            <h2>
                                Skills Found
                            </h2>


                            {skills.map(
                                (skill, index) => (

                                    <span
                                        className="skill"
                                        key={index}
                                    >
                                        {skill}
                                    </span>

                                )
                            )}

                        </div>

                    )}


                    {/* Experience */}

                    {experience && (

                        <div className="experience-result">

                            <h2>
                                Experience
                            </h2>


                            <p>
                                {experience}
                            </p>

                        </div>

                    )}


                    {/* Jobs */}

                    {jobs.length > 0 && (

                        <div className="jobs-result">

                            <h2>
                                Job Matches
                            </h2>


                            {jobs.map((job) => (

                                <div
                                    className="job-card"
                                    key={job.id}
                                >

                                    <h3>
                                        {job.company}
                                    </h3>


                                    <p>
                                        {job.title}
                                    </p>


                                    <p>
                                        Location:{" "}
                                        {job.location}
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
                                        Match:{" "}
                                        {job.matchPercentage}%
                                    </h3>

                                </div>

                            ))}

                        </div>

                    )}


                    {/* Profile */}

                    <button
                        className="profile-button"
                        onClick={() =>
                            setPage("profile")
                        }
                    >
                        View My Profile
                    </button>


                    {/* Dashboard */}

                    <button
                        className="back-button"
                        onClick={() =>
                            setPage("dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                </div>

            </main>

        </div>
    );
}

export default Resume;