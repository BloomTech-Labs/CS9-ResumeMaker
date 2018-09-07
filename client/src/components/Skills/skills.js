import React, { Component } from "react";

import Navbar from "../SubComponents/Navbar/navbar";import Sidebar from "../SubComponents/Sidebar/sidebar";
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
        <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="link-hide">
              <h4>
                SKILLS{" "}</h4>
                <Link
                  to={{
                    pathname: "/skills/create", // component being Linked to
                    state: { index: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >{" "}
                  <i className="fa fa-pencil fa-lg" />
                </Link>
            </div>
            <p style={{fontSize: "0.7rem", paddingLeft: ".6rem"}}>
              Please click the pencil to enter each of your work related skills.
            </p>

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
