import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CSS/sidebar.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    return (
      <div className="test-div">
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
