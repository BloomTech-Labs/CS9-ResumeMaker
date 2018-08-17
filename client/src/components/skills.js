import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";

class Skills extends Component {
  //your functions
  handleSkillChanged(key) {
    // Handle skills
  }

  render() {
    return (
      <div>
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/skills", title: "Skills" }]} />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Skills</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">“Success is skill inside out.”
― Matshona Dhliwayo </label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="List your Skills" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
