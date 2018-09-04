import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";

import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";

const urls = require("../../config/config.json");

class EducationCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      _id: "",
      success: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.educationIndex !== false
    )
      this.setState({
        school: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].school,
        degree: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].degree,
        fieldofstudy: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].fieldofstudy,
        from: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].from,
        to: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ].to,
        _id: this.props.context.userInfo.education[
          this.props.location.state.educationIndex
        ]._id
      });
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.educationIndex === false && !deleteFlag) {
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
        this.props.location.state.educationIndex,
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
        this.props.location.state.educationIndex,
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
        {this.state.success ? <Redirect to="/education" /> : null}
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
            { link: "/education", title: "Education" },
            { link: "/education/create", title: "Create" }
          ]}
        />
        <div className="overall-component-div">
          <Sidebar context={this.props.context} />
          <div className="title-div">
            <h1>Education History</h1>
            <div>
              “Intelligence plus character-that is the goal of true education.”
              ― Martin Luther King Jr.
            </div>
            <form>
              <div className="form-group">
                <label for="school">School</label>
                <input
                  id="school"
                  value={this.state.school}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="school"
                  placeholder="Name of Institution"
                />
              </div>
              <div className="form-group">
                <label for="degree">Degree</label>
                <input
                  id="degree"
                  value={this.state.degree}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="degree"
                  placeholder="Degree or Certificate"
                />
              </div>
              <div className="form-group">
                <label for="fieldofstudy">Field of Study</label>
                <input
                  id="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="fieldofstudy"
                  placeholder="Field of Study"
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
              <button onClick={e => this.handleSubmit(e)}>Submit</button>
              {this.props.location.state.educationIndex !== false ? (
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

export default EducationCreate;
