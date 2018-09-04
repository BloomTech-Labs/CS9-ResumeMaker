// register, login, nav bar, landing page component
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./landingpage.css";
import axios from "axios";
const urls = require("../../config/config.json");

class LandingPage extends Component {
  componentDidMount() {
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
          this.props.context.actions.setLogout();
        });
    } //if user has a token with no data on context
  }

  render() {
    return (
      <div className="App LandingPage">
        <h1 className="Header">rezLeft</h1>
        <p>When Everyone Goes Right, We Go Left</p>
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
