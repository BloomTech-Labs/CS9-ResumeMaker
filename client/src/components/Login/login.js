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
const urls = require("../../config/config.json");

const resumePopulateTester = {
  email: "resumePopulateTester@gmail.com",
  password: "scrinch1G!",
  invalidCredentials: false
};

const cheese = {
  email: "cheese23@gmail.com",
  password: "Cheese123!",
  invalidCredentials: false
};

// const scrinch = {
//   email: "scrinch@gmail.com",
//   password: "tacobell1!G",
//   invalidCredentials: false
// };

const bobbert = {
  email: "bobbert@gmail.com",
  password:
    "NGVmNjllOTVhOGRlNDU0Y2ZkYzA2MmViYTUyNTYyNTk5OTVmOTdhZjBiZjNhMjRlYWNiNTEzZGVjM2ViY2Y1ZA!",
  invalidCredentials: false
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = resumePopulateTester;
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
          localStorage.setItem("token", response.data.token);
          this.props.context.actions.setLogin(response.data);
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
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <h5>Email</h5>
            <Input
              style={{ fontSize: ".7rem", height: "2rem" }}
              autoFocus
              id="email"
              invalid={this.state.invalidCredentials}
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="username"
            />
          </FormGroup>
          <FormGroup>
            <h5>Password</h5>
            <Input
              style={{ fontSize: ".7rem", height: "2rem" }}
              id="password"
              invalid={this.state.invalidCredentials}
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              autoComplete="current-password"
            />
            <FormFeedback invalid>
              The email or password you entered are incorrect.
            </FormFeedback>
          </FormGroup>
          <Button
            style={{ fontSize: ".8rem", height: "2rem" }}
            block
            bsSize="lg"
            color="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <div className="bottom-buttons">
            <Button
              style={{ fontSize: ".7rem", height: "2rem" }}
              color="danger"
              onClick={() => this.props.history.push("/register")}
            >
              Register
            </Button>
            <Button
              style={{ fontSize: ".7rem", height: "2rem" }}
              color="danger"
              onClick={() => this.props.history.push("/forgotpassword")}
            >
              Forgot Password
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Login;
