import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";

class Education extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="entire-page">
        <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="section title-div col">
            <div className="section-title">
              <div className="link-hide" style={{float: "left", padding: "0"}} >
                <h4>EDUCATION HISTORY</h4>
                <Link
                  to={{
                    pathname: "/education/create", // component being Linked to
                    state: { index: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >
                  <i className="fa fa-pencil fa-lg" />
                </Link>
              </div>
              <div style={{width: "100%"}}>
                <p style={{display: "inline-block", fontSize: "0.7rem", paddingLeft: "0.6rem", borderTop: "1px solid black", width: "100%"}}>
                  Click the pencil to enter previous schools attended and degrees or certificates obtained.
                </p>
              </div>
            </div>
            <div className="education-containment-div">
              {this.props.context.userInfo.education.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/education"
                    elementName="education"
                    putPath="sections.education"
                    index={index}
                    key={element._id ? element._id : index}
                    element={element}
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

export default Education;
