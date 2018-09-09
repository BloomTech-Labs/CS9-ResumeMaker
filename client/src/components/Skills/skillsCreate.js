import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import axios from "axios";

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
    window.scrollTo(0, 0);

    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.index !== false
    ) {
      this.setState({
        content: this.props.context.userInfo.skills[
          this.props.location.state.index
        ].content,
        _id: this.props.context.userInfo.skills[this.props.location.state.index]
          ._id
      });
    }
  }

  componentWillUnmount() {
    this.props.context.actions.expandResumeIDs(
      this.props.context.userInfo.currentResume
    );
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.index === false && !deleteFlag) {
      this.props.context.actions.addElement("skills", {
        // When creating, do NOT put in an _id, let mongo autocreate one
        content: this.state.content
      });
    } // if creating
    else if (!deleteFlag) {
      this.props.context.actions.setElement(
        this.props.location.state.index,
        "skills",
        {
          content: this.state.content,
          _id: this.state._id
        }
      );
    } // if editing
    else {
      this.props.context.actions.removeElement(
        this.props.location.state.index,
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
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <h1>Skills</h1>
            <div>“Success is skill inside out.” ― Matshona Dhliwayo</div>
            <form>
              <div className="form-group">
                <input
                  value={this.state.content}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="content"
                  placeholder="Input your skill"
                />
              </div>
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
              {this.props.location.state.index !== false ? (
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
