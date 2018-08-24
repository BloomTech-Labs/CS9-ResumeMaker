import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Elements, StripeProvider } from "react-stripe-elements";

import LandingPage from "./components/landingPage";
import Summaries from "./components/summary";
import Education from "./components/education";
import Skills from "./components/skills";
import Resumes from "./components/resumes";
import Billing from "./components/billing";
import Settings from "./components/settings";
import Experience from "./components/experience";
import Login from "./components/login";
import Register from "./components/register";
import Templates from "./components/templates";
import Sidebar from "./components/subComponents/sidebar";
import SummaryCreate from "./components/summaryCreate";
import EducationCreate from "./components/educationCreate";
import ExperienceCreate from "./components/experienceCreate";
import SkillsCreate from "./components/skillsCreate";
import "./App.css";
import AuthProvider, { AuthContext } from "./contexts/AuthProvider";
import { TemplateOne } from "./components/templates/template1";
import { TemplateTwo } from "./components/templates/template2";
import { TemplateThree } from "./components/templates/template3";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <AuthContext.Consumer>
            {context => (
              <React.Fragment>
                <Route
                  exact
                  path="/"
                  render={props => <LandingPage {...props} context={context} />}
                />
                <Route
                  exact
                  path="/summary"
                  render={props => <Summaries {...props} context={context} />}
                />
                <Route
                  exact
                  path="/summary/create"
                  render={props => (
                    <SummaryCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/experience"
                  render={props => <Experience {...props} context={context} />}
                />
                <Route
                  exact
                  path="/experience/create"
                  render={props => (
                    <ExperienceCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/education"
                  render={props => <Education {...props} context={context} />}
                />
                <Route
                  exact
                  path="/education/create"
                  render={props => (
                    <EducationCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/skills"
                  render={props => <Skills {...props} context={context} />}
                />
                <Route
                  exact
                  path="/skills/create"
                  render={props => (
                    <SkillsCreate {...props} context={context} />
                  )}
                />
                <Route
                  exact
                  path="/resumes"
                  render={props => <Resumes {...props} context={context} />}
                />
                 <StripeProvider apiKey="pk_test_nY5MwNnJraHmAq0JRBD6Ksan">
                  <Elements>
                    <Route
                      exact
                      path="/billing"
                      render={props => <Billing {...props} context={context} />}
                    />
                  </Elements>
                </StripeProvider>
                <Route
                  exact
                  path="/settings"
                  render={props => <Settings {...props} context={context} />}
                />
                <Route
                  exact
                  path="/login"
                  render={props => <Login {...props} context={context} />}
                />
                <Route
                  exact
                  path="/register"
                  render={props => <Register {...props} context={context} />}
                />
                <Route
                  exact
                  path="/templates"
                  render={props => <Templates {...props} context={context} />}
                />
                <Route
                  exact
                  path="/templates/template-1"
                  render={props => <TemplateOne {...props} context={context} />}
                />
                <Route
                  exact
                  path="/templates/template-2"
                  render={props => <TemplateTwo {...props} context={context} />}
                />
                <Route
                  exact
                  path="/templates/template-3"
                  render={props => <TemplateThree {...props} context={context} />}
                />
                <Route
                  exact
                  path="/sidebar"
                  render={props => <Sidebar {...props} context={context} />}
                />
              </React.Fragment>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
