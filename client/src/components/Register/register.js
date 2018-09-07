import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label
} from "reactstrap";
import "../Login/login.css";
import axios from "axios";

const urls = require("../../config/config.json");

class Register extends Component {
  state = {
    email: "scrinch@gmail.com",
    password: "scrinch1G!",
    confirmPassword: "scrinch1G!",
    username: "scrinch",
    submitted: false,
    submittedError: false,
    usernameInvalid: false,
    emailInvalid: false,
    passwordInvalid: false
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
        console.log(response);
        this.setState({ usernameInvalid: true });
      })
      .catch(err => {
        console.log(err);
      });
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
    if (!this.checkPasswordStrength(this.state.password)) {
      this.setState({ passwordInvalid: true });
    }

    // If all fields are valid and the confirm password matches password,
    // then account info is submitted and the user redirected to a modal with a link to the login page
    Promise.all([usernamePromise, emailPromise]).then(values => {
      console.log("The current state:", this.state);
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
    console.log("handleSubmit called");
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
        this.setState({ submitted: true, submittedError: false });
        console.log(response);
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
              <Label>Username</Label>
              <Input
                autoFocus
                invalid={this.state.usernameInvalid}
                id="username"
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <FormFeedback invalid>
                This username is already in use.
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                id="email"
                invalid={this.state.emailInvalid}
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <FormFeedback invalid>
                Please enter an unused valid email.
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                id="password"
                invalid={this.state.passwordInvalid}
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <FormFeedback invalid>
                Please use a complex password at least 8 characters long. It must include 1 character, 1 number, and a capitol letter. 
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label>Confirm password</Label>
              <Input
                id="confirmPassword"
                invalid={this.state.passwordInvalid}
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              block
              size="lg"
              color="primary"
              disabled={!this.validateForm()}
              onClick={() => this.checkInputValidity()}
            >
              Register
            </Button>
            <Button
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
            <p>
              Please check your email within 30 minutes to confirm your
              registration, then you can log in.
            </p>
            <Button
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
