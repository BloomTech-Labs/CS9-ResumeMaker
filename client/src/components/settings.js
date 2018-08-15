import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar"

class Settings extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <h1>Settings</h1>
      </div>
    );
  }
}

export default Settings;
