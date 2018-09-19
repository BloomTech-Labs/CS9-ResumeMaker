import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import Navbar from "../SubComponents/Navbar/navbar";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../SubComponents/Sidebar/sidebar";

const urls = require("../../config/config.json");

class ExperienceCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      company: "",
      location: "",
      description: "",
      from: moment(),
      to: moment(),
      _id: "",
      success: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    }

    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.index !== false
    )
      this.setState({
        title: this.props.context.userInfo.experience[
          this.props.location.state.index
        ].title,
        company: this.props.context.userInfo.experience[
          this.props.location.state.index
        ].company,
        location: this.props.context.userInfo.experience[
          this.props.location.state.index
        ].location,
        from: moment(
          this.props.context.userInfo.experience[
            this.props.location.state.index
          ].from
        ),
        to: moment(
          this.props.context.userInfo.experience[
            this.props.location.state.index
          ].to
        ),
        description: this.props.context.userInfo.experience[
          this.props.location.state.index
        ].description,
        _id: this.props.context.userInfo.experience[
          this.props.location.state.index
        ]._id
      });
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fromChange = date => {
    this.setState({ from: date });
  };

  toChange = date => {
    this.setState({ to: date });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.index === false && !deleteFlag) {
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
        this.props.location.state.index,
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
        this.props.location.state.index,
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
        this.props.context.actions.setLogin(response.data, true);
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
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="section title-div col">
            <div className="section-title">
            <h4>EXPERIENCE</h4>
            <p
              style={{
                fontSize: "0.7rem",
                fontStyle: "Italic",
                borderTop: "1px solid black",
                width: "100%"
              }}
            >
              “By far and away the best prize that life offers is the chance to
              work hard at work worth doing.” –Theodore Roosevelt.
            </p>
      
            <form
              style={{ fontSize: ".7rem", width: "90%", paddingRight: "1rem", paddingLeft: "1rem", paddingTop: "2rem" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        style={{ fontSize: ".7rem", height: "1.7rem" }}
                        id="title"
                        value={this.state.title}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="title"
                        placeholder="Position Title"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="company">Company</label>
                      <input
                        style={{ fontSize: ".7rem", height: "1.7rem" }}
                        id="company"
                        value={this.state.company}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="company"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        style={{ fontSize: ".7rem", height: "1.7rem" }}
                        id="location"
                        value={this.state.location}
                        onChange={this.onInputChange}
                        className="form-control"
                        name="location"
                        placeholder="Company Location"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="from">Start date</label>
                      <DatePicker
                        selected={this.state.from}
                        onChange={this.fromChange}
                        placeholderText="Start Date"
                        dateFormat="LL"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="to">End date</label>
                      <DatePicker
                        selected={this.state.to}
                        onChange={this.toChange}
                        placeholderText="End Date"
                        dateFormat="LL"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        style={{ fontSize: ".7rem" }}
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

                <button onClick={e => this.handleSubmit(e)}>Submit</button>
                {this.props.location.state.index !== false ? (
                  <button onClick={e => this.handleSubmit(e, true)}>
                    Delete
                  </button>
                ) : null}
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExperienceCreate;
