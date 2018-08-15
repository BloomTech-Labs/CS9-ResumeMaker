import React, { Component } from "react";
import Sidebar from "./subComponents/sidebar";
import Navbar from "./subComponents/navbar";

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Please complete you summary here.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('Summary submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <Navbar breadcrumbs={[{ link: "/", title: "Home" }, { link: "/summary", title: "Summary" }]} />
        <div className="component-div">
          <Sidebar />
          <div className="title-div">
            <h1>Personal Summary</h1>
            <form>
              <div class="form-group">
                <label for="formGroupExampleInput2">Tell us about yourself..</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Summary;
