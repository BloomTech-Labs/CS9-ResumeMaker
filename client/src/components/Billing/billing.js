import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import axios from "axios";
import CheckoutForm from "./checkoutForm";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Loading from "./Loading";
import "./billing.css";
const urls = require("../../config/config.json");

class Billing extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
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
    this.setState({
      loading: true,
      complete: false,
      gone: false,
      sub_err: false,
      unsub_err: false
    });
    this.tokenCreator()
      .then(token => {
        axios
          .post(`${urls[urls.basePath]}/pay/monthly`, token)
          .then(res => {
            this.setState({
              complete: true,
              loading: false,
              gone: false,
              sub_err: false,
              unsub_err: false
            });
          })
          .catch(err => {
            this.setState({
              gone: false,
              complete: false,
              loading: false,
              sub_err: true,
              unsub_err: false
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  yearly = () => {
    this.setState({
      loading: true,
      complete: false,
      gone: false,
      sub_err: false,
      unsub_err: false
    });
    this.tokenCreator()
      .then(token => {
        axios
          .post(`${urls[urls.basePath]}/pay/yearly`, token)
          .then(res => {
            this.setState({
              complete: true,
              loading: false,
              sub_err: false,
              gone: false
            });
          })
          .catch(err => {
            this.setState({
              gone: false,
              complete: false,
              loading: false,
              sub_err: true,
              unsub_err: false
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  unsubscribe = () => {
    this.setState({
      loading: true,
      complete: false,
      gone: false,
      sub_err: false,
      unsub_err: false
    });
    axios
      .post(`${urls[urls.basePath]}/pay/unsubscribe`, {
        email: this.props.context.userInfo.email
      })
      .then(res => {
        this.setState({
          gone: true,
          complete: false,
          loading: false,
          sub_err: false,
          unsub_err: false
        });
      })
      .catch(err => {
        this.setState({
          gone: false,
          complete: false,
          loading: false,
          sub_err: false,
          unsub_err: true
        });
      });
  };

  render() {
    return (
      <div>
        <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="billing-main">
          <div className="title-div billing col">
            <h4 className="billing-title">BILLING</h4>
            </div>
            
            <p style={{paddingTop: "2rem"}}>Become a Member:</p>
            <div className="stripe">
              <div className="card-element" >
                <CheckoutForm />
              </div>
            </div>
            <div className="buttons" style={{fontSize: ".8rem", height: "1.9rem"}}>
              <button className="bill-btn" onClick={this.monthly} style={{margin: ".2rem"}}>
                Monthly Subscriptions - $0.99
              </button>
              <button className="bill-btn" onClick={this.yearly}  style={{margin: ".2rem"}}>
                Yearly Subscriptions - $9.99
              </button><br/>
              <button onClick={this.unsubscribe} style={{margin: ".2rem"}}>Unsubscribe</button>
            </div>
            <div style={{ marginTop: "10px", paddingTop: "1rem"}}>
              {this.state.loading ? <Loading /> : null}
              {this.state.complete ? <p>Thank you for subscribing!</p> : null}
              {this.state.gone ? (
                <p>
                  Thank you for your business. We hope to work with you again
                  soon!
                </p>
              ) : null}
              {this.state.sub_err ? (
                <p>
                  You are unable to complete subscribe if you are already a
                  member or your payment is invalid!
                </p>
              ) : null}
              {this.state.unsub_err ? (
                <p>You do not have an active subscription!</p>
              ) : null}
            </div>
          </div>
        </div>
        </div>
    );
  }
}

export default injectStripe(Billing);
