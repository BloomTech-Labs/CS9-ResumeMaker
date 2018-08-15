import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar"

class Summary extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <h1>Summary</h1>
      </div>
    );
  }
}

export default Summary;
