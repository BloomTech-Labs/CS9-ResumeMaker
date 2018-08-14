import React, { Component } from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/landingPage";
import Summaries from "./components/summary";
import Education from "./components/education";
import Skills from "./components/skills";
import Resumes from "./components/resumes";
import Billing from "./components/billing";
import Settings from "./components/settings";
import Positions from "./components/positions";
import Login from "./components/login";
import Register from "./components/register";
import Templates from "./components/subComponents/templates";
import Sidebar from "./components/subComponents/sidebar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/summaries" component={Summaries} />
        <Route exact path="/positions" component={Positions} />
        <Route exact path="/education" component={Education} />
        <Route exact path="/skills" component={Skills} />
        <Route exact path="/resumes" component={Resumes} />
        <Route exact path="/billing" component={Billing} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/templates" component={Templates} />
        <Route exact path="/sidebar" component={Sidebar} />
      </div>
    );
  }
}

export default App;
