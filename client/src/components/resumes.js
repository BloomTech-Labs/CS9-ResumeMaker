import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./subComponents/sidebar"
import Navbar from "./subComponents/navbar";

class ResumeList extends Component {
  render() {
    return (
      <div>
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/resumes", title: "Resumes" }]} />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1 className="Header">Resumes</h1>
            <resumeCard />
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeList;
