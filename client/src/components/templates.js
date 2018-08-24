import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import "./templates/tempTemplate1.png";
import "./templates/tempTemplate2.png";
import "./templates/tempTemplate3.png";
import { Link } from "react-router-dom";
import "./CSS/templates.css";

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
              <h1>Templates</h1>
            </div>
            <div className="containers-div">
              <div className="d-inline-flex container-div">
                <Link
                  to={{
                    pathname: "/templates/template-1", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./templates/tempTemplate.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h4> Template 1 </h4>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  to={{
                    pathname: "/templates/template-2", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./templates/tempTemplate1.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h4> Template 2 </h4>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  to={{
                    pathname: "/templates/template-3", // component being Linked to
                    state: { templateIndex: false } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./templates/tempTemplate2.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h4> Template 3 </h4>
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
