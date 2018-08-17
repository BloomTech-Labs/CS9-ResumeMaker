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
import Templates from "./components/templates";
import Sidebar from "./components/subComponents/sidebar";
import "./App.css";
import AuthProvider, { AuthContext } from "./contexts/AuthProvider";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AuthProvider>
          <AuthContext.Consumer>
            {auth => (
              <React.Fragment>
                <Route exact path="/" render={(props) => <LandingPage {...props} auth={auth} />} />
                <Route exact path="/summary" render={(props) => <Summaries {...props} auth={auth} />} />
                <Route exact path="/positions" render={(props) => <Positions {...props} auth={auth} />} />
                <Route exact path="/education" render={(props) => <Education {...props} auth={auth} />} />
                <Route exact path="/skills" render={(props) => <Skills {...props} auth={auth} />} />
                <Route exact path="/resumes" render={(props) => <Resumes {...props} auth={auth} />} />
                <Route exact path="/billing" render={(props) => <Billing {...props} auth={auth} />} />
                <Route exact path="/settings" render={(props) => <Settings {...props} auth={auth} />} />
                <Route exact path="/login" render={(props) => <Login {...props} auth={auth} />} />
                <Route exact path="/register" render={(props) => <Register {...props} auth={auth} />} />
                <Route exact path="/templates" render={(props) => <Templates {...props} auth={auth} />} />
                <Route exact path="/sidebar" render={(props) => <Sidebar {...props} auth={auth} />} />
              </React.Fragment>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
