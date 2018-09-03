import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Education extends Component {
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
            { link: "/education", title: "Education" }
          ]}
        />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <h1>Education History</h1>
            <p style={{ fontSize: "0.8rem" }}>
              Please click the pencil to enter the information for your
              Education History.
            </p>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/education/create", // component being Linked to
                  state: { educationIndex: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <i class="fa fa-pencil fa-2x" aria-hidden="true" />
              </Link>
            </div>
            {this.props.context.userInfo.education.map((element, index) => {
              return (
                <Link
                  style={{ color: "black", fontWeight: "600" }}
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
          </div>
        </div>
      </div>
    );
  }
}

export default Education;
