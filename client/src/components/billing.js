import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";

class Billing extends Component {

  submit = () => {

  }

  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Billing</h1>
            <div className="stripe">
              <p>Would you like to complete a purchase?</p>
              <CardElement />
              <button onClick={this.submit}>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(Billing);
