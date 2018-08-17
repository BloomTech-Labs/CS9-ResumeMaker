import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import ResumeCard from "./subComponents/resumeCard";
import axios from "axios";

export class PersonalInfo extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      suffix: "",
      phone: "",
      email: "",
      location: "",
      title: ""
    };
  }

  handleChange = e => {
    /*const target = e.target;
    let value = target.value;
    const name = target.name;*/
    this.setState({ [e.target.name]: e.target.value });
    e.preventDefault();
  };

  handleSubmit = e => {
    const {
      firstName,
      lastName,
      email,
      phone,
      location,
      title,
      errors
    } = this.state;
    //TODO: render any conditions before axios call
    axios
      .post("localhost:3000", this.state)
      .then(response => {
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          location: "",
          title: "",
          errors: {}
        });
      })
      .catch(err => {
        if (firstName === "") {
          this.setState({ errors: { firstName: "First name is required." } });
        }
        if (lastName === "") {
          this.setState({ errors: { lastName: "Last name is required." } });
        }
        if (email === "") {
          this.setState({ errors: { email: "Email address is required." } });
        }
        if (phone === "") {
          this.setState({ errors: "Phone number is required." });
        }
        console.log("oops", err.message);
        alert("try again");
      });
  };
  render() {
    return (
      <div>
        <h1> Personal Information </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label form="formGroupExampleInput2">
              Don't forget to spell your name right.
            </label>
            <input
              onChange={this.handleChange}
              name="firstName"
              type="text"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="First Name"
              value={this.state.firstName}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="lastName"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Last Name"
              value={this.state.lastName}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="email"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="Phone"
            />
            <input
              type="text"
              name="location"
              className="form-control"
              id="formGroupExampleInput2"
              placeholder="City or State"
            />
          </div>
          <button type="submit">Submit</button>
          {this.state.errors
            ? this.state.errors.map(error => <p>{error}</p>)
            : null}
        </form>
      </div>
    );
  }
}

class Resumes extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/resumes", title: "Resumes" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <PersonalInfo />
          <div className="title-div">
            <h1 className="Header">Resumes</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Resumes;
