import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./CSS/navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav class="navbar sticky-top navbar-dark bg-primary">
        <ol class="breadcrumb">
          {this.props.breadcrumbs.map(item => <li class="breadcrumb-item"><Link to={item.link} className="sidebar-button">{item.title}</Link></li>)}
        </ol>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button type="button" class="btn btn-secondary">Logout</button>
      </nav>
    );
  }
}

export default Navbar;
