import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar"
import Navbar from "./subComponents/navbar";

class Settings extends Component {
  render() {
    return (
      <div>
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/settings", title: "Settings" }]} />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Settings</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
