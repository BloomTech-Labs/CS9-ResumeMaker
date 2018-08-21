import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import axios from "axios";
import Navbar from "./subComponents/navbar";
// import { Consumer } from '../../context';

class SkillsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values:
        props.context.userInfo.skills[props.location.state.skillsIndex] ===
        undefined
          ? [""]
          : props.context.userInfo.skills[props.location.state.skillsIndex],
      errors: []
    };
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    this.setState({ errors: [] });
    const errors = [];
    const { skills } = this.state;
    //TODO: render any conditions before axios call
    axios
      .post("localhost:3000", this.state)
      .then(response => {
        this.setState({
          skills: []
        });
      })
      .catch(err => {
        if (skills === "") {
          errors.push("Skills are required.");
        }
      });
  };

  render() {
    const { skills } = this.state;

    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/skills", title: "Skills" },
            { link: "/skills/create", title: "Create" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Skills</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">
                  “Success is skill inside out.” ― Matshona Dhliwayo
                </label>
                <input
                  value={this.state.values[this.props.skills.state.skillsIndex]}
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="skills"
                  placeholder="List Skills"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillsCreate;
