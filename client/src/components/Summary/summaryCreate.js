import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import axios from "axios";

const urls = require("../../config/config.json");

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
    window.scrollTo(0, 0);
    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.index !== false
    ) {
      this.setState({
        content: this.props.context.userInfo.summary[
          this.props.location.state.index
        ].content,
        _id: this.props.context.userInfo.summary[
          this.props.location.state.index
        ]._id
      });
    }
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.index === false && !deleteFlag) {
      this.props.context.actions.addElement("summary", {
        // When creating, do NOT put in an _id, let mongo autocreate one
        content: this.state.content
      });
    } // if creating
    else if (!deleteFlag) {
      this.props.context.actions.setElement(
        this.props.location.state.index,
        "summary",
        {
          content: this.state.content,
          _id: this.state._id
        }
      );
    } // if editing
    else {
      this.props.context.actions.removeElement(
        this.props.location.state.index,
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
      //       this.props.location.state.index
      //     ] !== this.state.summary
      //   }
      //   message="You have unsaved changes, are you sure you want to leave?"
      // />,
      <div>
        {this.state.success ? <Redirect to="/summary" /> : null}
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <h1>Personal Summary</h1>
            <div>
              “Make the most of yourself....for that is all there is of you.” ―
              Ralph Waldo Emerson
            </div>
            <form>
              <div className="form-group">
                <textarea
                  rows={10}
                  value={this.state.content}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="content"
                  placeholder="Input your summary"
                />
              </div>
            </form>
            <button onClick={e => this.handleSubmit(e)}>Submit</button>
            {this.props.location.state.index !== false ? (
              <button onClick={e => this.handleSubmit(e, true)}>Delete</button>
            ) : null}
          </div>
        </div>
      </div>
    ];
  }
}

export default SummaryCreate;
