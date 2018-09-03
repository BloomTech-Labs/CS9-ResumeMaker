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
            <h1>Personal Summary</h1>
            <p style={{ fontSize: "0.8rem" }}>
              Please click the pencil to create one or more Personal Summaries
              about yourself. <br />
              They should be aimed at toward the position you are seeking for
              and contain somthing about the past present and future.{" "}
            </p>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/summary/create", // component being Linked to
                  state: { summaryIndex: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <i class="fa fa-pencil fa-2x" aria-hidden="true" />
              </Link>
            </div>
            <div className="summary-containment-div">
              {this.props.context.userInfo.summary.map((element, index) => {
                return (
                  <ItemCard
                    className="card"
                    linkTo="/summary"
                    index={index}
                    content={element.content}
                    key={index}
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
