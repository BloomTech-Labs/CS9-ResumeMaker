import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import axios from "axios";
import Navbar from "./subComponents/navbar";
// import { Consumer } from '../../context';

class ExperienceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values:
        props.context.userInfo.education[
          this.props.location.state.experienceIndex
        ] === undefined
          ? [""]
          : props.context.userInfo.experience[
              this.props.location.state.experienceIndex
            ],
      errors: []
    };
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    this.setState({ errors: [] });
    const errors = [];
    const { title, company, location, from, to, description } = this.state;
    //TODO: render any conditions before axios call
    axios
      .post("localhost:3000", this.state)
      .then(response => {
        this.setState({
          title: "",
          company: "",
          location: "",
          from: "",
          to: "",
          description: ""
        });
      })
      .catch(err => {
        if (title === "") {
          errors.push("Title is required");
        }
        if (company === "") {
          errors.push("Company is required");
        }
        if (location === "") {
          errors.push("Location is required");
        }
        if (from === "") {
          errors.push("A Begin Date is required");
        }
        if (to === "") {
          errors.push("An End Date is required");
        }
        if (description === "") {
          errors.push("A description is required");
        }
      });
  };

  render() {
    const { title, company, location, from, to, description } = this.state;

    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/experience", title: "Experience" },
            { link: "/experience/create", title: "Create" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Experience</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">
                  “Far and away the best prize that life offers is the chance to
                  work hard at work worth doing.” –Theodore Roosevelt.
                </label>
                <input
                  value={
                    this.state.values[this.props.location.state.experienceIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Position Title"
                />
                <input
                  value={
                    this.state.values[this.props.location.state.experienceIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="company"
                  placeholder="Company Name"
                />
                <input
                  value={
                    this.state.values[this.props.location.state.experienceIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Location"
                />
                <input
                  value={
                    this.state.values[this.props.location.state.experienceIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="from"
                  placeholder="Start Date"
                />
                <input
                  value={
                    this.state.values[this.props.location.state.experienceIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="to"
                  placeholder="End Date"
                />
                <input
                  value={
                    this.state.values[this.props.location.state.experienceIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Position Description"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ExperienceCreate;
