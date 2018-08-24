import React, { Component } from "react";
import axios from "axios";

import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
const urls = require("../config.json");

export class PersonalInfo extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: {
        firstname: "",
        middlename: "",
        lastname: ""
      },
      location: "",
      title: "",
      phonenumber: "",
      links: {
        linkedin: "",
        github: "",
        portfolio: ""
      },
      membership: false,
      subscription: "",
      oldpassword: "",
      newpassword: "",
      errors: []
    };
  }

  augmentObject = (initObj, modObj) => {
    for (let prop in initObj) {
      if (modObj[prop]) {
        let val = modObj[prop];
        if (typeof val == "object" && typeof initObj[prop] == "object")
          this.augmentObject(initObj[prop], val);
        else initObj[prop] = val;
      }
    }
    return initObj;
  };

  componentWillMount() {
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    } else {
      console.log("props on willMount:", this.props.context.userInfo);
      // This automatically updates the state properties with userInfo ones, but they have to be in the same format/names as userInfo uses!
      this.setState(
        this.augmentObject(this.state, this.props.context.userInfo)
      );
    }
  }

  handleChange = e => {
    /*const target = e.target;
    let value = target.value;
    const name = target.name;*/

    console.log("hit");
    const eName = e.target.name;
    const value = e.target.value;
    if (e.target.name.includes("name")) {
      let { name } = this.state;
      const nameArr = eName.split(".");
      name[nameArr[1]] = value;
      this.setState({ name });
    } else if (e.target.name.includes("links")) {
      let { links } = this.state;
      const linksArr = eName.split(".");
      links[linksArr[1]] = value;
      this.setState({ links });
    } else {
      this.setState({ [eName]: value });
    }
  };

  handleSubmit = e => {
    this.setState({ errors: [] });
    const errors = [];
    //TODO: render any conditions before axios call
    axios
      .put(
        `${urls[urls.basePath]}/users/info/` + this.props.context.userInfo.id,
        this.state,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        // this.setState({
        //   firstName: "",
        //   lastName: "",
        //   email: "",
        //   phone: "",
        //   location: "",
        //   title: "",
        //   errors: []
        // });
      })
      .catch(err => {
        if (this.state.name.firstname === "") {
          errors.push("First name is required.");
        }
        if (this.state.name.lastname === "") {
          errors.push("Last name is required.");
        }
        if (this.state.email === "") {
          errors.push("Email is required.");
        }
        if (this.state.phonenumber === "") {
          errors.push("Phone number is required.");
        }
        this.setState({ errors: errors });
        console.log("oops", err.message);
        alert("try again");
      });
  };
  render() {
    return (
      <div>
        <h1> Personal Information </h1>
        <form onSubmit={() => this.handleSubmit()}>
          <div className="form-group">
            <input
              onChange={this.handleChange}
              name="user.firstname"
              type="text"
              className="form-control"
              placeholder="Your first name"
              value={this.state.name.firstname}
            />
            <input
              onChange={this.handleChange}
              name="name.middlename"
              type="text"
              className="form-control"
              placeholder="Your middle name(s)"
              value={this.state.name.middlename}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="name.lastname"
              className="form-control"
              placeholder="Your last name"
              value={this.state.name.lastname}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="email"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="phonenumber"
              className="form-control"
              placeholder="Your phone number"
              value={this.state.phonenumber}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="location"
              className="form-control"
              placeholder="Your location"
              value={this.state.location}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="links.linkedin"
              className="form-control"
              placeholder="A link to your linkedin"
              value={this.state.links.linkedin}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="links.github"
              className="form-control"
              placeholder="A link to your github"
              value={this.state.links.github}
            />
            <input
              onChange={this.handleChange}
              type="text"
              name="links.portfolio"
              className="form-control"
              placeholder="A link to your portfolio"
              value={this.state.links.portfolio}
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

class Settings extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/settings", title: "Settings" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Settings</h1>
            <PersonalInfo context={this.props.context} />
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
