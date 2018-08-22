import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import { Link } from "react-router-dom";
import "./CSS/summary.css";

class Summary extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/summary", title: "Summary" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Personal Summary</h1>
            {this.props.context.userInfo.summary.map((element, index) => {
              return (
                <Link
                  to={{
                    pathname: "/summary/create", // component being Linked to
                    state: { summaryIndex: index } // Setting Index passed into summaryCreate component
                  }}
                  key={index}
                >
                  <span>{element}</span>
                </Link>
              );
            })}
            <div className="link-hide">
              <Link to="/summary/create">
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

export default Summary;
