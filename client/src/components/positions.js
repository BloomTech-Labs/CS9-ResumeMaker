import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar"
import Navbar from "./subComponents/navbar";

class Position extends Component {
  render() {
    return (
      <div>
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/templates", title: "Templates" }]} />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Positions</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Position;
