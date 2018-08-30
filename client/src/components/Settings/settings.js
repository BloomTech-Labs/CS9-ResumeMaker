import React, { Component } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback
} from "reactstrap";

import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "./settings.css";

const urls = require("../../config/config.json");

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
      usernameInvalid: false,
      emailInvalid: false,
      passwordInvalid: false
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
    if (password === "") {
      console.log("pass is empty");

      return false;
    }
    const minlength = 6;
    if (password.length < minlength) return false;
    if (!password.match(/[A-Z]/)) return false;
    if (!password.match(/[a-z]/)) return false;
    if (!password.match(/\d/)) return false;
    if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/))
      return false;
    return true;
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
      // usernameInvalid: false,
      emailInvalid: false,
      passwordInvalid: false
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
          this.setState({ emailInvalid: true });
        })
        .catch(err => {
          console.log(err);
        });
      if (!this.validateEmail(this.state.email)) {
        this.setState({ emailInvalid: true });
      }

      // If all fields are valid and the confirm password matches password,
      // then account info is submitted and the user redirected to a modal with a link to the login page
      Promise.all([emailPromise]).then(values => {
        console.log("The current state:", this.state);
        if (
          this.state.usernameInvalid === false &&
          this.state.emailInvalid === false
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
            this.setState({ passwordInvalid: true });
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
      <Container className="Settings">
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  id="name.firstname"
                  size="sm"
                  value={this.state.name.firstname}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Middle Name</Label>
                <Input
                  id="name.middlename"
                  size="sm"
                  value={this.state.name.middlename}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  id="name.lastname"
                  size="sm"
                  value={this.state.name.lastname}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  id="phonenumber"
                  size="sm"
                  value={this.state.phonenumber}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Location</Label>
                <Input
                  id="location"
                  size="sm"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Linkedin</Label>
                <Input
                  id="links.linkedin"
                  size="sm"
                  value={this.state.links.linkedin}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Github</Label>
                <Input
                  id="links.github"
                  size="sm"
                  value={this.state.links.github}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Portfolio</Label>
                <Input
                  id="links.portfolio"
                  size="sm"
                  value={this.state.links.portfolio}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </Col>
          <Col>
            <Form>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  id="email"
                  invalid={this.state.emailInvalid}
                  size="sm"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <FormFeedback invalid>
                  Please enter an unused valid email.
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Current Password</Label>
                <Input
                  valid={!this.state.passwordInvalid}
                  invalid={
                    (this.state.passwordInvalid ||
                      this.state.newpassword !== "" ||
                      this.state.email !== this.props.context.userInfo.email) &&
                    this.state.oldpassword === ""
                  }
                  id="oldpassword"
                  size="sm"
                  type="password"
                  value={this.state.oldpassword}
                  onChange={this.handleChange}
                />
                <FormFeedback invalid>
                  Please enter your current password to change your email or
                  password.
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>New Password</Label>
                <Input
                  invalid={
                    !this.checkPasswordStrength(this.state.newpassword) &&
                    this.state.newpassword !== ""
                      ? true
                      : false
                  }
                  valid={this.checkPasswordStrength(this.state.newpassword)}
                  id="newpassword"
                  size="sm"
                  type="password"
                  value={this.state.newpassword}
                  onChange={this.handleChange}
                />
                <FormFeedback invalid>
                  Please use a complex password at least 8 characters long.
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Confirm New Password</Label>
                <Input
                  valid={
                    this.state.newpassword === this.state.newconfirmpassword &&
                    this.state.newpassword !== ""
                  }
                  invalid={
                    this.state.newpassword !== this.state.newconfirmpassword &&
                    this.state.newconfirmpassword !== ""
                  }
                  id="newconfirmpassword"
                  size="sm"
                  type="password"
                  value={this.state.newconfirmpassword}
                  onChange={this.handleChange}
                />
                <FormFeedback invalid>
                  Please make this match your new password.
                </FormFeedback>
              </FormGroup>
            </Form>
            <Button
              color="primary"
              className="mt-2"
              onClick={() => this.checkInputValidity()}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
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
            { link: "/"},
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
