import React, { Component } from "react";
import {
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

class ConfirmationPage extends Component {
  state = {
    submitted: false,
    submittedError: false
  };

  componentDidMount = () => {
    const serverPath = window.location.search.substring(1);
    console.log("WE HAVE URL:", `${urls[urls.basePath]}${serverPath}`);
    axios
      .get(`${urls[urls.basePath]}${serverPath}`)
      .then(response => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.props.context.actions.setLogin(response.data.user);
          this.props.history.push("/templates");
        }
        this.setState({ submitted: true, submittedError: false });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ submitted: false, submittedError: true });
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
    return (
      <div className="Login">
        <div className="message">
          <p>
            Please check your email within 30 minutes to reset your password.
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

export default ConfirmationPage;
