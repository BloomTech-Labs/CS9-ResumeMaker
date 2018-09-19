import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import DatePicker from "react-datepicker";
import moment from "moment";
import Navbar from "../SubComponents/Navbar/navbar";
import "react-datepicker/dist/react-datepicker.css";
import Sidebar from "../SubComponents/Sidebar/sidebar";

const urls = require("../../config/config.json");

class EducationCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: moment(),
      to: moment(),
      _id: "",
      success: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.index !== false
    )
      this.setState({
        school: this.props.context.userInfo.education[
          this.props.location.state.index
        ].school,
        degree: this.props.context.userInfo.education[
          this.props.location.state.index
        ].degree,
        fieldofstudy: this.props.context.userInfo.education[
          this.props.location.state.index
        ].fieldofstudy,
        from: moment(
          this.props.context.userInfo.education[this.props.location.state.index]
            .from
        ),
        to: moment(
          this.props.context.userInfo.education[this.props.location.state.index]
            .to
        ),
        _id: this.props.context.userInfo.education[
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
      this.props.context.actions.addElement("education", {
        school: this.state.school,
        degree: this.state.degree,
        fieldofstudy: this.state.fieldofstudy,
        from: this.state.from,
        to: this.state.to
      });
    } // if creating
    else if (!deleteFlag) {
      this.props.context.actions.setElement(
        this.props.location.state.index,
        "education",
        {
          school: this.state.school,
          degree: this.state.degree,
          fieldofstudy: this.state.fieldofstudy,
          from: this.state.from,
          to: this.state.to,
          _id: this.state._id
        }
      );
    } // if editing
    else {
      this.props.context.actions.removeElement(
        this.props.location.state.index,
        "education"
      );
    }

    const tempObj = {
      "sections.education": this.props.context.userInfo.education
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
        {this.state.success ? <Redirect to="/education" /> : null}
        <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="section title-div col">
          <div className="section-title">
            <h4>EDUCATION HISTORY</h4>
            <p style={{fontSize: "0.7rem", fontStyle: "Italic", borderTop: "1px solid black", width: "100%"}}>
              “Intelligence plus character-that is the goal of true education.”
              ― Martin Luther King Jr.
            </p>
            <form  style={{ width: "60%", alignItems: "left", paddingLeft: "1rem", paddingTop: "2rem" }}>
              <div className="form-group">
                <label htmlFor="school">School</label>
                <input
                 style={{fontSize: ".7rem", height: "1.7rem"}}
                  id="school"
                  value={this.state.school}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="school"
                  placeholder="Name of Institution"
                />
              </div>
              <div className="form-group">
                <label htmlFor="degree">Degree</label>
                <input
                style={{fontSize: ".7rem", height: "1.7rem"}}
                  id="degree"
                  value={this.state.degree}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="degree"
                  placeholder="Degree or Certificate"
                />
              </div>
              <div className="form-group">
                <label htmlFor="fieldofstudy">Field of Study</label>
                <input
                style={{fontSize: ".7rem", height: "1.7rem"}}
                  id="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="fieldofstudy"
                  placeholder="Field of Study"
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
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
              {this.props.location.state.index !== false ? (
                <button onClick={e => this.handleSubmit(e, true)}>
                  Delete
                </button>
              ) : null}
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EducationCreate;
