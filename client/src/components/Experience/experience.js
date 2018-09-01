import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Experience extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
            { link: "/experience", title: "Experience" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Experience</h1>
            <p style={{ fontSize: "0.8rem" }}>
              Please click the pencil to enter the information for all of your
              previous work related experience.
            </p>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/experience/create", // component being Linked to
                  state: { experienceIndex: false } // Setting Index passed into experienceCreate component - false means new
                }}
              >
                <i class="fa fa-pencil fa-2x" aria-hidden="true" />
              </Link>
            </div>
            {this.props.context.userInfo.experience.map((element, index) => {
              return (
                <Link
                  style={{ color: "black", fontWeight: "700" }}
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
          </div>
        </div>
      </div>
    );
  }
}

export default Experience;
