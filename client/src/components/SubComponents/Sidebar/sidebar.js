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
            fontSize: "0.6rem",
            fontWeight: "0"
          }}
        >
          <Link
            to="/templates"
            className={classnames({
              active: window.location.pathname.includes("/templates")
            })}
          >
            {" "}
            <div className="fa fa-copy sm" style={{ color: "white" }} /> {" "} TEMPLATES
          </Link>
          <Link
            to="/resumes"
            className={classnames({
              active: window.location.pathname.includes("/resumes")
            })}
          >
            {" "}
            <div className="fa fa-file-alt sm" style={{ color: "white" }} /> {" "} RESUMES
          </Link>
          <Link
            to="/jobtitle"
            className={classnames({
              active: window.location.pathname.includes("/jobtitle")
            })}
          >
            <div className="fa fa-briefcase sm" style={{ color: "white" }} /> {" "}JOB TITLE
          </Link>
          <Link
            to="/summary"
            className={classnames({
              active: window.location.pathname.includes("/summary")
            })}
          >
            {" "}
            <div className="fa fa-edit sm" style={{ color: "white" }} /> {" "} SUMMARY
          </Link>
          <Link
            to="/skills"
            className={classnames({
              active: window.location.pathname.includes("/skills")
            })}
          >
            {" "}
            <div className="fa fa-wrench" style={{ color: "white" }} /> {" "} SKILLS
          </Link>
          <Link
            to="/experience"
            className={classnames({
              active: window.location.pathname.includes("/experience")
            })}
          >
            {" "}
            <div className="fa fa-lightbulb sm" style={{ color: "white" }} /> {" "} EXPERIENCE
          </Link>
          <Link
            to="/education"
            className={classnames({
              active: window.location.pathname.includes("/education")
            })}
          >
            {" "}
            <div className="fa fa-graduation-cap sm" style={{ color: "white" }} /> {" "}EDUCATION
          </Link>
          <Link
            to="/billing"
            className={classnames({
              active: window.location.pathname.includes("/billing")
            })}
          >
            {" "}
            <div className="fa fa-credit-card sm" style={{ color: "white" }} /> {" "} BILLING
          </Link>
          <Link
            to="/settings"
            className={classnames({
              active: window.location.pathname.includes("/settings")
            })}
          >
            {" "}
            <div className="fa fa-sliders-h sm" style={{ color: "white" }} /> {" "}SETTINGS
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
              LOGOUT
            </div>
          )}
        />
      </div>
    );
  }
}

export default Sidebar;
