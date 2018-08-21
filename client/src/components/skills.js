import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import { Link } from "react-router-dom";
import "./CSS/summary.css";

class Skills extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/skills", title: "Skills" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Skills</h1>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/skills/create", // component being Linked to
                  state: { skillsIndex: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <img
                  src={require("./CSS/plus-button.svg")}
                  alt=""
                  height="50rem"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
