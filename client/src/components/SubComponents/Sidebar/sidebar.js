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
<<<<<<< HEAD
        <div className="static-sidebar" style={{fontFamily: "Verdana",   fontSize: "0.7rem", fontWeight: "550", }}>
          <Link to="/templates" className="sidebar-button">
            {" "}
            <i class="fa fa-copy sm"/> Templates
          </Link>
          <Link to="/resumes" className="sidebar-button">
            {" "}
            <i class="fa fa-file-alt sm"/>Resumes
          </Link>
          <Link to="/jobTitle" className="sidebar-button">
            {" "}
            <i className="fa fa-briefcase sm"/>Job Title
          </Link>
          <Link to="/summary" className="sidebar-button">
            {" "}
            <i class="fa fa-edit sm"/>Summary
          </Link>
          <Link to="/skills" className="sidebar-button">
            {" "}
            <i class="fa fa-toolbox sm"/>Skills
          </Link>
          <Link to="/experience" className="sidebar-button">
            {" "}
            <i class="fa fa-lightbulb sm"/>Experience
          </Link>
          <Link to="/education" className="sidebar-button">
            {" "}
            <i class="fr fa-graduation-cap sm"/>Education
          </Link>
          <Link to="/billing" className="sidebar-button">
            {" "}
            <i class="fa fa-credit-card sm"/>Billing
          </Link>
          <Link to="/settings" className="sidebar-button">
            {" "}
            <i class="fa fa-sliders-h sm"/>Settings
=======
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
            Templates
          </Link>
          <Link
            to="/resumes"
            className={classnames({
              active: window.location.pathname.includes("/resumes")
            })}
          >
            Resumes
          </Link>
          <Link
            to="/jobtitle"
            className={classnames({
              active: window.location.pathname.includes("/jobtitle")
            })}
          >
            Job Title
          </Link>
          <Link
            to="/summary"
            className={classnames({
              active: window.location.pathname.includes("/summary")
            })}
          >
            Summary
          </Link>
          <Link
            to="/skills"
            className={classnames({
              active: window.location.pathname.includes("/skills")
            })}
          >
            Skills
          </Link>
          <Link
            to="/experience"
            className={classnames({
              active: window.location.pathname.includes("/experience")
            })}
          >
            Experience
          </Link>
          <Link
            to="/education"
            className={classnames({
              active: window.location.pathname.includes("/education")
            })}
          >
            Education
          </Link>
          <Link
            to="/billing"
            className={classnames({
              active: window.location.pathname.includes("/billing")
            })}
          >
            Billing
          </Link>
          <Link
            to="/settings"
            className={classnames({
              active: window.location.pathname.includes("/settings")
            })}
          >
            Settings
>>>>>>> 48c15dc9cda04e46c0d5674e3cbe8243b5cd98b3
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
