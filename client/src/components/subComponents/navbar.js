import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./CSS/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-dark bg-dark mb-0">
         <ol className="breadcrumb bg-dark">
          {this.props.breadcrumbs.map((item, index) => (
            <li className="breadcrumb-item" key={index}>
              <Link style={{ color: "white", fontFamily: 'helvetica', fontSize: '0.8rem'}} to={item.link}>
                {item.title}
              </Link>
            </li>
          ))}
        </ol>
        <Route
          render={({ history }) => (
            <button
            style={{ color: "white"}}
            type="button"
            className="logout btn bg-dark"
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
