import React, { Component } from "react";
import axios from "axios";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";
import "./resume.css"

const urls = require("../../config/config.json");

class Resumes extends Component {
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
      <div>
        <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className="title-div resumes">
              <h4>RESUMES</h4>
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
                    src={require("../Templates/tempTemplate1.png")} //import pics
                    alt=""
                    height="5rem"
                 
                  />
                  <h6 className="link" style={{padding: ".5rem"}}> RESUME 1</h6>
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
                    src={require("../Templates/tempTemplate2.png")} //import pics
                    alt=""
           
                  />
                  <h6 className="link" style={{padding: ".5rem"}}>RESUME 2</h6>
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
                    src={require("../Templates/tempTemplate3.png")} //import pics
                    alt=""

                  />
                  <h6 className="link" style={{padding: ".5rem"}}>RESUME 3</h6>
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
