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
          this.props.context.actions.setLogout();
        });
    }
  }

  onSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  render() {
    // If there is no token, then going to any page will result in a redirect to login
    // if (!localStorage.getItem("token")) {
    //   return <Redirect to="/login" />;
    // }
    return (
      <div className="sidebar">
        <div className="static-sidebar" style={{fontFamily: "Verdana",   fontSize: "0.7rem"}}>
          <Link to="/templates" className="sidebar-button">
            {" "}
            <div class="fa fa-copy sm" style={{color:"white"}}/>{" "}Templates
          </Link>
          <Link to="/resumes" className="sidebar-button">
            {" "}
            <div class="fa fa-file-alt sm" style={{color:"white"}}/>{" "}Resumes
          </Link>
          <Link to="/jobTitle" className="sidebar-button">
            {" "}
            <div className="fa fa-briefcase sm"style={{color:"white"}}/>{" "}Job Title
          </Link>
          <Link to="/summary" className="sidebar-button">
            {" "}
            <div class="fa fa-edit sm"style={{color:"white"}}/>{" "}Summary
          </Link>
          <Link to="/skills" className="sidebar-button">
            {" "}
            <div class="fa fa-toolbox sm" style={{color:"white"}}/>{" "}Skills
          </Link>
          <Link to="/experience" className="sidebar-button">
            {" "}
            <div class="fa fa-lightbulb sm"style={{color:"white"}}/>{" "}Experience
          </Link>
          <Link to="/education" className="sidebar-button">
            {" "}
            <div class="fa fa-graduation-cap sm"style={{color:"white"}}/>{" "}Education
          </Link>
          <Link to="/billing" className="sidebar-button">
            {" "}
            <div class="fa fa-credit-card sm"style={{color:"white"}}/>{" "}Billing
          </Link>
          <Link to="/settings" className="sidebar-button">
            {" "}
            <div class="fa fa-sliders-h sm"style={{color:"white"}}/>{" "}Settings
          </Link>
        </div>
      </div>
    );
  }
}

export default Sidebar;
