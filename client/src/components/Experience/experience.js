import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Experience extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/experience", title: "Experience" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
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
                <i className="fas fa-plus plus-circle" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Experience;
