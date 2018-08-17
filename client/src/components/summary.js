import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values:
        props.context.userInfo.summary[0] === undefined
          ? [""]
          : props.context.userInfo.summary[0],
      errors: {}
    };
  }

  handleTextInput = e => {
    this.setState({ [e.target.title]: e.target.value });
  };

  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/summary", title: "Summary" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Personal Summary</h1>
            <div className="form-group">
              <form>
                <label form="formGroupExampleInput2">
                  “Make the most of yourself....for that is all there is of
                  you.” ― Ralph Waldo Emerson
                  <input
                    value={this.state.values}
                    title="values[0]"
                    onChange={this.handleTextInput}
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="Tell us about yourself"
                  />
                </label>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Summary;
