import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Prompt } from "react-router";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import axios from "axios";

const urls = require("../config.json");

class SummaryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      _id: "",
      success: false
    };
  }

  componentDidMount() {
    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.summaryIndex !== false
    ) {
      console.log(
        this.props.context.userInfo.summary[
          this.props.location.state.summaryIndex
        ]._id
      );
      this.setState({
        content: this.props.context.userInfo.summary[
          this.props.location.state.summaryIndex
        ].content,
        _id: this.props.context.userInfo.summary[
          this.props.location.state.summaryIndex
        ]._id
      });
    }
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.summaryIndex === false && !deleteFlag) {
      this.props.context.actions.addElement("summary", {
        // When creating, do NOT put in an _id, let mongo autocreate one
        content: this.state.content
      });
    } // if creating
    else if (!deleteFlag) {
      this.props.context.actions.setElement(
        this.props.location.state.summaryIndex,
        "summary",
        {
          content: this.state.content,
          _id: this.state._id
        }
      );
    } // if editing
    else {
      this.props.context.actions.removeElement(
        this.props.location.state.summaryIndex,
        "summary"
      );
    }

    const tempObj = {
      "sections.summary": this.props.context.userInfo.summary
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
        console.log(response);
        this.setState({ success: true });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    return [
      // <Prompt
      //   key="block-nav"
      //   when={
      //     this.props.context.userInfo.summary[
      //       this.props.location.state.summaryIndex
      //     ] !== this.state.summary
      //   }
      //   message="You have unsaved changes, are you sure you want to leave?"
      // />,
      <div>
        {this.state.success ? <Redirect to="/summary" /> : null}
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/summary", title: "Summary" },
            { link: "/summary/create", title: "Create" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Personal Summary</h1>
            <div className="form-group">
              <form>
                <label form="formGroupExampleInput2">
                  “Make the most of yourself....for that is all there is of
                  you.” ― Ralph Waldo Emerson
                </label>
                <textarea
                  rows={10}
                  value={this.state.content}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="content"
                  placeholder="Input your summary"
                />
              </form>
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
              {this.props.location.state.summaryIndex !== false ? (
                <button onClick={e => this.handleSubmit(e, true)}>
                  Delete
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ];
  }
}

export default SummaryCreate;
