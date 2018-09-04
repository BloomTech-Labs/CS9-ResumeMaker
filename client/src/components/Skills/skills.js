import React, { Component } from "react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";
import "../CSS/component-general.css";

class Skills extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <h1>Skills</h1>
            <p>
              Please click the pencil to enter each of your work related skills.
            </p>
            <div className="link-hide">
              <Link
                to={{
                  pathname: "/skills/create", // component being Linked to
                  state: { index: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <i className="fa fa-pencil fa-2x" aria-hidden="true" />
              </Link>
            </div>
            <div className="skills-containment-div">
              {this.props.context.userInfo.skills.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/skills"
                    elementName="skills"
                    putPath="sections.skills"
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

export default Skills;
