import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class PDF extends Component {
  printDocument = () => {
    let input = document.getElementsByClassName("template1");
    html2canvas(input[0])
      .then(canvas => {
        const imgData = canvas.toDataURL("image/png");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.printDocument}>Print</button>
      </div>
    );
  }
}

export default PDF;
