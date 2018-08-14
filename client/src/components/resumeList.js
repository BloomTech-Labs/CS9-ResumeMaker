import React, { Component } from 'react';
import { Route } from "react-router-dom";
import SideBar from "./subComponents/sidebar";
import Navbar from "./subComponent/navbar"; 

class ResumeList extends Component {
render() {
    return (
        <div className="Form">
        <h1 className="Header">Welcome!</h1>
        <resumeCard/>
        <Route exact path="/Resumes/:id"/>
        </div>
    )
}
}

export default ResumeList; 