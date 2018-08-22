import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import axios from "axios";

class SummaryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: "",
      success: false
    };
  }

  componentWillMount() {
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    }

    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.summaryIndex !== false
    )
      this.setState({
        skill: this.props.context.userInfo.summary[
          this.props.location.state.summaryIndex
        ]
      });
  }

  handleTextInput = e => {
    this.setState({ [e.target.title]: e.target.value });
  };

  handleSubmit = e => {
    this.setState({ errors: [] });
    const errors = [];
    const { summary } = this.state;
    //TODO: render any conditions before axios call
    axios
      .post("localhost:3000", this.state)
      .then(response => {
        this.setState({
          summary: ""
        });
      })
      .catch(err => {
        if (summary === "") {
          errors.push("Summary is required.");
        }
      });
  };

  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/summary", title: "Summary" },
            { link: "/summary/create", title: "Create" }
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
export default SummaryCreate;
