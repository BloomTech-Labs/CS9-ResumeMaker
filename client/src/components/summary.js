import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import ItemCard from "./subComponents/itemCard";
import { Link } from "react-router-dom";
import "./CSS/component-general.css";

class Summary extends Component {
  render() {
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/summary", title: "Summary" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Personal Summary</h1>
            <div className="summary-containment-div">
              {this.props.context.userInfo.summary.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/summary"
                    index={index}
                    content={element}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/summary/create", // component being Linked to
                  state: { summaryIndex: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <i className="fas fa-plus plus-circle" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
