import React, { Component } from "react";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import ItemCard from "../SubComponents/ItemCard/itemCard";
import { Link } from "react-router-dom";


class Summary extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  
  render() {
    return (
      <div className="entire-page">
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="section title-div col">
          <div className="section-title">
            <div className="link-hide" style={{float: "left", padding: "0"}} >
              <h4>PERSONAL SUMMARY </h4>
              <Link
                to={{
                  pathname: "/summary/create", // component being Linked to
                  state: { index: false } // Setting Index passed into educationCreate component - false means new
                }}
              >
                <i className="fa fa-pencil fa-lg" />
              </Link>
            </div>
            <div style={{width: "100%"}}>
            <p style={{display: "inline-block",
                fontSize: "0.7rem",
                paddingLeft: ".6rem",
                borderTop: "1px solid black",
                width: "100%"
              }}
            >
              Click the pencil to add a Personal Summary.{" "}
            </p>
</div>
</div>
            <div className="summary-containment-div" style={{padding: "1rem"}} >
              {this.props.context.userInfo.summary.map((element, index) => {
                return (
                  <ItemCard
                    linkTo="/summary"
                    elementName="summary"
                    putPath="sections.summary"
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

export default Summary;
