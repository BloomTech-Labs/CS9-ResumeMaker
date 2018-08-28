import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";

import "./CSS/itemcard.css";

// class ItemCard extends Component {
//   render() {
//     return (
//       <Link
//         className="summary-card-link"
//         to={{
//           pathname: "/summary/create", // component being Linked to
//           state: { summaryIndex: this.props.index } // Setting Index passed into summaryCreate component
//         }}
//       >
//         <span className="summary-card-span">{this.props.content}</span>
//       </Link>
//     );
//   }
// }

class ItemCard extends Component {
  render() {
    return (
      <Card className="item-card">
        <CardHeader>
          <Link
            className="item-card-link"
            to={{
              pathname: `${this.props.linkTo}/create`, // component being Linked to
              state: { summaryIndex: this.props.index } // Setting Index passed into summaryCreate component
            }}
          >
            HEADER
            {/* <Link to={`note/${props.note._id}`}>{props.note.title}</Link> */}
          </Link>
        </CardHeader>
        <CardBody>
          <CardText>{this.props.content}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default ItemCard;
