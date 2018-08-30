import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./CSS/summaryCard.css";

function ellipsify(str) {
  if (str.length > 150) {
    return str.substring(0, 150) + "...";
  } else {
    return str;
  }
}

class SummaryCard extends Component {
  render() {
    return (
      <Link
        className="summary-card-link"
        to={{
          pathname: "/summary/create", // component being Linked to
          state: { summaryIndex: this.props.index } // Setting Index passed into summaryCreate component
        }}
      >
        <span className="summary-card-span">
          {ellipsify(this.props.content)}
        </span>
      </Link>
    );
  }
}

export default SummaryCard;
