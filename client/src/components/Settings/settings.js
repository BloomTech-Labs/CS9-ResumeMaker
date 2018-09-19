import React, { Component } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback
} from "reactstrap";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";

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
      phonenumber: "",
      links: {
        linkedin: "",
        github: "",
        portfolio: ""
      },
      oldpassword: "",
      newpassword: "",
      newconfirmpassword: "",
      usernameInvalid: false,
      emailInvalid: false,
      passwordInvalid: false,
      changesSaved: null,
      emailChanged: false,
      newPasswordInvalid: null,
      passwordChanged: false
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    } else {
      // This automatically updates the state properties with userInfo ones, but they have to be in the same format/names as userInfo uses!
      this.setState(
        this.augmentObject(this.state, this.props.context.userInfo)
      );
    }
  };

  componentDidUpdate = () => {
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
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    return re.test(email);
  };

  checkPasswordStrength = password => {
    if (password === "") {
      this.setState({ newPasswordInvalid: null });
      return;
    }
    const minlength = 6;
    if (password.length < minlength) {
      this.setState({ newPasswordInvalid: true });
    } else if (!password.match(/[A-Z]/)) {
      this.setState({ newPasswordInvalid: true });
    } else if (!password.match(/[a-z]/)) {
      this.setState({ newPasswordInvalid: true });
    } else if (!password.match(/\d/)) {
      this.setState({ newPasswordInvalid: true });
    } else if (
      // eslint-disable-next-line
      !password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/)
    ) {
      this.setState({ newPasswordInvalid: true });
    } else {
      this.setState({ newPasswordInvalid: false });
    }
    return;
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
      passwordInvalid: false,
      changesSaved: null
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
        if (
          this.state.usernameInvalid === false &&
          this.state.emailInvalid === false &&
          this.state.changesSaved === null
        ) {
          this.setState({ emailChanged: true });
          this.handleSubmit();
        } else {
          this.setState({ changesSaved: false });
          // this.componentDidMount();
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
        if (response.data.errorMessage) {
          if (response.data.errorMessage.includes("password")) {
            this.setState({ passwordInvalid: true, oldpassword: "" });
          }
        }
        if (response.data.token) {
          this.setState({
            oldpassword: this.state.newpassword,
            newpassword: "",
            newconfirmpassword: ""
          });
          localStorage.setItem("token", response.data.token);
        }
        response.data.user.changesSaved = true;
        this.setState(response.data.user);
        // This updates context with the new user info from server
        this.props.context.actions.setLogin(response.data);
      })
      .catch(err => {
        this.setState({ changesSaved: false });
        alert("try again");
      });
  };
  render() {
    return (
      <Container className="Settings">
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="name.firstname"
                  maxLength={20}
                  bssize="sm"
                  value={this.state.name.firstname}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Middle Name</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="name.middlename"
                  maxLength={20}
                  bssize="sm"
                  value={this.state.name.middlename}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="name.lastname"
                  maxLength={20}
                  bssize="sm"
                  value={this.state.name.lastname}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone Number</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="phonenumber"
                  maxLength={20}
                  bssize="sm"
                  value={this.state.phonenumber}
                  onChange={this.handleChange}
                />
                <p style={{ fontStyle : "italic", color: "grey" }}>Example: 123-456-7890</p>
              </FormGroup>
              <FormGroup>
                <Label>Location</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="location"
                  bssize="sm"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Linkedin</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="links.linkedin"
                  bssize="sm"
                  value={this.state.links.linkedin}
                  onChange={this.handleChange}
                />
                {this.props.context.userInfo.name.firstname ? (
                  <p style={{ fontStyle : "italic", color: "grey" }}>
                    Example: linkedin.com/in/
                    {this.props.context.userInfo.name.firstname.toLowerCase()}/
                  </p>
                ) : (
                  <p style={{ fontStyle : "italic", color: "grey" }}>Example: linkedin.com/in/test/</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Github</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="links.github"
                  bssize="sm"
                  value={this.state.links.github}
                  onChange={this.handleChange}
                />
                {this.props.context.userInfo.name.firstname ? (
                  <p style={{ fontStyle : "italic", color: "grey" }}>
                    Example: github.com/
                    {this.props.context.userInfo.name.firstname.toLowerCase()}
                  </p>
                ) : (
                  <p style={{ fontStyle : "italic", color: "grey" }}>Example: github.com/test</p>
                )}
              </FormGroup>
              <FormGroup>
                <Label>Portfolio</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="links.portfolio"
                  bssize="sm"
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
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  id="email"
                  invalid={this.state.emailInvalid}
                  bssize="sm"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <FormFeedback style={{ fontSize: ".7rem" }}>
                  Please enter an unused valid email.
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Current Password</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  invalid={
                    this.state.passwordInvalid === true ||
                    (this.state.email !== this.props.context.userInfo.email &&
                      this.state.oldpassword === "") ||
                    (this.state.newpassword !== "" &&
                      this.state.oldpassword === "")
                  }
                  valid={
                    this.state.passwordInvalid === false &&
                    this.state.changesSaved !== null &&
                    this.state.oldpassword !== ""
                  }
                  id="oldpassword"
                  bssize="sm"
                  type="password"
                  value={this.state.oldpassword}
                  onChange={this.handleChange}
                />
                <FormFeedback style={{ fontSize: ".7rem" }}>
                  Please enter your current password to change your email or
                  password.
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>New Password</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  invalid={
                    this.state.newPasswordInvalid === true &&
                    this.state.newpassword !== ""
                  }
                  valid={
                    this.state.newPasswordInvalid === false &&
                    this.state.newpassword !== ""
                  }
                  id="newpassword"
                  bssize="sm"
                  type="password"
                  value={this.state.newpassword}
                  onChange={e => {
                    this.handleChange(e);
                    this.checkPasswordStrength(e.target.value);
                  }}
                />
                <FormFeedback style={{ fontSize: ".7rem" }}>
                  Please use a complex password at least 8 characters long.
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label>Confirm New Password</Label>
                <Input
                  style={{ fontSize: ".7rem", height: "1.5rem" }}
                  valid={
                    this.state.newpassword === this.state.newconfirmpassword &&
                    this.state.newpassword !== ""
                  }
                  invalid={
                    this.state.newpassword !== "" &&
                    this.state.newpassword !== this.state.newconfirmpassword
                  }
                  id="newconfirmpassword"
                  bssize="sm"
                  type="password"
                  value={this.state.newconfirmpassword}
                  onChange={this.handleChange}
                />
                <FormFeedback style={{ fontSize: ".7rem" }}>
                  Please make this match your new password.
                </FormFeedback>
              </FormGroup>
            </Form>
            <div className="settings-footer mt-4">
              <Button
                color="primary"
                style={{ fontSize: ".7rem", height: "1.7rem" }}
                onClick={() => this.checkInputValidity()}
              >
                Submit
              </Button>
              <div className="saved-status" style={{ fontSize: ".7rem" }}>
                {this.state.changesSaved && this.state.changesSaved !== null ? (
                  <span>Your changes were saved. </span>
                ) : null}
                {!this.state.changesSaved &&
                this.state.changesSaved !== null ? (
                  <span>Your changes were not saved. </span>
                ) : null}
                {this.state.emailChanged && this.state.changesSaved ? (
                  <span>
                    Please check your new email within 30 minutes to confirm
                    your email change.
                  </span>
                ) : null}
                {/* {this.state.passwordChanged && this.state.changesSaved ? (
                  <span>
                    You changed your password.
                  </span>
                ) : null} */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

class Settings extends Component {
  ComponentDidMount = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div>
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="settings title-div col">
            <div className="section-title">
              <div className="link-hide" style={{float: "left", padding: "0"}}>
                <h4>SETTINGS</h4>
              </div>              
              <div style={{width: "100%"}}>
                <p
                  style={{
                    display: "inline-block",
                    fontSize: "0.7rem",
                    paddingLeft: ".6rem",
                    borderTop: "1px solid black",
                    width: "100%"
                  }}
                >
                  Change Your User Information:
                </p>
              </div>
              <PersonalInfo context={this.props.context} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
