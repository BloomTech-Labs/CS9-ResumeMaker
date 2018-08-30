import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";
import "./login.css";
const urls = require("../../config/config.json");

const cheese = {
  email: "cheese23@gmail.com",
  password: "Cheese123!",
  invalidCredentials: false
};

const scrinch = {
  email: "scrinch@gmail.com",
  password: "tacobell1!G1",
  invalidCredentials: false
};

const bobbert = {
  email: "bobbert@gmail.com",
  password:
    "NGVmNjllOTVhOGRlNDU0Y2ZkYzA2MmViYTUyNTYyNTk5OTVmOTdhZjBiZjNhMjRlYWNiNTEzZGVjM2ViY2Y1ZA!",
  invalidCredentials: false
};


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = cheese;
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(`${urls[urls.basePath]}/users/login`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data.token) {
          const userData = response.data.user;
          console.log(userData);
          localStorage.setItem("token", response.data.token);
          this.props.context.actions.setLogin(userData);

          console.log(this.props.context.userInfo);
          this.props.history.push("/templates");
        } else this.setState({ invalidCredentials: true, password: "" });
      })
      .catch(err => {
        console.log("err", err);
        localStorage.removeItem("token");
        this.setState({ invalidCredentials: true, password: "" });
      });
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {this.state.invalidCredentials ? (
            <h3 className="mb-5">Invalid password or email.</h3>
          ) : null}
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            bsStyle="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
