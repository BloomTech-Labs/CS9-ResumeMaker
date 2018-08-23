import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import ResumeCard from "./subComponents/resumeCard";
import axios from "axios";
const urls = require("../config.json");

class Resumes extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/resumes", title: "Resumes" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1 className="Header">Resumes</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Resumes;
