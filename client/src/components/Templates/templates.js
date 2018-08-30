import React, { Component } from "react";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";
import "./tempTemplate1.png";
import "./tempTemplate2.png";
import "./tempTemplate3.png";
import { Link } from "react-router-dom";
import "./templates.css";

class Templates extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h1>TEMPLATES</h1>
            </div>
            <div className="containers-div">
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/template-1", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./tempTemplate.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5 className="link"> TRADITIONAL </h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/template-2", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./tempTemplate1.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5> MODERN </h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/template-3", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./tempTemplate2.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5> ELEGANT </h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Templates;
