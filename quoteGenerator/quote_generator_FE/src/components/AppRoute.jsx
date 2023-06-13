import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Signin from "./auth/signin";
import Signup from "./auth/signup";

const AppRoute = () =>{
    return(
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<React.Fragment><Signup /></React.Fragment>} />
                <Route path="/signin" element={<Signin />} />
            </Routes>
        </div>
    </Router>
    )
}

export default AppRoute;