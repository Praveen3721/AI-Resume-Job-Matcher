
require("dotenv").config();


const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const User = require("./User");

const app = express();

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("MONGO_URI starts:", process.env.MONGO_URI?.substring(0, 14));

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000
})
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((error) => {
    console.log("MongoDB Connection Failed");
    console.log(error.message);
});

app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage()
});


const skillsList = [

    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "Java",
    "Python",
    "C",
    "C++",
    "SQL",
    "MySQL",
    "MongoDB",
    "Git",
    "GitHub",
    "Angular",
    "Vue",
    "PHP",
    "Spring Boot",
    "AWS"

];


const jobs = [

    {
        id: 1,
        company: "TCS",
        title: "Java Developer",
        location: "Chennai",
        skills: [
            "Java",
            "Spring Boot",
            "SQL"
        ]
    },

    {
        id: 2,
        company: "Infosys",
        title: "Frontend Developer",
        location: "Chennai",
        skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React"
        ]
    },

    {
        id: 3,
        company: "Zoho",
        title: "Software Developer",
        location: "Chennai",
        skills: [
            "Java",
            "SQL",
            "JavaScript"
        ]
    },

    {
        id: 4,
        company: "Wipro",
        title: "Full Stack Developer",
        location: "Bangalore",
        skills: [
            "React",
            "Node.js",
            "MongoDB"
        ]
    },

    {
        id: 5,
        company: "Accenture",
        title: "Backend Developer",
        location: "Chennai",
        skills: [
            "Java",
            "Node.js",
            "SQL"
        ]
    },

    {
        id: 6,
        company: "HCLTech",
        title: "Java Engineer",
        location: "Chennai",
        skills: [
            "Java",
            "Spring Boot",
            "MySQL"
        ]
    },

    {
        id: 7,
        company: "Cognizant",
        title: "React Developer",
        location: "Chennai",
        skills: [
            "React",
            "JavaScript",
            "HTML",
            "CSS"
        ]
    },

    {
        id: 8,
        company: "Freshworks",
        title: "Web Developer",
        location: "Chennai",
        skills: [
            "JavaScript",
            "React",
            "Node.js"
        ]
    }

];


app.get("/", (req, res) => {

    res.json({

        success: true,

        message:
            "AI Resume Matcher Backend Running"

    });

});


app.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const registerEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: registerEmail
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email Already Registered"
            });
        }

        const newUser = new User({
            name: name.trim(),
            email: registerEmail,
            password: password,
            skills: "",
            experience: ""
        });

        await newUser.save();

        res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (error) {

        console.log("Registration Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Registration Failed",
            error: error.message
        });
    }
});


// ======================================
// REGISTER TEST
// ======================================

app.get("/register", (req, res) => {

    res.json({

        success: true,

        message:
            "Register API is Working"

    });

});

app.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email) {

            return res.status(400).json({

                success: false,

                message: "Email is required"

            });

        }
        if (!password) {

            return res.status(400).json({

                success: false,

                message: "Password is required"

            });

        }


        // Convert email
        const loginEmail =
            email.trim().toLowerCase();


    
        const user =
            await User.findOne({
                email: loginEmail
            });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }


  
        if (user.password !== password) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email or Password"

            });

        }

        const userData = {

            id: user._id,

            name: user.name,

            email: user.email,

            skills: user.skills,

            experience: user.experience

        };


        console.log(
            "USER LOGIN:",
            user.email
        );


        res.json({

            success: true,

            message: "Login Successful",

            user: userData

        });


    } catch (error) {

        console.log(
            "Login Error:",
            error.message
        );


        res.status(500).json({

            success: false,

            message: "Login Failed"

        });

    }

});

app.get("/login", (req, res) => {

    res.json({

        success: true,

        message:
            "Login API is Working"

    });

});

app.get("/jobs", (req, res) => {

    res.json({

        success: true,

        jobs: jobs

    });

});


// ======================================
// UPDATE RESUME DATA
// ======================================

app.post("/resume", (req, res) => {

    const {
        email,
        skills,
        experience
    } = req.body;


    if (!email) {

        return res.status(400).json({

            success: false,

            message:
                "Email is required"

        });

    }


    

    res.json({

        success: true,

        message:
            "Resume Updated Successfully",

        user: user

    });

});


