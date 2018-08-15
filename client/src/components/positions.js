import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar"

class Position extends Component {
  render() {
    return (
      <div className="position">
        <Sidebar />
        <h1>Position</h1>
      </div>
    );
  }
}

export default Position;
