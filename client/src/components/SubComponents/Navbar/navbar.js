import React, { Component } from "react";
import { Link, Route } from "react-router-dom";

import "./navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top mb-0 d-flex justify-content-end">
          
        {/* <ol className="breadcrumb p-1 mb-0 bg-dark ">
        <Link className="knockout" style={{fontSize: '1.3rem'}} to="/">rezLeft</Link>
          {this.props.breadcrumbs.map((item, index) => (
            <li className="breadcrumb-item" key={index}>
              <Link
                className="breadcrumb-item"
                style={{
                  color: "#45A29E",
                  fontFamily: "Verdana",
                  fontSize: "0.7rem", 
                  fontWeight: "550", 

                }}
                to={item.link}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ol> */}
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
