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
            {
              // this.data.skillGroup.skills.map((skill) => {
              //   <div key={skill.key}>
              //     <button onClick={this.handleSkillChanged.bind(this, skill.key)} />
              //   </div>
              // })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
