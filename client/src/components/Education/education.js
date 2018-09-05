import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Education extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="link-hide">
              <h1 style={{fontWeight: "600"}}>
                EDUCATION HISTORY{" "}
                <Link
                  to={{
                    pathname: "/education/create", // component being Linked to
                    state: { index: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >
                  <i className="fa fa-pencil fa-sm" />
                </Link>
              </h1>
            </div>
            <p style={{ fontSize: "0.8rem" }}>
              Please click the pencil to enter the information for your
              Education History.
            </p>

            {this.props.context.userInfo.education.map((element, index) => {
              return (
                <Link
                  style={{ color: "black", fontWeight: "600" }}
                  to={{
                    pathname: "/education/create", // component being Linked to
                    state: { index: index } // Setting Index passed into educationCreate component
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
