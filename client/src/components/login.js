import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./CSS/login.css";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "bobbert@gmail.com",
      password: "bobbert",
      invalidCredentials: false
    };
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
    const setLogin = this.props.context.actions.setLogin;

    axios
      .post("https://easy-resume.herokuapp.com/users/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        if (response.data.token) {
          const userData = response.data.user;
          console.log(userData);
          localStorage.setItem("token", response.data.token);
          setLogin(userData);

          console.log(this.props.context.userInfo);
          this.props.history.push("/resumes");
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
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        {this.state.invalidCredentials ? <h3>Invalid Credentials</h3> : null}
      </div>
    );
  }
}
