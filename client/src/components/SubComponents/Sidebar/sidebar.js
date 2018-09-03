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
          </Link>
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
      </div>
    );
  }
}

export default Sidebar;
