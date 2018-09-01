import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import axios from "axios";
import CheckoutForm from "./checkoutForm";

import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import Loading from "./Loading"
import "./billing.css";
const urls = require("../../config/config.json")

class Billing extends Component {
  state = {
    complete: false,
    gone: false,
    loading: false,
    sub_err: false,
    unsub_err: false
  };

  tokenCreator = async () => {
    let { token } = await this.props.stripe.createToken({
      email: this.props.context.userInfo.email
    });
    return token;
  };

  monthly = () => {
    this.setState({ loading: true, complete: false, gone: false, sub_err: false, unsub_err: false })
    this.tokenCreator()
      .then(token => {
        axios
          .post(`${urls[urls.basePath]}/pay/monthly`, token)
          .then(res => {
            this.setState({ complete: true, loading: false, gone: false, sub_err: false, unsub_err: false });
          })
          .catch(err => {
            this.setState({ gone: false, complete: false, loading: false, sub_err: true, unsub_err: false })
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  yearly = () => {
    this.setState({ loading: true, complete: false, gone: false, sub_err: false, unsub_err: false })
    this.tokenCreator()
      .then(token => {
        axios
          .post(`${urls[urls.basePath]}/pay/yearly`, token)
          .then(res => {
            this.setState({ complete: true, loading: false, sub_err: false, gone: false });
          })
          .catch(err => {
            this.setState({ gone: false, complete: false, loading: false, sub_err: true, unsub_err: false })
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  unsubscribe = () => {
    this.setState({ loading: true, complete: false, gone : false, sub_err: false, unsub_err: false })
    axios
      .post(`${urls[urls.basePath]}/pay/unsubscribe`, {
        email: this.props.context.userInfo.email
      })
      .then(res => {
        this.setState({ gone: true, complete: false, loading: false, sub_err: false, unsub_err: false });
      })
      .catch(err => {
        this.setState({ gone: false, complete: false, loading: false, sub_err: false, unsub_err: true });
      });
  };

  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
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
            <div style = {{ marginTop: '10px' }}>
            { this.state.loading ? <Loading /> : null }
            { this.state.complete ? <h3>Thank you for subscribing!</h3> : null }
            { this.state.gone ? <h3>Thank you for your business. We hope to work with you again soon!</h3> : null }
            { this.state.sub_err ? <h3>You are unable to complete subscribe if you are already a member or your payment is invalid!</h3> : null }
            { this.state.unsub_err ? <h3>You do not have an active subscription!</h3> : null }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(Billing);
