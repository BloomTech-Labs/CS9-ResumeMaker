import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar"
import Navbar from "./subComponents/navbar";

class Position extends Component {
  render() {
    return (
      <div>
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/templates", title: "Templates" }]} />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Employment History</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">“Far and away the best prize that life offers is the chance to work hard at work worth doing.” –Theodore Roosevelt.</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Name of Previous Employer" />
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Location" />
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Position Title" />
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Responsibilities" />
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Dates of Employment" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Position;
