import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

import "./CSS/sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">

        <ul class="nav nav-pills"> {/* For some reason Bootstrap likes class instead of classname? Tested both. */}
          <li class="nav-item">
            <a class="nav-link active" href="#">Active</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>

        <Link to="/summary" className="sidebar-button"> Summary</Link>
        <Link to="/positions" className="sidebar-button"> Positions</Link>
        <Link to="/education" className="sidebar-button"> Education</Link>
        <Link to="/skills" className="sidebar-button"> Skills</Link>
        <Link to="/resumes" className="sidebar-button"> Resumes</Link>
        <Link to="/billing" className="sidebar-button"> Billing</Link>
        <Link to="/settings" className="sidebar-button"> Settings</Link>
      </div >
    );
  }
}

export default Sidebar;
