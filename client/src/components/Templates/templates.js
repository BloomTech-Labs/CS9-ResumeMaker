import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import "./tempTemplate1.png";
import "./tempTemplate2.png";
import "./tempTemplate3.png";
import "./templates.css";
const urls = require("../../config/config.json");

class Templates extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (localStorage.getItem("token")) {
      axios
        .get(`${urls[urls.basePath]}/users/currentuser/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          const userData = response.data.user;
          const resumeData = response.data.resumes;
          this.props.context.actions.setLogin(userData);
          this.props.context.actions.setResume(resumeData);
        })
        .catch(err => {
          console.log("Server Error: ", err);
        });
    }
  }
  render() {
    return (
      <div className="entire-page">
      <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className=" title-div templates" style={{width: "85%", justifyContent: "left"}}>
               <h4 >TEMPLATES</h4>
             <p style={{fontSize: "0.65rem", alignContent: "start"}}> Enter information into each section on the sidebar. Then choose a template below to complete your RESUME.</p>
            </div>
            <div className="containers-div">
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black",
                    padding: "0.5rem"
                  }}
                  to={{
                    pathname: "/templates/template-1", // component being Linked to
                    state: { templateIndex: -1 } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./tempTemplate1.png")} //import pics
                    alt=""
                    height="200rem"
                    width="170rem"
                  />
                  <h5 className="link"> TRADITIONAL </h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black",
                    padding: "0.5rem"
                  }}
                  to={{
                    pathname: "/templates/template-2", // component being Linked to
                    state: { templateIndex: -1 } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./tempTemplate2.png")} //import pics
                    alt=""
                    height="200rem"
                    width="170rem"
                  />
                  <h5> MODERN </h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black",
                    padding: "0.5rem"
                  }}
                  to={{
                    pathname: "/templates/template-3", // component being Linked to
                    state: { templateIndex: -1 } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    src={require("./tempTemplate3.png")} //import pics
                    alt=""
                    height="200rem"
                    width="170rem"
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
