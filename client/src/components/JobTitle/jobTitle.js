import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";

class JobTitle extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="section title-div col">
          <div className="section-title">
            <div className="link-hide" style={{float: "left", padding: "0"}} >
              <h4>JOB TITLE{" "}</h4>
                <Link
                  to={{
                    pathname: "/jobtitle/create", // component being Linked to
                    state: { index: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >{" "}
                  <i className="fa fa-pencil fa-lg"/>
                </Link>
            </div>
            <div style={{width: "100%"}}>
            <p style={{display: "inline-block", fontSize: "0.7rem", paddingLeft: ".6rem", borderTop: "1px solid black", width: "100%"}}>
              Click the pencil to enter a Title for the Job Position you are seeking. 
            </p>
</div>
</div>
            <div className="titles-containment-div" style={{padding: "1rem"}} >
              {this.props.context.userInfo.title.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/jobtitle"
                    elementName="title"
                    putPath="title"
                    index={index}
                    key={element._id ? element._id : index}
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
