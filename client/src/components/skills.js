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
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Skills</h1>
            {this.props.context.userInfo.skills.map((element, index) => {
              return (
                <Link
                  to={{
                    pathname: "/skills/create", // component being Linked to
                    state: { skillsIndex: index } // Setting Index passed into skillsCreate component
                  }}
                  key={index}
                >
                  <span>{element}</span>
                </Link>
              );
            })}
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

export default Skills;
