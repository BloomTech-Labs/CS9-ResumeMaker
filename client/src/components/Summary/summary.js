import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import ItemCard from "../SubComponents/ItemCard/itemCard";
import { Link } from "react-router-dom";
import "../CSS/component-general.css";

class Summary extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="link-hide">
              <h1 style={{ fontWeight: "570" }}>
                PERSONAL SUMMARY{" "}
                <Link
                  to={{
                    pathname: "/summary/create", // component being Linked to
                    state: { index: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >
                  <i className="fa fa-pencil fa-sm" />
                </Link>
              </h1>
            </div>
            <p style={{ fontSize: "0.8rem" }}>
              Please click the pencil to create one or more Personal Summaries
              about yourself. <br />
              They should be aimed at toward the position you are seeking for
              and contain something about the past present and future.{" "}
            </p>

            <div className="summary-containment-div">
              {this.props.context.userInfo.summary.map((element, index) => {
                return (
                    <ItemCard
                      linkTo="/summary"
                      elementName="summary"
                      putPath="sections.summary"
                      index={index}
                      key={index}
                      content={element.content}
                      context={this.props.context}
                    />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
