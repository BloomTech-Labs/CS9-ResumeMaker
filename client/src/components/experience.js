import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "./CSS/summary.css";

class Experience extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/experience", title: "experience" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Experience</h1>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/experience/create",
                  state: { experienceIndex: false }
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

export default Experience;
