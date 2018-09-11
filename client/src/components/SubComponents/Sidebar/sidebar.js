import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import classnames from "classnames";
const urls = require("../../../config/config.json");

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true
    };
  }

  componentDidMount = () => {
    // console.log("SIDEBAR", this.props.setLogin === true);
    if (this.props.setLogin === true || (localStorage.getItem("token") && this.props.context.userInfo.auth !== true)
    // && this.props.context.fetchData === true
    ) {
      axios
        .get(`${urls[urls.basePath]}/users/currentuser/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log(
            "Sidebar DidMounted and called setLogin and setResume with:",
            response.data
          );
          this.props.context.actions.setLogin(response.data);
          // this.props.context.actions.expandResumeIDs();
          // if(response.data.resumes.length >= 1){
          //   for(let i = 0; i < response.data.resumes.length; i++){
          //     this.props.context.actions.expandResumeIDs(response.data.resumes[i]._id)
          //   }
          // }
          // if(response.data.user.currentresume._id){
          //   this.props.context.actions.expandResumeIDs(response.data.user.currentresume._id);
          // }
        })
        .catch(err => {
          console.log("Server Error: ", err);
          this.props.context.actions.setLogout();
        });
    } else {
      console.log("Sidebar detected no token and/or auth === false");
      if(this.props.context.userInfo.resumes[0] && !this.props.context.userInfo.currentresume){
        console.log("set currentresume")
        this.props.context.actions.setSingleElement("currentresume", this.props.context.userInfo.resumes[0]);
      }
    }
  };

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
            to="/resumes"
            className={classnames({
              active: window.location.pathname.includes("/resumes")
            })}
          >
            {" "}
            <div className="fa fa-copy sm" style={{ color: "white" }} /> RESUMES
          </Link>
          <Link
            to="/templates"
            className={classnames({
              active: window.location.pathname.includes("/templates")
            })}
          >
            {" "}
            <div
              className="fa fa-file-alt sm"
              style={{ color: "white" }}
            />{" "}
            TEMPLATES
          </Link>
          <Link
            to="/jobtitle"
            className={classnames({
              active: window.location.pathname.includes("/jobtitle")
            })}
          >
            <div className="fa fa-briefcase sm" style={{ color: "white" }} />{" "}
            JOB TITLE
          </Link>
          <Link
            to="/summary"
            className={classnames({
              active: window.location.pathname.includes("/summary")
            })}
          >
            {" "}
            <div className="fa fa-edit sm" style={{ color: "white" }} /> SUMMARY
          </Link>
          <Link
            to="/skills"
            className={classnames({
              active: window.location.pathname.includes("/skills")
            })}
          >
            {" "}
            <div className="fa fa-wrench" style={{ color: "white" }} /> SKILLS
          </Link>
          <Link
            to="/experience"
            className={classnames({
              active: window.location.pathname.includes("/experience")
            })}
          >
            {" "}
            <div
              className="fa fa-lightbulb sm"
              style={{ color: "white" }}
            />{" "}
            EXPERIENCE
          </Link>
          <Link
            to="/education"
            className={classnames({
              active: window.location.pathname.includes("/education")
            })}
          >
            <div
              className="fa fa-graduation-cap sm"
              style={{ color: "white" }}
            />{" "}
            EDUCATION
          </Link>
          <Link
            to="/billing"
            className={classnames({
              active: window.location.pathname.includes("/billing")
            })}
          >
            {" "}
            <div
              className="fa fa-credit-card sm"
              style={{ color: "white" }}
            />{" "}
            BILLING
          </Link>
          <Link
            to="/settings"
            className={classnames({
              active: window.location.pathname.includes("/settings")
            })}
          >
            {" "}
            <div
              className="fa fa-sliders-h sm"
              style={{ color: "white" }}
            />{" "}
            SETTINGS
          </Link>
        </div>
        {/* <Route
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
        /> */}
      </div>
    );
  }
}

export default Sidebar;
