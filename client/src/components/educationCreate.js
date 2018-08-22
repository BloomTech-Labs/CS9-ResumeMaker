import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import axios from "axios";
import Navbar from "./subComponents/navbar";
import { Redirect } from "react-router-dom";

const urls = require("../config.json");

class EducationCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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
      this.props.location.state.educationIndex !== false
    )
      this.setState({
        school: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].school,
        degree: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].degree,
        fieldofstudy: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].fieldofstudy,
        from: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].from,
        to: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].to
      });
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.props.location.state.educationIndex === false) {
      this.props.context.actions.addElement("education", {
        school: this.state.school,
        degree: this.state.degree,
        fieldofstudy: this.state.fieldofstudy,
        from: this.state.from,
        to: this.state.to
      });
    } // if creating
    else {
      this.props.context.actions.setElement(
        this.props.location.state.educationIndex,
        "education",
        {
          school: this.state.school,
          degree: this.state.degree,
          fieldofstudy: this.state.fieldofstudy,
          from: this.state.from,
          to: this.state.to
        }
      );
    } // if editing

    const tempObj = {
      "sections.education": this.props.context.userInfo.education
    };
    axios
      .put(
        `${urls[urls.basepath]}/users/info/` + this.props.context.userInfo.id,
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
        {this.state.success ? <Redirect to="/education" /> : null}
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
                  value={this.state.school}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="school"
                  placeholder="Name of Institution"
                />
                <input
                  value={this.state.degree}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="degree"
                  placeholder="Degree or Certificate"
                />
                <input
                  value={this.state.fieldofstudy}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="fieldofstudy"
                  placeholder="Field of Study"
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

export default EducationCreate;
