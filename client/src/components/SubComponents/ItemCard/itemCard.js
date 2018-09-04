import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardText, Button } from "reactstrap";
import axios from "axios";

import urls from "../../../config/config.json";

import "./itemcard.css";

function ellipsify(str) {
  if (str.length > 150) {
    return str.substring(0, 150) + "...";
  } else {
    return str;
  }
}

class ItemCard extends Component {
  handleCopy = () => {
    this.props.context.actions.addElement("summary", {
      // When creating, do NOT put in an _id, let mongo autocreate one
      content: this.props.content
    });
    const tempObj = {
      "sections.summary": this.props.context.userInfo.summary
    };
    axios
      .put(
        `${urls[urls.basePath]}/users/info/` + this.props.context.userInfo.id,
        tempObj,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        const userData = response.data.user;
        this.props.context.actions.setLogin(userData);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

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
          <Button onClick={() => this.handleCopy()}>Copy</Button>
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
          <Button onClick={() => this.handleCopy()}>Copy</Button>
        </Card>
      );
  }
}

export default ItemCard;
