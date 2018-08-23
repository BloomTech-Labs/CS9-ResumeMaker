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
            { link: "/experience", title: "Experience" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Experience</h1>
            {this.props.context.userInfo.experience.map((element, index) => {
              return (
                <Link
                  to={{
                    pathname: "/experience/create", // component being Linked to
                    state: { experienceIndex: index } // Setting Index passed into experienceCreate component
                  }}
                  key={index}
                >
                  <span>{element.title}</span>
                </Link>
              );
            })}
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/experience/create", // component being Linked to
                  state: { experienceIndex: false } // Setting Index passed into experienceCreate component - false means new
                }}
              >
                <img
                  src={require("./CSS/plus-button.svg")}
                  alt=""
                  className="plus-circle"
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
