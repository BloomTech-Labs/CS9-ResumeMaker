import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "./subComponents/sidebar";
import axios from "axios";
import Navbar from "./subComponents/navbar";

const urls = require("../config.json");

class JobTitleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: [],
      success: false
    };
  }

  componentDidMount() {
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    }

    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.titleIndex !== false
    )
      this.setState({
        title: this.props.context.userInfo.title[
          this.props.location.state.titleIndex
        ]
      });
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.props.location.state.titleIndex === false) {
      this.props.context.actions.addElement("title", this.state.title);
    } // if creating
    else {
      this.props.context.actions.setElement(
        this.props.location.state.titleIndex,
        "title",
        this.state.title
      );
    } // if editing

    const tempObj = {
      "sections.title": this.props.context.userInfo.title
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
    return (
      <div>
        {this.state.success ? <Redirect to="/jobtitle" /> : null}
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/jobtitle", title: "Job Title" },
            { link: "/jobtitle/create", title: "Create" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Job Title</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">
                  “It is not titles that honour men, but men that honour
                  titles.” ― Niccolò Machiavelli
                </label>
                <input
                  value={this.state.title}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="title"
                  placeholder="Enter Your Job Title"
                />
              </div>
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default JobTitleCreate;
