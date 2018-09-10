import React, { Component } from "react";
import axios from "axios";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";

const urls = require("../../config/config.json");

class Resumes extends Component {
  findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i++) {
      console.log("arrayI", array[i][attr], "value compared to", value)
      if (array[i][attr] === value) {
        return i;
      }
    }
  return -1;
  }

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
      <div>
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="title-div">
              <h4 style={{ paddingLeft: ".6rem" }}>TEMPLATES</h4>{" "}
              <p
                style={{
                  fontSize: "0.7rem",
                  paddingLeft: ".6rem",
                  borderTop: "1px solid black",
                  width: "100%"
                }}
              >
                This is your resume page
              </p>
            </div>

            <div className="d-inline-flex containers-div">
              <div className="d-inline-flex container-div">
                <Link
                  style={{
                    color: "black"
                  }}
                  to={{
                    pathname: "/resume1", // component being Linked to
                    state: { index: this.state.index } // Setting Index passed to template- false means new
                  }}
                >
                  <img
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
                    pathname: "/resume2", // component being Linked to
                    state: { index:  this.state.index } // Setting Index passed to template- false means new
                  }}
                >
                  <img
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
                    pathname: "/resume3", // component being Linked to
                    state: { index:  this.state.index } // Setting Index passed to template- false means new
                  }}
                >
                  <img
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
  }
}

export default Resumes;
