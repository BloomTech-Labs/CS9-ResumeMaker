import React, { Component } from "react";
import { Link } from "react-router-dom";
import Summary from "../summary";
import Positions from "../position";
import Education from "../education";
import Skills from "../skills";
import Resumes from "../resumes";
import Billing from "../billing";
import Settings from "../settings";
// import "./Sidebar.css";

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <Link to="/summary">{Summary}</Link>
        <Link to="/positions">{Positions}</Link>
        <Link to="/education">{Education}</Link>
        <Link to="/skills">{Skills}</Link>
        <Link to="/resumes">{Resumes}</Link>
        <Link to="/billing">{Billing}</Link>
        <Link to="/settings">{Settings}</Link>
      </div>
    );
  }
}

export default Sidebar; 
