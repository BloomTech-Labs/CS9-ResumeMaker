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
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <Route
          render={({ history }) => (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                console.log(this.props.context);
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
