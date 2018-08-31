import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import axios from "axios";
import Navbar from "../SubComponents/Navbar/navbar";

const urls = require("../../config/config.json");

class ExperienceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      description: "",
      from: "",
      to: "",
      _id: "",
      success: false
    };
  }

  componentDidMount() {
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    }

    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.experienceIndex !== false
    )
      this.setState({
        title: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].title,
        company: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].company,
        location: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].location,
        from: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].from,
        to: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].to,
        description: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ].description,
        _id: this.props.context.userInfo.experience[
          this.props.location.state.experienceIndex
        ]._id
      });
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.experienceIndex === false && !deleteFlag) {
      this.props.context.actions.addElement("experience", {
        title: this.state.title,
        company: this.state.company,
        location: this.state.location,
        description: this.state.description,
        from: this.state.from,
        to: this.state.to
      });
    } // if creating
    else if (!deleteFlag) {
      this.props.context.actions.setElement(
        this.props.location.state.experienceIndex,
        "experience",
        {
          title: this.state.title,
          company: this.state.company,
          location: this.state.location,
          description: this.state.description,
          from: this.state.from,
          to: this.state.to,
          _id: this.state._id
        }
      );
    } // if editing
    else {
      this.props.context.actions.removeElement(
        this.props.location.state.experienceIndex,
        "experience"
      );
    }

    const tempObj = {
      "sections.experience": this.props.context.userInfo.experience
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
        {this.state.success ? <Redirect to="/experience" /> : null}
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
            { link: "/experience", title: "Experience" },
            { link: "/experience/create", title: "Create" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Experience</h1>
            <div>
              “Far and away the best prize that life offers is the chance to
              work hard at work worth doing.” –Theodore Roosevelt.
            </div>
            <form>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label for="title">Title</label>
                      <input
                        id="title"
                        value={this.state.title}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="title"
                        placeholder="Position Title"
                      />
                    </div>
                    <div className="form-group">
                      <label for="company">Company</label>
                      <input
                        id="company"
                        value={this.state.company}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="company"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="form-group">
                      <label for="location">Location</label>
                      <input
                        id="location"
                        value={this.state.location}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="location"
                        placeholder="Company Location"
                      />
                    </div>
                    <div className="form-group">
                      <label for="from">Start date</label>
                      <input
                        id="from"
                        value={this.state.from}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="from"
                        placeholder="Start Date"
                      />
                    </div>
                    <div className="form-group">
                      <label for="to">End date</label>
                      <input
                        id="to"
                        value={this.state.to}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="to"
                        placeholder="End Date"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label for="description">Description</label>
                      <textarea
                        rows={15}
                        id="description"
                        value={this.state.description}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="description"
                        placeholder="Position Description"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
              {this.props.location.state.experienceIndex !== false ? (
                <button onClick={e => this.handleSubmit(e, true)}>
                  Delete
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ExperienceCreate;
