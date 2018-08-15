import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar"
import axios from "axios"
import Navbar from "./subComponents/navbar";
// import { Consumer } from '../../context';

class Education extends Component {
  state = {
    school: '',
    degree: '',
    location: '',
    errors: {},
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const newSchool = Object.assign({}, this.state);

    // * Error Checking
    if (this.state.school === '') {
      this.setState({ errors: { school: 'School is required' } });
      return;
    }
    if (this.state.location === '') {
      this.setState({ errors: { location: 'Location is required' } });
      return;
    }
    if (this.state.degree === '') {
      this.setState({ errors: { degree: 'Degree is required' } });
      return;
    }

    // * Clear State
    this.setState({ school: '', location: '', degree: '', errors: {} });

    this.props.history.push('/');
  };


  render() {
    const { school, location, degree, errors } = this.state;

    return (
      <div>
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/education", title: "Education" }]} />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Education History</h1>
            {value => {
              const { dispatch } = value;
              <div className="card mb-3">
                <div className="card-header">Add Education</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <input
                      label="School"
                      name="school"
                      placeholder="School Name"
                      value={school}
                      onChange={this.onInputChange}
                      error={errors.school}
                    />
                    <input
                      label="Location"
                      name="location"
                      placeholder="Location"
                      value={location}
                      onChange={this.onInputChange}
                      error={errors.location}
                    />
                    <input
                      label="Degree"
                      name="Degree"
                      placeholder="Degree Number"
                      value={degree}
                      onChange={this.onInputChange}
                      error={errors.degree}
                    />
                    <input
                      type="submit"
                      value="Add School"
                      className="btn btn-light btn-block"
                    />
                  </form>
                </div>
              </div>
            }}
          </div>
        </div>
      </div>
    );
  }
}

export default Education;
