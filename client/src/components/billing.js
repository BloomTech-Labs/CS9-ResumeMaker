import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import "./CSS/billing.css";

class Billing extends Component {
  state = {
    complete: false
  };

  submit = async () => {
    let { token } = await this.props.stripe.createToken({
      email: this.props.context.userInfo.email
    });
    axios
      .post("http://localhost:3333/pay/monthly", token)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
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
            <p>Would You Like To Become a Member?</p>
            <div className="stripe">
              <div className="card-element">
                <CardElement />
              </div>
              <button onClick={this.submit}>Monthly Subscriptions - $4.99</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(Billing);
