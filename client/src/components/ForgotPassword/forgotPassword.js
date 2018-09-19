import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Input
} from "reactstrap";
import axios from "axios";

const urls = require("../../config/config.json");

class ForgotPassword extends Component {
  state = {
    email: "",
    submitted: false,
    submittedError: false
  };

  validateForm() {
    return this.state.email.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = () => {
    axios
      .put(`${urls[urls.basePath]}/users/forgotpassword`, {
        email: this.state.email,
        path: window.location.origin + "/confirmationpage"
      })
      .then(response => {
        this.setState({ submitted: true, submittedError: false });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ submitted: false, submittedError: true });
      });
  };

  render() {
    if (this.state.submitted === false) {
      return (
        <div className="Login">
          <Form>
            <FormGroup>
              <h5>Email</h5>
              <Input
                style={{fontSize: ".7rem", height: "2rem"}}
                autoFocus
                id="email"
                invalid={this.state.submittedError}
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                autoComplete="username"
              />
              <FormFeedback>
                The email your entered is not associated with a user or there
                was an error contacting the server.
              </FormFeedback>
            </FormGroup>
            <Button
            style={{fontSize: ".7rem", height: "2rem"}}
              block
              bssize="lg"
              color="primary"
              disabled={!this.validateForm()}
              onClick={() => this.handleSubmit()}
            >
              Submit
            </Button>
            <div className="bottom-buttons">
              <Button
              style={{fontSize: ".7rem", height: "2rem"}}
                color="danger"
                onClick={() => this.props.history.push("/login")}
              >
                Login
              </Button>
              <Button
              style={{fontSize: ".7rem", height: "2rem"}}
                color="danger"
                onClick={() => this.props.history.push("/register")}
              >
                Register
              </Button>
            </div>
          </Form>
        </div>
      );
    } else {
      return (
        <div className="Login">
          <div className="message">
            <p>
              Please check your email within 30 minutes to reset your password.
            </p>
            <Button
            style={{fontSize: ".7rem", height: "2rem"}}
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

export default ForgotPassword;
