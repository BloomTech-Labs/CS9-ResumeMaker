import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import axios from "axios";
import CheckoutForm from "./checkoutForm";

import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import "./CSS/billing.css";
const urls = require("../config.json");

class Billing extends Component {
  state = {
    complete: false,
    gone: false
  };

  tokenCreator = async () => {
    let { token } = await this.props.stripe.createToken({
      email: this.props.context.userInfo.email
    });
    return token;
  };

  monthly = () => {
    this.tokenCreator()
      .then(token => {
        axios
          .post(`${urls[urls.basePath]}/pay/monthly`, token)
          .then(res => {
            this.setState({ complete: true });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  yearly = () => {
    this.tokenCreator()
      .then(token => {
        axios
          .post(`${urls[urls.basePath]}/pay/yearly`, token)
          .then(res => {
            this.setState({ complete: true });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  unsubscribe = e => {
    e.preventDefault();
    axios
      .post(`${urls[urls.basePath]}/pay/unsubscribe`, {
        email: this.props.context.userInfo.email
      })
      .then(res => {
        this.setState({ gone: true });
        console.log("Successfully Unsubscribed");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    if (this.state.complete) return <h1>Thank You For Subscribing</h1>;
    if (this.state.gone)
      return (
        <h1>
          Thank You For Your Business. We Hope to Work With You Again Soon.
        </h1>
      );
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/billing", title: "Billing" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
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
                Monthly Subscriptions - $0.99
              </button>
              <button onClick={this.yearly}>
                Yearly Subscriptions - $9.99
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
