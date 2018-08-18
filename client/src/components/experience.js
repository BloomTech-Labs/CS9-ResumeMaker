import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";
import axios from "axios";

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values:
        props.context.userInfo.experience[this.props.experienceIndex] ===
        undefined
          ? [""]
          : props.context.userInfo.experience[this.props.experienceIndex],
      errors: []
    };
  }

  handleChange = e => {
    this.setState({ [e.target.title]: e.target.value });
  };

  handleSubmit = e => {
    this.setState({ errors: [] });
    const errors = [];
    const { experience } = this.state;
    //TODO: render any conditions before axios call
    axios
      .post("localhost:3000", this.state)
      .then(response => {
        this.setState({
          experience: ""
        });
      })
      .catch(err => {
        if (experience === "") {
          errors.push("A Experience Title is required.");
        }
      });
  };

  render() {
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/experience", title: "Experience" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Employment History</h1>
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">
                  “Far and away the best prize that life offers is the chance to
                  work hard at work worth doing.” –Theodore Roosevelt.
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Name of Previous Employer"
                />
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Location"
                />
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Experience Title"
                />
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Responsibilities"
                />
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Dates of Employment"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Experience;
