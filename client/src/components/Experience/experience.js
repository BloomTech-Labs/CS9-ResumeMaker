import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";
import "../CSS/component-general.css";

class Experience extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <h1>Experience</h1>
            <p style={{ fontSize: "0.8rem" }}>
              Please click the pencil to enter the information for all of your
              previous work related experience.
            </p>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/experience/create", // component being Linked to
                  state: { index: false } // Setting Index passed into experienceCreate component - false means new
                }}
              >
                <i className="fa fa-pencil fa-2x" aria-hidden="true" />
              </Link>
            </div>
            <div className="experience-containment-div">
              {this.props.context.userInfo.experience.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/experience"
                    elementName="experience"
                    putPath="sections.experience"
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

export default Experience;
