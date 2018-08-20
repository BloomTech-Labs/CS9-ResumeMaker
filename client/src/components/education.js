import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import { Link } from "react-router-dom";
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
<<<<<<< HEAD
                  pathname: "/education/create", // component being Linked to
                  state: { educationIndex: false } // Setting Index passed into educationCreate component - false means new
=======
                  pathname: "/education/create",
                  state: { educationIndex: false }
>>>>>>> 2a7c5a3b5391c378b07e22f51643076f0a1d9278
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
