import React, { Component } from "react";

class Register extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    invalidCredentials: false
  };

  render() {
    return (
      <div className="App">
        <h3>Please create an account. </h3>
        <form class="signup">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" />
          </div>
          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email Address"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password"
            />
          </div>
          <div class="form-group">
            <div class="checkbox">
              <label>
                <input type="checkbox" />
                <span>
                  Please accept the terms and conditions to proceed with your
                  request.
                </span>
              </label>
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-success " value="SUBMIT" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
