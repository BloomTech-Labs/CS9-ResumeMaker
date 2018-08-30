import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import "./navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-dark bg-dark mb-0">
          
        <ol className="breadcrumb p-1 mb-0 bg-dark ">
        <Link className="knockout" style={{fontSize: '1.2rem'}} to="/">RezLeft</Link>
          {this.props.breadcrumbs.map((item, index) => (
            <li className="breadcrumb-item" key={index}>
              <Link
                className="breadcrumb-item"
                style={{
                  color: "white",
                  fontFamily: "helvetica",
                  fontSize: "0.7rem"
                }}
                to={item.link}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ol>
        <Route
          render={({ history }) => (
            <div
              style={{ color: "white" }}
              className="logout btn bg-dark"
              onClick={() => {
                this.props.context.actions.setLogout();
                history.push("/");
              }}
            >
              Logout
            </div>
          )}
        /> 
      </nav>
    );
  }
}

export default Navbar;
