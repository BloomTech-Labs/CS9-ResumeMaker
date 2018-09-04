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
import "./login.css";
const urls = require("../../config/config.json");

// const user = {
//   email: "scrinch@gmail.com",
//   password: "tacobell1!G",
//   invalidCredentials: false
// };

// const user = {
//   email: "bobbert@gmail.com",
//   password:
//     "NGVmNjllOTVhOGRlNDU0Y2ZkYzA2MmViYTUyNTYyNTk5OTVmOTdhZjBiZjNhMjRlYWNiNTEzZGVjM2ViY2Y1ZA!",
//   invalidCredentials: false
// };

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      submitted: false
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

    axios
      .post(`${urls[urls.basePath]}/users/forgotpassword`, {
        email: this.state.email
      })
      .then(response => {
        if (response.data.token) {
          this.setState({ submitted: true });
        } else this.setState({ submitted: false, email: "" });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    return (
      <div className="Login">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              autoFocus
              id="email"
              invalid={this.state.invalidCredentials}
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="username"
            />
            <FormFeedback invalid>
              The email or password you entered are incorrect.
            </FormFeedback>
          </FormGroup>

          <Button
            block
            size="lg"
            color="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}
