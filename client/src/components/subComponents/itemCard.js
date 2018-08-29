import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";

import "./CSS/itemcard.css";

function ellipsify(str) {
  if (str.length > 150) {
    return str.substring(0, 150) + "...";
  } else {
    return str;
  }
}

class ItemCard extends Component {
  render() {
    if (this.props.header) {
      return (
        <Card className="item-card">
          <Link
            className="item-card-link"
            to={{
              pathname: `${this.props.linkTo}/create`, // component being Linked to
              state: { summaryIndex: this.props.index } // Setting Index passed into summaryCreate component
            }}
          >
            <CardHeader>{ellipsify(this.props.header)}</CardHeader>
            <CardBody>
              <CardText>{ellipsify(this.props.content)}</CardText>
            </CardBody>
          </Link>
        </Card>
      );
    } else
      return (
        <Card className="item-card">
          <Link
            className="item-card-link"
            to={{
              pathname: `${this.props.linkTo}/create`, // component being Linked to
              state: { summaryIndex: this.props.index } // Setting Index passed into summaryCreate component
            }}
          >
            <CardBody>
              <CardText>{ellipsify(this.props.content)}</CardText>
            </CardBody>
          </Link>
        </Card>
      );
  }
}

export default ItemCard;
