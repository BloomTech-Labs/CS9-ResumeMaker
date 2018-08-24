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
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/summary", title: "Summary" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Personal Summary</h1>
            <div className="div-for-links">
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
            </div>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/summary/create", // component being Linked to
                  state: { summaryIndex: false } // Setting Index passed into educationCreate component - false means new
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

export default Summary;
