import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import axios from "axios";
const urls = require("../../config/config.json");

class JobTitleCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      _id: "",
      success: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    if (
      this.props.context.userInfo.auth === true &&
      this.props.location.state.index !== false
    ) {
      this.setState({
        content: this.props.context.userInfo.title[
          this.props.location.state.index
        ].content,
        _id: this.props.context.userInfo.title[this.props.location.state.index]
          ._id
      });
    }
  }

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (event, deleteFlag) => {
    event.preventDefault();

    if (this.props.location.state.index === false && !deleteFlag) {
      this.props.context.actions.addElement("title", {
        // When creating, do NOT put in an _id, let mongo autocreate one
        content: this.state.content
      });
    } // if creating
    else if (!deleteFlag) {
      this.props.context.actions.setElement(
        this.props.location.state.index,
        "title",
        {
          content: this.state.content,
          _id: this.state._id
        }
      );
    } // if editing
    else {
      this.props.context.actions.removeElement(
        this.props.location.state.index,
        "title"
      );
    }

    const tempObj = {
      title: this.props.context.userInfo.title
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
        {this.state.success ? <Redirect to="/jobtitle" /> : null}
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="section title-div col">
          <div className="section-title">
            <h5>JOB TITLE</h5>
            <p style={{fontSize: "0.7rem", fontStyle: "Italic", borderTop: "1px solid black", width: "100%"}}>
              “It is not titles that honour men, but men that honour titles.” ―
              Niccolò Machiavelli
            </p>
       
            <form>
              <div className="form-group row">
                <input
                  style={{fontSize: ".7rem", width: "20rem", height: "1.5rem"}}
                  value={this.state.content}
                  onChange={this.onInputChange}
                  className="form-control"
                  name="content"
                  placeholder="Enter Your Job Title"
                />
             
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

export default JobTitleCreate;
