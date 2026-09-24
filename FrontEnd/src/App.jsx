import { useState } from "react";
import Home from "./Home/Home";
import Login from "./Home/Login";
import Register from "./Home/Register";
import Dashboard from "./Home/Dashboard";
import Jobs from "./Home/Jobs";
import Resume from "./Home/Resume";
import Profile from "./Home/Profile";
function App() {

    const [page, setPage] = useState("home");

     if (page === "login") {
        return <Login setPage={setPage} />;
    }
    if (page === "register") {
        return <Register setPage={setPage} />;
    }
    if(page=== "dashboard")
    {
        return<Dashboard setPage={setPage}/>
    }
    if(page === "jobs")
    {
        return<Jobs setPage={setPage}/>
    }
    if(page === "resume")
    {
        return<Resume setPage={setPage}/>
    }
if(page === "profile")
{
    return <Profile setPage={setPage}/>
}

   return<Home setPage={setPage}/>
}

export default App;