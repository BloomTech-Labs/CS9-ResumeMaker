import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
// import ResumeCard from "./SubComponents/resumeCard";
import { Link } from "react-router-dom";

class Resumes extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/resumes", title: "Resumes" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h1 className="Header">RESUMES</h1>
            </div>
            <div className="containers-div">
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/resume1", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("../Templates/tempTemplate.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5 className="link">Resume 1</h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/resume2", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("../Templates/tempTemplate1.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5 className="link">Resume 2</h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/resume1", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("../Templates/tempTemplate2.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5 className="link">Resume 3</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Resumes;
