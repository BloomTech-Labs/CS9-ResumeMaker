import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";
import "../CSS/component-general.css";

class Education extends Component {
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
                EDUCATION HISTORY{" "}</h4>
                <Link
                  to={{
                    pathname: "/education/create", // component being Linked to
                    state: { index: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >
                  <i className="fa fa-pencil fa-lg" />
                </Link>
            </div>
            <p style={{fontSize: "0.7rem", paddingLeft: ".6rem"}}>
              Click the pencil to enter previous schools attended and degrees or certificates obtained.
            </p>
            <div className="education-containment-div">
              {this.props.context.userInfo.education.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/education"
                    elementName="education"
                    putPath="sections.education"
                    index={index}
                    key={index}
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
