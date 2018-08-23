import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";

class Billing extends Component {
  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/billing", title: "Billing" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Billing</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Billing;
