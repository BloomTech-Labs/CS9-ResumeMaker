import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Experience extends Component {
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
            <h1 style={{fontWeight: "600"}}>Experience{" "}
              <Link
                to={{
                  pathname: "/experience/create", // component being Linked to
                  state: { index: false } // Setting Index passed into experienceCreate component - false means new
                }}
              >
                <i className="fa fa-pencil fa-sm" />
              </Link></h1>
            </div>
            <p style={{ fontSize: "0.8rem" }}>
              Please click the pencil to enter the information for all of your
              previous work related experience.
            </p>

            {this.props.context.userInfo.experience.map((element, index) => {
              return (
                <Link
                  style={{ color: "black", fontWeight: "700" }}
                  to={{
                    pathname: "/experience/create", // component being Linked to
                    state: { index: index } // Setting Index passed into experienceCreate component
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
