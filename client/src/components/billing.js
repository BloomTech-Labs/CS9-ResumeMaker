import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar"

class Billing extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <h1>Billing</h1>
      </div>
    );
  }
}

export default Billing;
