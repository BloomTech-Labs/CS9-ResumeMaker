import React, { Component } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import axios from "axios";

import classnames from "classnames";
import "./sidebar.css";
const urls = require("../../../config/config.json");

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
  }

  componentDidMount() {
    if (
      this.props.context.userInfo.auth !== true &&
      localStorage.getItem("token")
    ) {
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
          this.props.context.actions.setLogout();
        });
    }
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    // If there is no token, then going to any page will result in a redirect to login
    if (!localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="sidebar">
        <div
          className="static-sidebar"
          style={{
            fontFamily: "Verdana",
            fontSize: "0.7rem",
            fontWeight: "550"
          }}
        >
          <Link
            to="/templates"
            className={classnames({
              active: window.location.pathname.includes("/templates")
            })}
          >
            {" "}
<<<<<<< HEAD
            <div class="fa fa-copy sm" style={{ color: "white" }} /> Templates
=======
            <div className="fa fa-copy sm" style={{ color: "white" }} /> {" "} Templates
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
          <Link
            to="/resumes"
            className={classnames({
              active: window.location.pathname.includes("/resumes")
            })}
          >
            {" "}
<<<<<<< HEAD
            <div class="fa fa-file-alt sm" style={{ color: "white" }} /> Resumes
=======
            <div className="fa fa-file-alt sm" style={{ color: "white" }} /> {" "} Resumes
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
          <Link
            to="/jobtitle"
            className={classnames({
              active: window.location.pathname.includes("/jobtitle")
            })}
          >
<<<<<<< HEAD
            <div className="fa fa-briefcase sm" style={{ color: "white" }} />{" "}
            Job Title
=======
            <div className="fa fa-briefcase sm" style={{ color: "white" }} /> {" "}Job Title
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
          <Link
            to="/summary"
            className={classnames({
              active: window.location.pathname.includes("/summary")
            })}
          >
            {" "}
<<<<<<< HEAD
            <div class="fa fa-edit sm" style={{ color: "white" }} /> Summary
=======
            <div className="fa fa-edit sm" style={{ color: "white" }} /> {" "} Summary
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
          <Link
            to="/skills"
            className={classnames({
              active: window.location.pathname.includes("/skills")
            })}
          >
            {" "}
<<<<<<< HEAD
            <div class="fa fa-wrench" style={{ color: "white" }} /> Skills
=======
            <div className="fa fa-wrench" style={{ color: "white" }} /> {" "} Skills
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
          <Link
            to="/experience"
            className={classnames({
              active: window.location.pathname.includes("/experience")
            })}
          >
            {" "}
<<<<<<< HEAD
            <div class="fa fa-lightbulb sm" style={{ color: "white" }} />{" "}
            Experience
=======
            <div className="fa fa-lightbulb sm" style={{ color: "white" }} /> {" "} Experience
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
          <Link
            to="/education"
            className={classnames({
              active: window.location.pathname.includes("/education")
            })}
          >
            {" "}
<<<<<<< HEAD
            <div
              class="fa fa-graduation-cap sm"
              style={{ color: "white" }}
            />{" "}
            Education
=======
            <div className="fa fa-graduation-cap sm" style={{ color: "white" }} /> {" "}Education
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
          <Link
            to="/billing"
            className={classnames({
              active: window.location.pathname.includes("/billing")
            })}
          >
            {" "}
<<<<<<< HEAD
            <div class="fa fa-credit-card sm" style={{ color: "white" }} />{" "}
            Billing
=======
            <div className="fa fa-credit-card sm" style={{ color: "white" }} /> {" "} Billing
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
          <Link
            to="/settings"
            className={classnames({
              active: window.location.pathname.includes("/settings")
            })}
          >
            {" "}
<<<<<<< HEAD
            <div class="fa fa-sliders-h sm" style={{ color: "white" }} />{" "}
            Settings
=======
            <div className="fa fa-sliders-h sm" style={{ color: "white" }} /> {" "}Settings
>>>>>>> bbffb48148b42c3b73e654c42b6957ac7d6ad057
          </Link>
        </div>
        <Route
          render={({ history }) => (
            <div
              className="logout btn"
              onClick={() => {
                this.props.context.actions.setLogout();
                history.push("/");
              }}
            >
              Logout
            </div>
          )}
        />
      </div>
    );
  }
}

export default Sidebar;
