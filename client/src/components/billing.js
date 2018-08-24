import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import axios from "axios";
import CheckoutForm from "./checkoutForm";

import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import "./CSS/billing.css";
const urls = require("../config.json");

class Billing extends Component {

  monthly = async (e) => {
    e.preventDefault();
    let { token } = await this.props.stripe.createToken({
      email: this.props.context.userInfo.email
    });
    axios
      .post(`${urls[urls.basePath]}/pay/monthly`, token)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  yearly = async (e) => {
    e.preventDefault();
    let { token } = await this.props.stripe.createToken({
      email: this.props.context.userInfo.email
    });
    axios
      .post(`${urls[urls.basePath]}/pay/yearly`, token)
      .then(res => {
        console.log("Successfully Subscribed to One Year")
      })
      .catch(err => {
        return;
      });
  };

  unsubscribe = (e) => {
    e.preventDefault();
    axios
      .post(`${urls[urls.basePath]}/pay/unsubscribe`, {
        email: this.props.context.userInfo.email
      })
      .then(res => {
        console.log("Successfully Unsubscribed");
      })
      .catch(err => {
        console.log("You are not even a member");
      });
  };

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
            <p>Would You Like To Become a Member?</p>
            <div className="stripe">
              <div className="card-element">
                <CheckoutForm />
              </div>
            </div>
            <div className="buttons">
              <button onClick={this.monthly}>
                Monthly Subscriptions - $4.99
              </button>
              <button onClick={this.yearly}>
                Yearly Subscriptions - $55.99
              </button>
              <button onClick={this.unsubscribe}>Unsubscribe</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(Billing);
