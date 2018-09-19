import React, { Component } from "react";
import { injectStripe } from "react-stripe-elements";
import axios from "axios";
import CheckoutForm from "./checkoutForm";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Loading from "./Loading";
const urls = require("../../config/config.json");

class Billing extends Component {
  state = {
    complete: false,
    gone: false,
    loading: false,
    sub_err: false,
    unsub_err: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentDidUpdate = () => {
    if(this.props.context.userInfo.auth === true && this.props.context.userInfo.membership !== this.state.complete){
      this.setState({ complete: this.props.context.userInfo.membership });
    }
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
          .post(`${urls[urls.basePath]}/pay/monthly`, token,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }
          )
          .then(res => {
            this.setState({
              complete: true,
              loading: false,
              gone: false,
              sub_err: false,
              unsub_err: false
            });
            this.props.context.actions.setSingleElement("membership", true);
            if(res.data.resumes.length > 1){
              this.props.context.actions.setSingleElement("resumes", res.data.resumes);
              this.props.context.actions.expandResumeIDs();
            }
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
          .post(`${urls[urls.basePath]}/pay/yearly`, token,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            }
          )
          .then(res => {
            this.setState({
              complete: true,
              loading: false,
              sub_err: false,
              gone: false
            });
            this.props.context.actions.setSingleElement("membership", true);
            if(res.data.resumes.length > 1){
              this.props.context.actions.setSingleElement("resumes", res.data.resumes);
              this.props.context.actions.expandResumeIDs();
            }
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
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(res => {
        this.setState({
          gone: true,
          complete: false,
          loading: false,
          sub_err: false,
          unsub_err: false
        });
        this.props.context.actions.setSingleElement("membership", false);
        this.props.context.actions.setSingleElement("resumes", [this.props.context.userInfo.resumes[0]]);
        this.props.context.actions.setCurrentResume();
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
      <div className="entire-page">
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="billing title-div col">
            <div className="section-title">
            <div className="link-hide" style={{float: "left", padding: "0"}}>
              <h4>BILLING</h4>
            </div>
 
            <div style={{width: "100%"}}>
              <p
                style={{
                  display: "inline-block",
                  fontSize: "0.7rem",
                  paddingLeft: ".6rem",
                  borderTop: "1px solid black",
                  width: "100%"
                }}
              >
                Become a Member:
              </p>
            </div>
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
 

            <div className="stripe">
              <div className="stripe-form">
                {this.state.complete ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h2>
                      Thank You For Becoming A Member!
                    </h2>
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
                    className="bill-btn unsubscribe"
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
        </div>
      </div>
    );
  }
}

export default injectStripe(Billing);
