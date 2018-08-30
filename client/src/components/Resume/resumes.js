import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
// import ResumeCard from "./SubComponents/resumeCard";

class Resumes extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/"},
            { link: "/resumes", title: "Resumes" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1 className="Header">Resumes</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Resumes;
