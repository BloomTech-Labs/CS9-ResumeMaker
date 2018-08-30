import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

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
      // this.props.context.userInfo.auth !== true &&
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
      <div className="sidebar bg-secondary">
        <div className="static-sidebar">
          <Link to="/templates" className="sidebar-button">
            {" "}
            Templates
          </Link>
          <Link to="/resumes" className="sidebar-button">
            {" "}
            Resumes
          </Link>
          <Link to="/jobTitle" className="sidebar-button">
            {" "}
            Job Title
          </Link>
          <Link to="/summary" className="sidebar-button">
            {" "}
            Summary
          </Link>
          <Link to="/skills" className="sidebar-button">
            {" "}
            Skills
          </Link>
          <Link to="/experience" className="sidebar-button">
            {" "}
            Experience
          </Link>
          <Link to="/education" className="sidebar-button">
            {" "}
            Education
          </Link>
          <Link to="/billing" className="sidebar-button">
            {" "}
            Billing
          </Link>
          <Link to="/settings" className="sidebar-button">
            {" "}
            Settings
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;