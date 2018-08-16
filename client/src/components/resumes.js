import React, { Component } from "react";
import { Route } from "react-router-dom";
import Sidebar from "./subComponents/sidebar"
import Navbar from "./subComponents/navbar";
import ResumeCard from "./subComponents/resumeCard"

export class PersonalInfo extends Component {
  constructor(){
    super()
   this.state = { 
    firstName: '',
    lastName: '',
    suffix: '',
    phone: '',
    email: '',
    location: '',
    title: '',
   };

   this.handleChange = this.handleChange.bind(this)
  }
   handleChange(e) {
    const target = e.target;
    let value = target.value;
    const name = target.type;
    this.setState({
      [name]: value,
    })
};

/*onSubmit = async (dispatch, e) => {
  e.preventDefault();
  const newInfo = Object.assign({}, this.state);
*/
/*if (this.state.firstName = ''){
  this.setState({ errors: { firstName: 'First name is required.'}});
  return;
}
if (this.state.lastName = ''){
  this.setState({ errors: { lastName: 'Last name is required.'}});
  return;
}
if (this.state.email = ''){
  this.setState({ errors: { email: 'Email address is required.'}});
  return;
}
if (this.state.phone = ''){
  this.setState({ errors: { phone: 'Phone number is required.'}});
  return;
}
this.setState({ firstName: '', lastName: '', suffix: '', email: '', phone: '', location: '', title: '', errors: {} });

    this.props.history.push('/');
  }; */

  render() { 
    return (
      <div>
        <h1> Personal Information </h1>
        <form >
          <div className='form-group'>
            <label form="formGroupExampleInput2">Don't forget to spell your name right.</label>
            <input onChange={this.handleChange} type="text" class="form-control" id="formGroupExampleInput2" placeholder="First Name" />
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Last Name" />
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Suffix" />
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Email" />
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Phone" />
            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Location" />
          </div>
        </form>
      </div>
      );
  }
}
 

class Resumes extends Component {
  render() {
    return (
      <div>
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/resumes", title: "Resumes" }]} />
        <div className="component-div">
          <Sidebar />
          <PersonalInfo />
          <div className="title-div">
            <h1 className="Header">Resumes</h1>
           
        </div>
      </div>
    </div>
    );
  }
}

export default Resumes;
