import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.context.userInfo.summary,
      errors: {}
    };
  }

  render() {
    return (
      <div>
        {console.log("this.props.context: ", this.props.context)}
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/summary", title: "Summary" }]} />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Personal Summary</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">“Make the most of yourself....for that is all there is of you.”
― Ralph Waldo Emerson
                </label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Tell us about yourself" />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Summary;
