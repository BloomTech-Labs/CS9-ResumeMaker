import React, { Component } from "react";
import { Route } from "react-router-dom";
import  AuthProvider, {AuthContext} from "../contexts/AuthProvider";
//import SideBar from "./subComponents/sidebar";
//import Navbar from "./subComponents/navbar";
import Sidebar from "./subComponents/sidebar"
import Navbar from "./subComponents/navbar";
import ResumeCard from "./subComponents/resumeCard"

class ResumeList extends Component {
  render() {
    return (
     
      <div className="Form">
       <AuthProvider>
        <AuthContext.Consumer>
          {auth =>
          <React.Fragment>
        <h1 className="Header">Welcome!</h1>
        <ResumeCard auth={auth}/>
        <Sidebar />
        <h1 className="Header">Resumes</h1>
        <resumeCard />
        <Route exact path="/Resumes/:id" />
        </React.Fragment>
          }
          </AuthContext.Consumer>
        </AuthProvider>
        </div>
    );
  }
}

export default ResumeList;
