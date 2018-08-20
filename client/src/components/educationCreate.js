import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import axios from "axios";
import Navbar from "./subComponents/navbar";
// import { Consumer } from '../../context';

class EducationCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values:
        props.context.userInfo.education[
          props.location.state.educationIndex
        ] === undefined
          ? [""]
          : props.context.userInfo.education[
              props.location.state.educationIndex
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
    const { school, location, degree, field, from, to } = this.state;
    //TODO: render any conditions before axios call
    axios
      .post("localhost:3000", this.state)
      .then(response => {
        this.setState({
          school: "",
          location: "",
          degree: "",
          field: "",
          from: "",
          to: ""
        });
      })
      .catch(err => {
        if (school === "") {
          errors.push("School is required");
        }
        if (location === "") {
          errors.push("Location is required");
        }
        if (degree === "") {
          errors.push("Degree is required");
        }
        if (field === "") {
          errors.push("Field is required");
        }
        if (from === "") {
          errors.push("A Begin Date is required");
        }
        if (to === "") {
          errors.push("An End Date is required");
        }
      });
  };

  render() {
    const { school, location, degree, field, from, to } = this.state;

    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/education", title: "Education" },
            { link: "/education/create", title: "Create" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Education History</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">
                  “Intelligence plus character-that is the goal of true
                  education.” ― Martin Luther King Jr.
                </label>
                <input
                  value={
                    this.state.values[this.props.location.state.educationIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="school"
                  placeholder="Name of Institution"
                />
                <input
                  value={
                    this.state.values[this.props.location.state.educationIndex]
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
                    this.state.values[this.props.location.state.educationIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="degree"
                  placeholder="Degree or Certificate"
                />
                <input
                  value={
                    this.state.values[this.props.location.state.educationIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="field"
                  placeholder="Field of Study"
                />
                <input
                  value={
                    this.state.values[this.props.location.state.educationIndex]
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
                    this.state.values[this.props.location.state.educationIndex]
                  }
                  title="values[0]"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="to"
                  placeholder="End Date"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EducationCreate;
