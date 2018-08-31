import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import axios from "axios";
import Navbar from "../SubComponents/Navbar/navbar";

const urls = require("../../config/config.json");

class SkillsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      _id: "",
      success: false
    };
  }

  componentDidMount() {
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    }

    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.skillsIndex !== false
    ) {
      this.setState({
        content: this.props.context.userInfo.skills[
          this.props.location.state.skillsIndex
        ].content,
        _id: this.props.context.userInfo.skills[
          this.props.location.state.skillsIndex
        ]._id
      });
    }
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.skillsIndex === false && !deleteFlag) {
      this.props.context.actions.addElement("skills", {
        // When creating, do NOT put in an _id, let mongo autocreate one
        content: this.state.content
      });
    } // if creating
    else if (!deleteFlag) {
      this.props.context.actions.setElement(
        this.props.location.state.skillsIndex,
        "skills",
        {
          content: this.state.content,
          _id: this.state._id
        }
      );
    } // if editing
    else {
      this.props.context.actions.removeElement(
        this.props.location.state.skillsIndex,
        "skills"
      );
    }

    const tempObj = {
      "sections.skills": this.props.context.userInfo.skills
    };
    axios
      .put(
        `${urls[urls.basePath]}/users/info/` + this.props.context.userInfo.id,
        tempObj,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        console.log(response);
        this.setState({ success: true });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    return (
      <div>
        {this.state.success ? <Redirect to="/skills" /> : null}
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
            { link: "/skills", title: "Skills" },
            { link: "/skills/create", title: "Create" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Skills</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2" style={{fontSize: "0.7rem"}}>
                  “Success is skill inside out.” ― Matshona Dhliwayo
                </label>
                <input
                  value={this.state.content}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="content"
                  placeholder="Input your skill"
                />
              </div>
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
              {this.props.location.state.skillsIndex !== false ? (
                <button onClick={e => this.handleSubmit(e, true)}>
                  Delete
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SkillsCreate;
