import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class JobTitle extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <h1>Job Title</h1>
            <p>
              Please click the pencil to enter one or more Titles for the Job
              Positon you are seeking.
            </p>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/jobtitle/create", // component being Linked to
                  state: { titleIndex: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <i className="fa fa-pencil fa-2x" aria-hidden="true" />
              </Link>
            </div>
            {this.props.context.userInfo.title.map((element, index) => {
              return (
                <Link
                  style={{ color: "black", fontWeight: "600" }}
                  to={{
                    pathname: "/jobtitle/create", // component being Linked to
                    state: { titleIndex: index } // Setting Index passed into titleCreate component
                  }}
                  key={index}
                >
                  <span>{element.content}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default JobTitle;
