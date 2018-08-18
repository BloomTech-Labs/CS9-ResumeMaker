import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import { Link } from "react-router-dom";
// import { Consumer } from '../../context';
import "./CSS/summary.css";

class Education extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/education", title: "education" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Education History</h1>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/education/create",
                  state: { educationIndex: false }
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

export default Education;
