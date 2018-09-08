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
  state = {
    complete: this.props.context.userInfo.membership,
    gone: false,
    loading: false,
    sub_err: false,
    unsub_err: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  componentWillUnmount() {
    this.props.context.actions.expandResumeIDs(
      this.props.context.userInfo.currentResume
    )
  }

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
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="title-div" style={{ paddingLeft: "0.5rem" }}>
              <h4>BILLING</h4>
            </div>

            <p
              style={{
                fontSize: "0.7rem",
                paddingLeft: ".6rem",
                borderTop: "1px solid black",
                width: "100%"
              }}
            >
              Become a Member:
            </p>

            <div>
              {this.state.loading ? <Loading /> : null}
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

            <div className="stripe">
              <div className="stripe-form">
                {this.state.complete ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h1 style={{ textAlign: "center", marginTop: "6%" }}>
                      Thank You For Becoming A Member!
                    </h1>
                  </div>
                ) : (
                  <div className="stripe-pay">
                    <div className="card-element">
                      <CheckoutForm />
                    </div>
                    <div className="btn-group">
                      <button className="bill-btn" onClick={this.monthly}>
                        Monthly Subscriptions - $0.99
                      </button>
                      <button className="bill-btn" onClick={this.yearly}>
                        Yearly Subscriptions - $9.99
                      </button>
                    </div>
                  </div>
                )}
                {this.state.gone ? (
                  <p style={{ textAlign: "center" }}>
                    Thank you for your business. We hope to work with you again
                    soon!
                  </p>
                ) : (
                  <button
                    style={{ marginLeft: "0%", marginTop: "4%" }}
                    className="bill-btn"
                    onClick={this.unsubscribe}
                  >
                    Unsubscribe
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default injectStripe(Billing);
