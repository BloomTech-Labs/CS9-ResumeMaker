import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Skills extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
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
                  <span>{element.content}</span>
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
                <i className="fas fa-plus plus-circle" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
