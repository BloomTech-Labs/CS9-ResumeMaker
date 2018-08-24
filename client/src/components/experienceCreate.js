import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "./subComponents/sidebar";
import axios from "axios";
import Navbar from "./subComponents/navbar";

const urls = require("../config.json");

class ExperienceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      description: "",
      from: "",
      to: "",
      success: false
    };
  }

  componentWillMount() {
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    }

    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.experienceIndex !== false
    )
      this.setState({
        title: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].title,
        company: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].company,
        from: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].from,
        to: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].to,
        description: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].description
      });
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.props.location.state.experienceIndex === false) {
      this.props.context.actions.addElement("experience", {
        title: this.state.title,
        company: this.state.company,
        description: this.state.description,
        from: this.state.from,
        to: this.state.to
      });
    } // if creating
    else {
      this.props.context.actions.setElement(
        this.props.location.state.experienceIndex,
        "experience",
        {
          title: this.state.title,
          company: this.state.company,
          description: this.state.description,
          from: this.state.from,
          to: this.state.to
        }
      );
    } // if editing

    const tempObj = {
      "sections.experience": this.props.context.userInfo.experience
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
        {this.state.success ? <Redirect to="/experience" /> : null}
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/experience", title: "Experience" },
            { link: "/experience/create", title: "Create" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Experience</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">
                  “Far and away the best prize that life offers is the chance to
                  work hard at work worth doing.” –Theodore Roosevelt.
                </label>
                <input
                  value={this.state.title}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="title"
                  placeholder="Position Title"
                />
                <input
                  value={this.state.company}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="company"
                  placeholder="Company Name"
                />
                <input
                  value={this.state.description}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="description"
                  placeholder="Position Description"
                />
                <input
                  value={this.state.from}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="from"
                  placeholder="Start Date"
                />
                <input
                  value={this.state.to}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="to"
                  placeholder="End Date"
                />
              </div>
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ExperienceCreate;
