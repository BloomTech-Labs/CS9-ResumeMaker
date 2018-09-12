import React, { Component } from "react";
import { Route } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top mb-0 d-flex justify-content-end">
        <Route 
          render={({ history }) => (
            <div
              style={{ fontSize: "0.8rem", fontFamily: "Verdana", color: "#F2F2F0", textShadow: "1px 1px black", padding: "0"}}
              className="logout-btn logout btn"
              onClick={() => {
                this.props.context.actions.setLogout();
                history.push("/");
              }}
            >
              LOGOUT
            </div>
          )}
        /> 
      </nav>
    );
  }
}

export default Navbar;
