import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class PDF extends Component {
  printDocument = () => {
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
