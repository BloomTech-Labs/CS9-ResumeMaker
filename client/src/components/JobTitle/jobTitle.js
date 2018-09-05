import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";
import "../CSS/component-general.css";

class JobTitle extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Navbar/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="link-hide">
              <h1 style={{fontWeight: "600"}}>JOB TITLE{" "}
                <Link
                  to={{
                    pathname: "/jobtitle/create", // component being Linked to
                    state: { index: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >
                  <i className="fa fa-pencil fa-sm" />
                </Link>
              </h1>
            </div>
            <p>
              Please click the pencil to enter one or more Titles for the Job
              Positon you are seeking.
            </p>

            <div className="titles-containment-div">
              {this.props.context.userInfo.title.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/jobtitle"
                    elementName="title"
                    putPath="title"
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

export default JobTitle;
