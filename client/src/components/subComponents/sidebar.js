import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./CSS/sidebar.css";
import axios from "axios";
const urls = require("../../config.json");

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
      console.log("passed token check");
      axios
        .get(`${urls[urls.basePath]}/users/currentuser/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          const userData = response.data;
          this.props.context.actions.setLogin(userData);
        })
        .catch(err => {
          console.log("err", err);
          localStorage.removeItem("token");
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
      <div className="test-div bg-secondary">
        <Link to="/resumes" className="sidebar-button">
          {" "}
          Resumes
        </Link>
        <Link to="/summary" className="sidebar-button">
          {" "}
          Summary
        </Link>
        <Link to="/skills" className="sidebar-button">
          {" "}
          Skills
        </Link>
        <Link to="/education" className="sidebar-button">
          {" "}
          Education
        </Link>
        <Link to="/experience" className="sidebar-button">
          {" "}
          Experience
        </Link>
        <Link to="/templates" className="sidebar-button">
          {" "}
          Templates
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
    );
  }
}

export default Sidebar;
