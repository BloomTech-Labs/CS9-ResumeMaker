import React, { Component } from "react";
import { Route } from "react-router-dom";
import  AuthProvider, {AuthContext} from "../contexts/AuthProvider";
import Sidebar from "./subComponents/sidebar"
import Navbar from "./subComponents/navbar";
import ResumeCard from "./subComponents/resumeCard"


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
          <ResumeCard>
            <h1>resume 1</h1>
          </ResumeCard>git s  
        </div>
      </div>
    );
  }
}

export default ResumeList;
