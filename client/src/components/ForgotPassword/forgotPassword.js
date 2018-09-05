import React, { Component } from "react";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label
} from "reactstrap";
import axios from "axios";
import "../Login/login.css";

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
        email: this.state.email
      })
      .then(response => {
        console.log(response);
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
              <Label>Email</Label>
              <Input
                autoFocus
                id="email"
                invalid={this.state.submittedError}
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                autoComplete="username"
              />
              <FormFeedback invalid>
                The email your entered is not associated with a user or there
                was an error contacting the server.
              </FormFeedback>
            </FormGroup>
            <Button
              block
              size="lg"
              color="primary"
              disabled={!this.validateForm()}
              onClick={() => this.handleSubmit()}
            >
              Submit
            </Button>
            <div className="bottom-buttons">
              <Button
                color="danger"
                onClick={() => this.props.history.push("/login")}
              >
                Login
              </Button>
              <Button
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
          <div className="static-modal">
            <Modal.Dialog>
              {/* <Modal.Header>
                <Modal.Title>We don't need a header probably</Modal.Title>
              </Modal.Header> */}
              <Modal.Body>
                Please check your email to get a temporary password.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  color="secondary"
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                >
                  Take me to the login page
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </div>
      );
    }
  }
}

export default ForgotPassword;
