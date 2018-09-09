import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";

class JobTitle extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // componentWillUnmount() {
  //   this.props.context.actions.expandResumeIDs(
  //     this.props.context.userInfo.currentResume
  //   )
  // }

  render() {
    return (
      <div>
        <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="link-hide">
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
            <p style={{fontSize: "0.7rem", paddingLeft: ".6rem", borderTop: "1px solid black", width: "100%"}}>
              Click the pencil to enter a Title for the Job Position you are seeking. 
            </p>

            <div className="titles-containment-div" >
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
