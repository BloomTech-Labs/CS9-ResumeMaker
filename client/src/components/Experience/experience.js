import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";

class Experience extends Component {
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
                <h4>EXPERIENCE</h4>
                <Link
                  to={{
                    pathname: "/experience/create", // component being Linked to
                    state: { index: false } // Setting Index passed into experienceCreate component - false means new
                  }}
                >
                  <i className="fa fa-pencil fa-lg"/>
                </Link>
              </div>
              <div style={{width: "100%"}}>
                <p style={{display: "inline-block", fontSize: "0.7rem", paddingLeft: "0.6rem", borderTop: "1px solid black", width: "100%"}}>
                  Click the pencil to add previous employment information to your work history.
                </p>
              </div>
            </div>
            <div className="experience-containment-div">
              {this.props.context.userInfo.experience.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/experience"
                    elementName="experience"
                    putPath="sections.experience"
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

export default Experience;
