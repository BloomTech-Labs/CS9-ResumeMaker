// register, login, nav bar, landing page component
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CSS/landingpage.css"

class LandingPage extends Component {
  render() {
    return (
      <div className="App LandingPage">
        <h1 className="Header">Resume Maker</h1>
        <p>(Will redirect to resumes page if logged in)</p>
        <Link className="landing-button" to="/login"><button type="button" className="btn btn-secondary">Login</button></Link>
        <Link className="landing-button" to="/register"><button type="button" className="btn btn-secondary">Register</button></Link>
      </div>
    );
  }
}

export default LandingPage;
