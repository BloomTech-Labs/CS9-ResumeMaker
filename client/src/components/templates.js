import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import "./templates/tempTemplate1.png";
import "./templates/tempTemplate2.png";
import "./templates/tempTemplate3.png";
import { Link } from "react-router-dom"; 

class Templates extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Templates</h1>
            <Link
              to={{
                pathname: "/templates/template-1", // component being Linked to
                state: { templateIndex: false } // Setting Index passed to template- false means new
              }}
            >
              <img
                src={require("./templates/tempTemplate1.png")} //import pics
                alt=""
                height="100rem"
              />
            </Link>
            <Link
              to={{
                pathname: "/templates/template-2", // component being Linked to
                state: { templateIndex: false } // Setting Index passed to template- false means new
              }}
            >
              <img
                src={require("./templates/tempTemplate2.png")}  //import pics
                alt=""
                height="100rem"
              />
            </Link>
            <Link
              to={{
                pathname: "/templates/template-3", // component being Linked to
                state: { templateIndex: false } // Setting Index passed to template- false means new
              }}
            >
              <img
                src={require("./templates/tempTemplate1.png")}  //import pics
                alt=""
                height="100rem"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Templates;
