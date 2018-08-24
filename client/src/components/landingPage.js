// register, login, nav bar, landing page component
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CSS/landingpage.css";
import axios from "axios";
const urls = require("../config.json");

class LandingPage extends Component {
  componentWillMount() {
    console.log(this.props.context.userInfo);
    if (this.props.context.userInfo.auth === true) {
      this.props.history.push("/templates");
    } //if user has data on context already
    else if (localStorage.getItem("token")) {
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
          this.props.history.push("/templates");
        })
        .catch(err => {
          console.log("err", err);
          localStorage.removeItem("token");
        });
    } //if user has a token with no data on context
  }

  render() {
    return (
      <div className="App LandingPage">
        <h1 className="Header">Resume Maker</h1>
        <Link className="landing-button" to="/login">
          <button type="button" className="btn btn-secondary">
            Login
          </button>
        </Link>
        <Link className="landing-button" to="/register">
          <button type="button" className="btn btn-secondary">
            Register
          </button>
        </Link>
      </div>
    );
  }
}

export default LandingPage;
