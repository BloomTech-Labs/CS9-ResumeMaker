import React, { Component } from "react";
import axios from "axios";

import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";

import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import "./CSS/settings.css";

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
      // title: "",
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
      newconfirmpassword: "",
      usernameInvalid: null,
      emailInvalid: null,
      passwordInvalid: null
    };
  }

  componentDidMount = () => {
    console.log("ComponentDidMount");
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    } else {
      console.log(
        "(augmentObj called) props on componentDidMount:",
        this.props.context.userInfo
      );
      // This automatically updates the state properties with userInfo ones, but they have to be in the same format/names as userInfo uses!
      this.setState(
        this.augmentObject(this.state, this.props.context.userInfo)
      );
    }
  };
  componentWillUpdate = () => {
    console.log("ComponentWillUpdate");
  };
  componentDidUpdate = () => {
    console.log("ComponentDidUpdate");
    if (this.state.email === "" && this.props.context.userInfo.auth === true) {
      this.componentDidMount();
    }
  };

  augmentObject = (initObj, modObj) => {
    for (let prop in initObj) {
      if (modObj[prop]) {
        let val = modObj[prop];
        if (typeof val === "object" && typeof initObj[prop] === "object")
          this.augmentObject(initObj[prop], val);
        else initObj[prop] = val;
      }
    }
    return initObj;
  };

  validateEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

  checkPasswordStrength = password => {
    if (password === "") return null;
    const minlength = 6;
    if (password.length < minlength) return "error";
    if (!password.match(/[A-Z]/)) return "error";
    if (!password.match(/[a-z]/)) return "error";
    if (!password.match(/\d/)) return "error";
    if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/))
      return "error";
    return "success";
  };

  checkConfirmPassword = () => {
    if (this.state.newpassword === "") return null;
    if (this.state.newpassword !== this.state.newconfirmpassword) {
      return "error";
    } else return "success";
  };

  handleChange = e => {
    const eName = e.target.id;
    const value = e.target.value;
    if (eName.includes("name")) {
      let { name } = this.state;
      const nameArr = eName.split(".");
      name[nameArr[1]] = value;
      this.setState({ name });
    } else if (eName.includes("links")) {
      let { links } = this.state;
      const linksArr = eName.split(".");
      links[linksArr[1]] = value;
      this.setState({ links });
    } else {
      this.setState({ [eName]: value });
    }
  };

  checkInputValidity = () => {
    this.setState({
      // usernameInvalid: null,
      emailInvalid: null,
      passwordInvalid: null
    });
    if (this.state.email !== this.props.context.userInfo.email) {
      // const usernamePromise = axios
      //   .get(`${urls[urls.basePath]}/users/usernamecheck/${this.state.username}`)
      //   .then(response => {
      //     console.log(response);
      //     this.setState({ usernameInvalid: "error" });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      const emailPromise = axios
        .get(`${urls[urls.basePath]}/users/emailcheck/${this.state.email}`)
        .then(response => {
          console.log(response);
          this.setState({ emailInvalid: "error" });
        })
        .catch(err => {
          console.log(err);
        });
      if (!this.validateEmail(this.state.email)) {
        this.setState({ emailInvalid: "error" });
      }

      // If all fields are valid and the confirm password matches password,
      // then account info is submitted and the user redirected to a modal with a link to the login page
      Promise.all([emailPromise]).then(values => {
        console.log("The current state:", this.state);
        if (
          // this.state.usernameInvalid === null &&
          this.state.emailInvalid === null
        ) {
          this.handleSubmit();
        } else {
          this.componentDidMount();
        }
      });
    } else this.handleSubmit();
  };

  handleSubmit = e => {
    // e.preventDefault();
    // this.setState({ errors: [] });
    // const errors = [];
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
        console.log("RESPONSE GOTTEN", response);
        if (response.data.errorMessage) {
          if (response.data.errorMessage.includes("password")) {
            this.setState({ passwordInvalid: "error" });
          }
        }
        this.setState(response.data.user);
        // This updates context with the new user info from server
        this.props.context.actions.setLogin(response.data.user);
      })
      .catch(err => {
        console.log("oops", err.message);
        alert("try again");
      });
  };
  render() {
    console.log("Render for settings called, STATE:", this.state);
    console.log(
      "Render for settings called, PROPS:",
      this.props.context.userInfo
    );
    return (
      <div>
        <h1> Personal Information </h1>
        <div className="Settings">
          <form>
            <FormGroup controlId="name.firstname" bsSize="large">
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                value={this.state.name.firstname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="name.middlename" bsSize="large">
              <ControlLabel>Middle Name</ControlLabel>
              <FormControl
                value={this.state.name.middlename}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="name.lastname" bsSize="large">
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                value={this.state.name.lastname}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="phonenumber" bsSize="large">
              <ControlLabel>Phone Number</ControlLabel>
              <FormControl
                value={this.state.phonenumber}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="location" bsSize="large">
              <ControlLabel>Location</ControlLabel>
              <FormControl
                value={this.state.location}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="links.linkedin" bsSize="large">
              <ControlLabel>Linkedin</ControlLabel>
              <FormControl
                value={this.state.links.linkedin}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="links.github" bsSize="large">
              <ControlLabel>Github</ControlLabel>
              <FormControl
                value={this.state.links.github}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="links.portfolio" bsSize="large">
              <ControlLabel>Portfolio</ControlLabel>
              <FormControl
                value={this.state.links.portfolio}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup
              controlId="email"
              bsSize="large"
              validationState={this.state.emailInvalid}
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {this.state.emailInvalid ? (
                <HelpBlock>Please enter an unused valid email.</HelpBlock>
              ) : null}
            </FormGroup>
            <FormGroup
              controlId="oldpassword"
              bsSize="large"
              validationState={this.checkPasswordStrength(
                this.state.oldpassword
              )}
            >
              <ControlLabel>Current Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.oldpassword}
                onChange={this.handleChange}
              />
              {this.state.passwordInvalid ? (
                <HelpBlock>
                  Incorrect password. Please enter your current password if you
                  want to make a new password or change your email.
                </HelpBlock>
              ) : null}
            </FormGroup>
            <FormGroup
              controlId="newpassword"
              bsSize="large"
              validationState={this.checkPasswordStrength(
                this.state.newpassword
              )}
            >
              <ControlLabel>New Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.newpassword}
                onChange={this.handleChange}
              />
              {this.checkPasswordStrength(this.state.newpassword) ? (
                <HelpBlock>
                  Please use a complex password at least 8 characters long.
                </HelpBlock>
              ) : null}
            </FormGroup>
            <FormGroup
              controlId="newconfirmpassword"
              bsSize="large"
              validationState={this.checkConfirmPassword()}
            >
              <ControlLabel>Confirm New Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.newconfirmpassword}
                onChange={this.handleChange}
              />
              {this.state.newconfirmpassword !== this.state.newpassword ? (
                <HelpBlock>Please make this match your new password.</HelpBlock>
              ) : null}
            </FormGroup>
            <Button
              block
              bsSize="large"
              bsStyle="primary"
              onClick={() => this.checkInputValidity()}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

class Settings extends Component {
  ComponentDidMount = () => {
    console.log("ComponentDidMount");
  };
  ShouldComponentUpdate = () => {
    console.log("ShouldComponentUpdate");
  };
  ComponentWillUpdate = () => {
    console.log("ComponentWillUpdate");
  };
  ComponentDidUpdate = () => {
    console.log("ComponentDidUpdate");
  };
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
