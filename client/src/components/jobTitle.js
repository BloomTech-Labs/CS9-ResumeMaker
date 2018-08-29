import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import { Link } from "react-router-dom";
import "./CSS/component-general.css";

class JobTitle extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/jobtitle", title: "JobTitle" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Job Title</h1>
            {this.props.context.userInfo.title.map((element, index) => {
              return (
                <Link
                  to={{
                    pathname: "/jobtitle/create", // component being Linked to
                    state: { titleIndex: index } // Setting Index passed into titleCreate component
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
                  pathname: "/jobtitle/create", // component being Linked to
                  state: { titleIndex: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <i className="fas fa-plus plus-circle" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobTitle;
