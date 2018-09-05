import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
// import ResumeCard from "./SubComponents/resumeCard";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Resumes extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className="d-block justify-content-center title-div">
              <h1 style={{fontWeight: "600"}}>RESUMES</h1>
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
                    pathname: "/resume3", // component being Linked to
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
