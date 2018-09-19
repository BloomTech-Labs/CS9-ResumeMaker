import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";

class Resumes extends Component {
  findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  };

  componentWillMount() {
    let index = this.findWithAttr(
      this.props.context.userInfo.resumes,
      "_id",
      this.props.context.userInfo.currentresume
    );
    if (index === -1) index = 0;
    this.setState({ index: index });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="entire-page">
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className="templates section-title">
              <div className="link-hide" style={{float: "left", padding: "0"}}>
                <h4>TEMPLATES</h4>
              </div>
              <div style={{width: "100%"}}>
                <p
                  style={{
                    display: "inline-block",
                    fontSize: "0.7rem",
                    paddingLeft: "0.6rem",
                    borderTop: "1px solid black",
                    width: "100%",
                    textAlign: "left"
                  }}
                >
                  Select a Template to render your Resume: 
                </p>
              </div>
            </div>
            <div className="containers-div">
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/templates/traditional", // component being Linked to
                    state: { index: this.state.index } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    className="template-img"
                    src={require("../Templates/tempTemplate1.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5 className="link">TRADITIONAL</h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/templates/modern", // component being Linked to
                    state: { index: this.state.index } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    className="template-img"
                    src={require("../Templates/tempTemplate2.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5 className="link">MODERN</h5>
                </Link>
              </div>
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/templates/elegant", // component being Linked to
                    state: { index: this.state.index } // Setting Index passed to template- false means new
                  }}
                >
                  <img
                    className="template-img"
                    src={require("../Templates/tempTemplate3.png")} //import pics
                    alt=""
                    height="100rem"
                  />
                  <h5 className="link">ELEGANT</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }}

export default Resumes;
