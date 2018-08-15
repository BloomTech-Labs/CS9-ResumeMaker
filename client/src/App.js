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
import AuthProvider, {AuthContext} from "./contexts/AuthProvider";

class App extends Component {
  render() {
    return (
      <div className="App">
<<<<<<< HEAD
        <AuthProvider>
          <AuthContext.Consumer>
          {props => 
            <React.Fragment>
        <h1>Hello World!</h1>
=======
>>>>>>> eb76f6bbd30867d01ba5640ac0fbb95bfb38fa7d
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
<<<<<<< HEAD
        </React.Fragment>
      }

          </AuthContext.Consumer>
        </AuthProvider>
=======
        <Route exact path="/sidebar" component={Sidebar} />
>>>>>>> eb76f6bbd30867d01ba5640ac0fbb95bfb38fa7d
      </div>
    );
  }
}

export default App;
