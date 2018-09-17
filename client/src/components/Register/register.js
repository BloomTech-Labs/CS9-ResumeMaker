import React, { Component } from "react";
import { Button, Form, FormGroup, FormFeedback, Input } from "reactstrap";
import axios from "axios";

const urls = require("../../config/config.json");

class Register extends Component {
  state = {
    email: "scrinch32@gmail.com",
    password: "Scrinch32!1",
    confirmPassword: "Scrinch32!1",
    username: "scrinch32",
    submitted: false,
    submittedError: false,
    usernameInvalid: false,
    emailInvalid: false,
    passwordInvalid: false,
    validateMessage: ""
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.username.length > 0 &&
      this.state.confirmPassword === this.state.password
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateEmail = email => {
    // eslint-disable-next-line
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

  checkPasswordStrength = password => {
    if (password === "") {
      return false;
    }
    const minlength = 6;
    if (password.length < minlength) return false;
    if (!password.match(/[A-Z]/)) return false;
    if (!password.match(/[a-z]/)) return false;
    if (!password.match(/\d/)) return false;
    // eslint-disable-next-line
    if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/))
      return false;
    return true;
  };

  checkInputValidity = () => {
    this.setState({
      usernameInvalid: false,
      emailInvalid: false,
      passwordInvalid: false
    });
    const usernamePromise = axios
      .get(`${urls[urls.basePath]}/users/usernamecheck/${this.state.username}`)
      .then(response => {
        this.setState({ usernameInvalid: true });
      })
      .catch(err => {
        console.log(err);
      });
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
    if (!this.checkPasswordStrength(this.state.password)) {
      this.setState({ passwordInvalid: true });
    }

    // If all fields are valid and the confirm password matches password,
    // then account info is submitted and the user redirected to a modal with a link to the login page
    Promise.all([usernamePromise, emailPromise]).then(values => {
      if (
        this.state.usernameInvalid === false &&
        this.state.emailInvalid === false &&
        this.state.passwordInvalid === false &&
        this.state.password === this.state.confirmPassword
      ) {
        this.handleSubmit();
      } else {
        this.componentDidMount();
      }
    });
  };

  componentDidMount = () => {
    this.render();
  };

  handleSubmit = () => {
    // Putting the set state here allows the submit modal to show before
    // the email is sent. If the response gives an error the submittedError property
    // will override the submitted modal and show there was an error.
    axios
      .post(`${urls[urls.basePath]}/users/register`, {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        path: window.location.origin + "/confirmationpage"
      })
      .then(response => {
        this.setState({ submitted: true, submittedError: false, validateMessage: response.data });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ submittedError: true, submitted: false });
      });
  };

  resetSubmitStatus = () => {
    this.setState({ submitted: false, submittedError: false });
  };

  render() {
    console.log("state", this.state);
    if (this.state.submittedError === true) {
      return (
        <div className="Login">
          <div className="message">
            <p>
              There was an error with your submission or our server is down.
              Please try again in a few minutes.
            </p>
            <Button
              color="secondary"
              onClick={() => {
                this.resetSubmitStatus();
              }}
            >
              Try again
            </Button>
          </div>
        </div>
      );
    } else if (this.state.submitted === false) {
      return (
        <div className="Login">
          <Form>
            <FormGroup>
              <h6>Username</h6>
              <Input
                style={{ fontSize: ".7rem", height: "2rem" }}
                autoFocus
                invalid={this.state.usernameInvalid}
                id="username"
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <FormFeedback>This username is already in use.</FormFeedback>
            </FormGroup>

            <FormGroup>
              <h6>Email</h6>
              <Input
                style={{ fontSize: ".7rem", height: "2rem" }}
                id="email"
                invalid={this.state.emailInvalid}
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <FormFeedback>Please enter an unused valid email.</FormFeedback>
            </FormGroup>
            {/* <h6>Password</h6>
            <div>Must be longer than 6 characters </div>
            <div>Must have at least 1 uppercase</div>
            <div>Must have at least 1 lowercase</div>
            <div>Must have at least 1 special character</div>
            <div style={{ marginBottom: "20px" }}>
              Must have at least 1 digit
            </div> */}
            <FormGroup>
              <h6>Password</h6>
              <Input
                style={{ fontSize: ".7rem", height: "2rem" }}
                id="password"
                invalid={this.state.passwordInvalid}
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FormFeedback>
                Please use a complex password at least 8 characters long. It
                must include 1 character, 1 number, and a capital letter.
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <h6>Confirm password</h6>
              <Input
                style={{ fontSize: ".7rem", height: "2rem" }}
                id="confirmPassword"
                invalid={this.state.passwordInvalid}
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              style={{ fontSize: ".8rem", height: "2rem" }}
              block
              bssize="lg"
              color="primary"
              disabled={!this.validateForm()}
              onClick={() => this.checkInputValidity()}
            >
              Register
            </Button>
            <Button
              style={{ fontSize: ".7rem", height: "2rem" }}
              color="danger"
              onClick={() => this.props.history.push("/login")}
            >
              Take me to the login page
            </Button>
          </Form>
        </div>
      );
    } else {
      return (
        <div className="Login">
          <div className="message">
            <p style={{ margin: "0" }}>
              {/* Please check your email within 30 minutes to confirm your
              registration, then you can log in.
              
              Please click the following link to register
              your account: */}
               Please click the link below to activate your account
            </p>
            <a
              style={{ marginTop: "10px", marginBottom: "10px" }}
              href={this.state.validateMessage}
            >
              {"Register Your Account"}
            </a>
            <Button
              style={{ fontSize: ".7rem", height: "2rem" }}
              color="primary"
              onClick={() => {
                this.props.history.push("/login");
              }}
            >
              Take me to the login page
            </Button>
          </div>
        </div>
      );
    }
  }
}

export default Register;
