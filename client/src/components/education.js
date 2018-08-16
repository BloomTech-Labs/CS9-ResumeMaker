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
            <form>
              <div className="form-group">
                <label form="formGroupExampleInput2">“Intelligence plus character-that is the goal of true education.”
― Martin Luther King Jr.</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Degree or Certificate" />
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Name of Institution" />
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Date" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Education;
