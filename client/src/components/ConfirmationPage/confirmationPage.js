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
    message: "Loading...",
    password: null
  };

  componentDidMount = () => {
    const serverPath = window.location.search.substring(1);
    console.log("WE HAVE URL:", `${urls[urls.basePath]}${serverPath}`);
    axios
      .get(`${urls[urls.basePath]}${serverPath}`)
      .then(response => {
        console.log(response);
        if (response.data.errorMessage) {
          this.setState({ message: response.data.errorMessage });
        } else if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.props.context.actions.setLogin(response.data.user);
          this.props.history.push("/templates");
        } else {
          this.setState({
            message: response.data.message,
            password: response.data.password
          });
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    if (this.state.password && this.state.message !== "Loading...") {
      return (
        <div className="Login">
          <div className="message">
            <p>
              {this.state.message} Your password is now {this.state.password}
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
    } else
      return (
        <div className="Login">
          <div className="message">
            <p>{this.state.message}</p>
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