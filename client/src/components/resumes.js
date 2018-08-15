import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./subComponents/sidebar"
import Navbar from "./subComponents/navbar";

class ResumeList extends Component {
  render() {
    return (
      <div className="Form">
        <Sidebar />
        <h1 className="Header">Resumes</h1>
        <resumeCard />
        <Route exact path="/Resumes/:id" />
      </div>
    );
  }
}

export default ResumeList;
