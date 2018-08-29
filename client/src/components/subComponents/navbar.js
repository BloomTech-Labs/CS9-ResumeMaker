import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./CSS/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-dark bg-dark mb-0">
        <ol className="breadcrumb p-0 mb-0 bg-dark">
          {this.props.breadcrumbs.map((item, index) => (
            <li className="breadcrumb-item" key={index}>
              <Link
                className="navbar-item"
                style={{
                  color: "white",
                  fontFamily: "helvetica",
                  fontSize: "0.8rem"
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
              style={{ color: "white"}}
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
