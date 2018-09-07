import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
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
         <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
       
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="link-hide">
              <h4>
                PERSONAL SUMMARY{" "}</h4>
                <Link
                  to={{
                    pathname: "/summary/create", // component being Linked to
                    state: { index: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >
                  <i className="fa fa-pencil fa-lg"/>
                </Link>
            </div>
            <p style={{ fontSize: "0.7rem", paddingLeft: ".6rem"}}>
              Please click the pencil to create one or more Personal Summaries
              about yourself. 
              They should be aimed at the position you are seeking
              and contain something about the past, present, and future.{" "}
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
