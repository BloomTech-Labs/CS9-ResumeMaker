import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "./tempTemplate1.png";
import "./tempTemplate2.png";
import "./tempTemplate3.png";
import "./templates.css";

class Templates extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="entire-page">
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
            { link: "/templates", title: "Templates" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h1>TEMPLATES</h1>
              <p>
                Start your RESUME by selecting each link on the left sidebar and
                entering
                <br />
                all of your informaiton. Once completed, choose from the
                template formats below to <br />
                select the final informaiton to be rendered to your RESUME.
              </p>
            </div>
            <div className="containers-div">
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black",
                    border: "1px solid black",
                    padding: "0.5rem"
                  }}
                  to={{
                    pathname: "/templates/template-1", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./tempTemplate.png")} //import pics
                    alt=""
                    height="80rem"
                  />
                  <h5 className="link"> TRADITIONAL </h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black",
                    border: "1px solid black",
                    padding: "0.5rem"
                  }}
                  to={{
                    pathname: "/templates/template-2", // component being Linked to
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
                    color: "black",
                    border: "1px solid black",
                    padding: "0.5rem"
                  }}
                  to={{
                    pathname: "/templates/template-3", // component being Linked to
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
