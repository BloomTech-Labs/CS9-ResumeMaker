import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

class PDF extends Component {
  pdfDocument = () => {
    let input = document.getElementsByClassName("template1");
    html2canvas(input[0])
      .then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 20, 10, 165, 280);
        pdf.save("download.pdf");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.pdfDocument} style={{fontSize:".7rem"}}>Export PDF</button>
      </div>
    );
  }
}

export default PDF;
