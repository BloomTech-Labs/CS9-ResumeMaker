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

  handleSubmit = event => {
    event.preventDefault();

    if (this.props.location.state.educationIndex === false) {
      this.props.context.actions.addElement("education", {
        school: "created",
        degree: "created",
        fieldofstudy: "created",
        from: "created"
      });
    } // if creating
    else {
      this.props.context.actions.setElement(
        this.props.location.state.educationIndex,
        "education",
        {
          school: "edited",
          degree: "edited",
          fieldofstudy: "edited",
          from: "Edited"
        }
      );
    } // if editing

    const tempObj = {
      "sections.education": this.props.context.userInfo.education
    };
    axios
      .put(
        "https://easy-resume.herokuapp.com/users/info/" +
          this.props.context.userInfo.id,
        tempObj,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        console.log(response);
        return ({ history }) => history.push("/resumes");
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    const { school, location, degree, field, from, to } = this.state.values;
    console.log(this.props.context.userInfo.education);

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
                  title="values"
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
                  title="values"
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
                  title="values"
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
                  title="values"
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
                  title="values"
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
                  title="values"
                  onChange={this.handleSubmit}
                  type="text"
                  className="form-control"
                  name="to"
                  placeholder="End Date"
                />
              </div>
              <button onClick={this.handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EducationCreate;
