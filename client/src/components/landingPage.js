// register, login, nav bar, landing page component
import React, { Component } from "react";
//import { Route } from "react-router-dom";
import LoginButton from "./subComponents/loginButton";
import RegisterButton from "./subComponents/registerButton";


class LandingPage extends Component {
  render() {
    return (
      <div className="App">
        <LoginButton />
        <RegisterButton />
        <h1 className="Header">Resume Maker</h1>
      </div>
    );
  }
}

export default LandingPage;
