import React, { Component } from "react";
import Sidebar from "../SubComponents/sidebar";
import Navbar from "../SubComponents/navbar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Education extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/education", title: "Education" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Education History</h1>
            {this.props.context.userInfo.education.map((element, index) => {
              return (
                <Link
                  to={{
                    pathname: "/education/create", // component being Linked to
                    state: { educationIndex: index } // Setting Index passed into educationCreate component
                  }}
                  key={index}
                >
                  <span>{element.school}</span>
                </Link>
              );
            })}
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/education/create", // component being Linked to
                  state: { educationIndex: false } // Setting Index passed into educationCreate component - false means new
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

export default Education;
