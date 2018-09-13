import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardText,
  Button
} from "reactstrap";
import axios from "axios";
import moment from "moment";

import urls from "../../../config/config.json";

function ellipsify(str, length) {
  if (str) {
    if (str.length > length) {
      return str.substring(0, length) + "...";
    } else {
      return str;
    }
  } else return "Placeholder";
}

class ItemCard extends Component {
  putPath = this.props.putPath;
  handleCopy = () => {
    if (this.props.elementName === "experience") {
      this.props.context.actions.addElement("experience", {
        title: this.props.element.title,
        company: this.props.element.company,
        location: this.props.element.location,
        description: this.props.element.description,
        from: this.props.element.from,
        to: this.props.element.to
      });
    } else if (this.props.elementName === "education") {
      this.props.context.actions.addElement("education", {
        school: this.props.element.school,
        degree: this.props.element.degree,
        fieldofstudy: this.props.element.fieldofstudy,
        from: this.props.element.from,
        to: this.props.element.to
      });
    } else {
      this.props.context.actions.addElement(this.props.elementName, {
        // When creating, do NOT put in an _id, let mongo autocreate one
        content: this.props.content
      });
    }
    const putPath = this.props.putPath;
    const tempObj = {
      [putPath]: this.props.context.userInfo[this.props.elementName]
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
        this.props.context.actions.setLogin(response.data, true);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleDelete = () => {
    this.props.context.actions.removeElement(
      this.props.index,
      this.props.elementName
    );
    const putPath = this.props.putPath;
    const tempObj = {
      [putPath]: this.props.context.userInfo[this.props.elementName]
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
        this.props.context.actions.setLogin(response.data, true);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    if (this.props.elementName === "experience") {
      return (
        <Card className="item-card">
          <button
            className="close"
            aria-label="Delete"
            onClick={() => this.handleDelete()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <Link
            className="item-card-link"
            to={{
              pathname: `${this.props.linkTo}/create`, // component being Linked to
              state: { index: this.props.index } // Setting Index passed into summaryCreate component
            }}
          >
            <CardBody>
              <CardTitle>{this.props.element.title}</CardTitle>
              <CardText>{this.props.element.company}</CardText>
              <CardText>
                {moment(this.props.element.from).format("MMM YYYY")} -{" "}
                {moment(this.props.element.to).format("MMM YYYY")}
              </CardText>
              <CardText>
                {ellipsify(this.props.element.description, 180)}
              </CardText>
            </CardBody>
          </Link>
          <Button onClick={() => this.handleCopy()}>Copy</Button>
        </Card>
      );
    } else if (this.props.elementName === "education") {
      return (
        <Card className="item-card">
          <button
            className="close"
            aria-label="Delete"
            onClick={() => this.handleDelete()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <Link
            className="item-card-link"
            to={{
              pathname: `${this.props.linkTo}/create`, // component being Linked to
              state: { index: this.props.index } // Setting Index passed into summaryCreate component
            }}
          >
            <CardBody>
              <CardTitle>{ellipsify(this.props.element.school, 50)}</CardTitle>
              <CardText>{ellipsify(this.props.element.degree, 150)}</CardText>
              <CardText>
                {ellipsify(this.props.element.fieldofstudy, 150)}
              </CardText>
              <CardText>
                {moment(this.props.element.from).format("MMM YYYY")} -{" "}
                {moment(this.props.element.to).format("MMM YYYY")}
              </CardText>
            </CardBody>
          </Link>
          <Button onClick={() => this.handleCopy()}>Copy</Button>
        </Card>
      );
    } else if (this.props.elementName === "summary") {
      return (
        <Card className="item-card">
          <button
            className="close"
            aria-label="Delete"
            onClick={() => this.handleDelete()}
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <Link
            className="item-card-link"
            to={{
              pathname: `${this.props.linkTo}/create`, // component being Linked to
              state: { index: this.props.index } // Setting Index passed into summaryCreate component
            }}
          >
            <CardBody>
              <CardText>{ellipsify(this.props.content, 280)}</CardText>
            </CardBody>
          </Link>
          <Button onClick={() => this.handleCopy()}>Copy</Button>
        </Card>
      );
    } else if (this.props.header) {
      return (
        <Card className="item-card">
          <CardHeader>{ellipsify(this.props.header, 50)}</CardHeader>
          <CardBody>
            <Link
              className="item-card-link"
              to={{
                pathname: `${this.props.linkTo}/create`, // component being Linked to
                state: { index: this.props.index } // Setting Index passed into summaryCreate component
              }}
            >
              <CardText>{ellipsify(this.props.content, 150)}</CardText>
            </Link>
          </CardBody>
          <button
            className="close"
            aria-label="Delete"
            onClick={() => this.handleDelete()}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <Button onClick={() => this.handleCopy()}>Copy</Button>
        </Card>
      );
    } else
      return (
        <Card className="item-card row-card">
          <button
            className="close"
            aria-label="Delete"
            onClick={() => this.handleDelete()}
          >
            <span aria-hidden="true">&times;</span>
          </button>

          <CardBody>
            <Link
              className="item-card-link"
              to={{
                pathname: `${this.props.linkTo}/create`, // component being Linked to
                state: { index: this.props.index } // index passed into the create component
              }}
            >
              <CardText>{ellipsify(this.props.content, 150)}</CardText>
            </Link>
          </CardBody>
        </Card>
      );
  }
}

export default ItemCard;
