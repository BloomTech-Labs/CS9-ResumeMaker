import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";
import "./template1.css";
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
        checked: !this.state.checked // flips boolean value
      },
      function() {
        console.log(this.state);
      }.bind(this)
    );
  };

  render() {
    return (
      <input
        type="checkbox"
        checked={this.state.checked}
        onChange={this.toggle}
      />
    );
  }
}

export class TemplateOne extends Component {
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

    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" },
            { link: "/templates/template-1", title: "Template One" }
          ]}
        />

        <div className="component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Template One</h3>
            </div>
            <form className="template1" onSubmit={this.handleSubmit}>
              <Container textAlign="center" className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                <h5>{userInfo.title}</h5>
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="contactSection">
                <h3>Contact Details</h3>
                <a href={`mailto:${userInfo.email}`}>
                  <p>
                    {" "}
                    <CheckBox />
                    {userInfo.email}
                  </p>
                </a>
                <p>
                  <CheckBox />
                  {userInfo.location}
                </p>
                <p>
                  <CheckBox />
                  {userInfo.phonenumber}
                </p>
                <p>
                  <CheckBox />
                  {userInfo.links.linkedin}
                  <br />
                  {userInfo.links.github}
                  <br />
                  {userInfo.links.portfolio}
                </p>
              </Container>
              <Divider className="divider-div" />
              <Container
                textAlign="center"
                id="summary"
                className="summarySection"
              >
                <h3>Summary</h3>
                {userInfo.summary.map((content, index) => {
                  return (
                    <div key={index}>
                      <p>{content}</p>
                      <CheckBox />
                    </div>
                  );
                })}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="skillsSection">
                <h3>Skills</h3>
                {userInfo.skills.map((content, index) => {
                  return (
                    <div key={index}>
                      <p>{content}</p>
                      <CheckBox />
                    </div>
                  );
                })}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="experienceSection">
                <h3>Experience</h3>
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
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="educationSection">
                <h3>Education</h3>
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
              </Container>
            </form>
            <div className="justify-content-center">
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

export default TemplateOne;
