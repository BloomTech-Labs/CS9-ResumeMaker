import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import { Button, FormGroup } from "react-bootstrap";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";
import "./template3.css";
import { Link } from "react-router-dom";

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  toggle = () => {
    this.setState(
      {
        checked: !this.state.checked 
      },
      function() {
        console.log(this.state);
      }.bind(this)
    );
  };

  render() {
    return <input type="checkbox" checked={this.state.checked} onChange={this.toggle} />;
  }
}

export class TemplateThree extends Component {
  constructor(props) {
    super(props);
  }

  // handleSubmit(e) {
  //   e.preventDefault();

  //   const resume = {};
  //   for (const field in this.refs) {
  //     resume[field] = this.refs[field].value;
  //   }
  //   console.log("-->", resume);
  //   alert("Resume submitted: " + this.state.value);
  //   event.preventDefault();
  // }

  render() {
    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    console.log(userInfo);
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" },
            { link: "/templates/template-3", title: "Template Three" }
          ]}
        />

        <div className="component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Template Three</h3>
            </div>
            <form className="template1" onSubmit={this.handleSubmit}>
              <div class="row">
                <div class="col" className="left-column">
                  <a
                    href="https://www.freeiconspng.com/img/37126"
                    title="Image from freeiconspng.com"
                  >
                    <img
                      src="https://www.freeiconspng.com/uploads/logo-lion-head-png-8.png"
                      className="logo"
                      alt="logo lion head png"
                    />
                  </a>
                  <FormGroup textAlign="center" className="contactSection">
                    <h3 class="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p>{userInfo.email}</p>
                    </a>
                    <p>{userInfo.location}</p>
                    <p>{userInfo.phonenumber}</p>
                    <p>{userInfo.links.linkedin}</p>
                    <p>{userInfo.links.github}</p>
                    <p>{userInfo.links.portfolio}</p>
                  </FormGroup>
                </div>
                <div class="col">
                  <div textAlign="center" className="titleSection">
                    <h2>
                      {userInfo.name.firstname} {userInfo.name.lastname}
                    </h2>
                    <h4>{userInfo.title}</h4>
                  </div>
                  <Divider className="divider-div" />
                  <FormGroup
                    textAlign="center"
                    id="summary"
                    className="summarySection"
                  >
                    <h3 class="subtitle">Summary</h3>
                    {userInfo.summary.map((content, index) => {
                      return (
                        <div key={index}>
                          <p>{content}</p>
                          <CheckBox />
                        </div>
                      );
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />

                  <Divider className="divider-div" />

                  <FormGroup textAlign="center" className="skillsSection">
                    <h3 class="subtitle">Skills</h3>
                    {userInfo.skills.map((content, index) => {
                      return (
                        <div key={index}>
                          <p>{content}</p>
                          <CheckBox />
                        </div>
                      );
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="experienceSection">
                    <h3 class="subtitle">Experience</h3>
                    {experience.map((content, index) => {
                      return (
                        <div key={index}>
                          {console.log(content)}

                          <p>
                            {content.title} <br />

                            {content.company}
                            <br />
                            {content.location}
                            <br />
                            {content.from} - {content.to}

                          </p>
                          <p>{content.description} </p>
                          <CheckBox />

                        </div>
                      );
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="educationSection">
                    <h3 class="subtitle">Education</h3>
                    {education.map((content, index) => {
                      return (
                        <div key={index}>
                          <h5>{content.school} </h5>
                          <p>{content.location}</p>
                          <p>

                            {content.degree} in {content.fieldofstudy} <br />

                            {content.from} - {content.to}
                          </p>
                          <CheckBox />
                        </div>
                      );
                    })}
                  </FormGroup>
                </div>
              </div>
            </form>
            <div class="justify-content-center">
              <Link to="/resumes" className="resume-button" type="submit">
                {" "}
                Add Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TemplateThree;
