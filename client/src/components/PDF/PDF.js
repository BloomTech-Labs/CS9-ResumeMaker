import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class PDF extends Component {
  pdfDocument = () => {
    let input = document.getElementsByClassName(this.props.name);
    html2canvas(input[0])
      .then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 290);
        pdf.save("download.pdf");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.pdfDocument}>
          Export PDF
        </button>
      </div>
    );
  }
}

export default PDF;
