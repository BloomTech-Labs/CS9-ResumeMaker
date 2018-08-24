import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./CSS/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top jumbotron banner">
        <ol className="breadcrumb">
          {this.props.breadcrumbs.map((item, index) => (
            <li className="breadcrumb-item" key={index}>
              <Link to={item.link} className="sidebar-button">
                {item.title}
              </Link>
            </li>
          ))}
        </ol>
        <Route
          render={({ history }) => (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                this.props.context.actions.setValue("auth", false);
                localStorage.removeItem("token");
                history.push("/");
              }}
            >
              Logout
            </button>
          )}
        />
      </nav>
    );
  }
}

export default Navbar;