app.post(
    "/analyze-resume",
    upload.single("resume"),
    async (req, res) => {

        try {

            // ------------------------------
            // Check PDF
            // ------------------------------

            if (!req.file) {

                return res.status(400).json({
                    success: false,
                    message: "Please upload a PDF file"
                });

            }


            // ------------------------------
            // Get email
            // ------------------------------

            const email =
                req.body.email?.trim().toLowerCase();


            if (!email) {

                return res.status(400).json({
                    success: false,
                    message: "Email is required"
                });

            }


            // ------------------------------
            // Find user in MongoDB
            // ------------------------------

            const user =
                await User.findOne({
                    email: email
                });


            if (!user) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }


            // ------------------------------
            // Read PDF
            // ------------------------------

            const parser = new PDFParse({
                data: req.file.buffer
            });


            const result =
                await parser.getText();


            const resumeText =
                result.text;


            await parser.destroy();


            // ------------------------------
            // Convert text to lowercase
            // ------------------------------

            const lowerText =
                resumeText.toLowerCase();


            // ------------------------------
            // Find skills
            // ------------------------------

            const matchedSkills =
                skillsList.filter(
                    skill =>
                        lowerText.includes(
                            skill.toLowerCase()
                        )
                );


            // ------------------------------
            // Save skills
            // ------------------------------

            user.skills =
                matchedSkills.join(", ");


            // ------------------------------
            // Find experience
            // ------------------------------

            let experience =
                "Fresher";


            if (
                lowerText.includes("fresher") ||
                lowerText.includes("fresh graduate") ||
                lowerText.includes("recent graduate") ||
                lowerText.includes("no experience")
            ) {

                experience =
                    "Fresher";

            }

            else {

                const match =
                    resumeText.match(
                        /(\d+(?:\.\d+)?)\s*\+?\s*(years?|yrs?)/i
                    );


                if (match) {

                    experience =
                        `${match[1]} Years Experienced`;

                }

                else if (
                    lowerText.includes("work experience") ||
                    lowerText.includes("professional experience")
                ) {

                    experience =
                        "Experienced";

                }

            }


            // ------------------------------
            // Save experience
            // ------------------------------

            user.experience =
                experience;


            // ------------------------------
            // Save to MongoDB
            // ------------------------------

            await user.save();


            // ------------------------------
            // Match jobs
            // ------------------------------

            const matchedJobs =
                jobs.map(job => {

                    const jobMatchedSkills =
                        job.skills.filter(
                            skill =>
                                matchedSkills.some(
                                    userSkill =>
                                        userSkill
                                            .toLowerCase() ===
                                        skill.toLowerCase()
                                )
                        );


                    const percentage =
                        Math.round(
                            (
                                jobMatchedSkills.length /
                                job.skills.length
                            ) * 100
                        );


                    return {

                        ...job,

                        matchedSkills:
                            jobMatchedSkills,

                        matchPercentage:
                            percentage

                    };

                });


            // ------------------------------
            // Sort jobs
            // ------------------------------

            matchedJobs.sort(
                (a, b) =>
                    b.matchPercentage -
                    a.matchPercentage
            );
            const userData = {

                id: user._id,

                name: user.name,

                email: user.email,

                skills: user.skills,

                experience: user.experience

            };

            res.json({

                success: true,

                message:
                    "Resume Analyzed Successfully",

                user:
                    userData,

                resumeText:
                    resumeText,

                matchedSkills:
                    matchedSkills,

                experience:
                    experience,

                jobs:
                    matchedJobs

            });

        }

        catch (error) {

            console.log(
                "Resume Analysis Error:",
                error.message
            );


            res.status(500).json({

                success: false,

                message:
                    "Resume Analysis Failed",

                error:
                    error.message

            });

        }

    }
);
app.post("/match", (req, res) => {

    const {
        skills
    } = req.body;


    if (
        !skills ||
        skills.length === 0
    ) {

        return res.status(400).json({

            success: false,

            message:
                "No Skills Found"

        });

    }


    // Convert user skills
    const userSkills =
        skills.map(

            skill =>
                skill.toLowerCase()

        );


    // Match jobs
    const matchedJobs =
        jobs.map(job => {


            const matchedSkills =
                job.skills.filter(

                    skill =>

                        userSkills.includes(

                            skill.toLowerCase()

                        )

                );


            const percentage =
                Math.round(

                    (

                        matchedSkills.length
                        /
                        job.skills.length

                    ) * 100

                );


            return {

                ...job,

                matchedSkills:
                    matchedSkills,

                matchPercentage:
                    percentage

            };

        });


    // Sort
    matchedJobs.sort(

        (a, b) =>

            b.matchPercentage -
            a.matchPercentage

    );


    res.json({

        success: true,

        jobs:
            matchedJobs

    });

});


// ======================================
// TEST
// ======================================

app.get("/test", (req, res) => {

    res.json({

        success: true,

        message:
            "TEST route Working"

    });

});


// ======================================
// ERROR HANDLER
// ======================================

app.use(
    (err, req, res, next) => {

        console.log(
            "MULTER ERROR:"
        );

        console.log(err);

        console.log(
            "FIELD RECEIVED:",
            err.field
        );


        if (
            err instanceof
            multer.MulterError
        ) {

            return res.status(400).json({

                success: false,

                message:
                    err.message,

                field:
                    err.field

            });

        }


        res.status(500).json({

            success: false,

            message:
                "Server Error",

            error:
                err.message

        });

    }
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`AI Resume Matcher Server Running on port ${PORT}`);
});