import React, { Component } from "react";
import { Route } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top p-0 mb-0 d-flex " style={{padding:".3rem"}}>
      <h5 className="nav-header" style={{float: "left", color: "lightgray", margin: "0", paddingLeft: "1.5rem", fontWeight: "800", textShadow: "-1px -1px 1px black"}}>rezRight</h5>
        <Route 
          render={({ history }) => (
            <div
              style={{ fontSize: "0.8rem", fontFamily: "Verdana", color: "#F2F2F0", textShadow: "1px 1px black"}}
              className="logout-btn logout btn justify-content-end"
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
