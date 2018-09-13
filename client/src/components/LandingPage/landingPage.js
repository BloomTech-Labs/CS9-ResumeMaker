// register, login, nav bar, landing page component
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const urls = require("../../config/config.json");

class LandingPage extends Component {
  componentDidMount() {
    if (this.props.context.userInfo.auth === true) {
      this.props.history.push("/dashboard");
    } //if user has data on context already
    else if (localStorage.getItem("token")) {
      axios
        .get(`${urls[urls.basePath]}/users/currentuser/`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.props.context.actions.setLogin(response.data);
          this.props.history.push("/dashboard");
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
        <h1 className="Header" style={{fontFamily: "Tacoma", fontSize: "3.3rem"}}>rezRight</h1>
        {/* <p style={{fontSize: "0.8rem", fontFamily: "calibri", color: "black"}}>The right resumes go Left.</p> */}
        <div className="landing-box" >
        <Link className="landing-button" to="/login">
          <button type="button" className="land-btn btn" style={{fontSize: "1.1rem", fontWeight: "600"}}>
            Login
          </button>
        </Link>
        <Link className="landing-button" to="/register">
          <button type="button" className="land-btn btn" style={{fontSize: "1.1rem", fontWeight: "600"}}>
            Register
          </button>
        </Link>
        </div>
      </div>
    );
  }
}

export default LandingPage;
