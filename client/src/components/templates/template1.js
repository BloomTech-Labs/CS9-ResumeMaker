import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";
import "./template1.css";
import { Link } from "react-router-dom";

export class TemplateOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  // getInitialState(e) {
  //   return { isSelected: this.props.data.isSelected };
  // }
  handleChange = e => {
    let selected = !this.state.isSelected;
    this.setState({ isSelected: selected });
  };

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
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" },
            { link: "/templates/template-1", title: "Template One" }
          ]}
        />

        <div className="component-div">
          <Sidebar />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Template One</h3>
            </div>
            <form className="template1" onSubmit={this.handleSubmit}>
              <Container textAlign="center" className="titleSection">
                <h2>
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <h4>{userInfo.title}</h4>
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="contactSection">
                <h3>Contact Details</h3>
                <a href={`mailto:${userInfo.email}`}>
                  <p>{userInfo.email}</p>
                </a>
                <p>{userInfo.location}</p>
                <p>{userInfo.phoneNumber}</p>
                <p>{userInfo.links.linkedin}</p>
                <p>{userInfo.links.github}</p>
                <p>{userInfo.links.portfolio}</p>
              </Container>
              <Divider className="divider-div" />
              <Container
                textAlign="center"
                id="summary"
                className="summarySection"
              >
                <h3>Summary</h3>
                <p>{userInfo.summary}</p>
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="skillsSection">
                <h3>Skills</h3>
                {userInfo.skills.map((content, index) => (
                  <div key={index}>
                    <p>{content}</p>
                    {/* <input
                      type="checkbox"
                      checked={this.state.isSelected}
                      onClick={this.handleChange}
                    />{" "} */}
                  </div>
                ))}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="experienceSection">
                <h3>Experience</h3>

                {experience.map(function(content, index) {
                  return (
                    <div key={index}>
                      {console.log(content)}
                      <p>{content.title} </p>
                      <p>{content.company}</p>
                      <p>{content.location}</p>
                      <p>
                        {content.from} - {content.to}
                      </p>
                      <p>{content.description} </p>
                      {/* <input
                      type="checkbox"
                      checked={this.state.isSelected}
                      onClick={this.handleChange}
                    />{" "} */}
                    </div>
                  );
                })}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="educationSection">
                <h3>Education</h3>
                {education.map(function(content, index) {
                  return (
                    <div key={index}>
                      <h3>{content.school} </h3>
                      <p>{content.location}</p>
                      <p>
                        {content.degree} {content.field}{" "}
                      </p>
                      <p>
                        {content.from} - {content.to}
                      </p>
                      {/* <input
                      type="checkbox"
                      checked={this.state.isSelected}
                      onClick={this.handleChange}
                    />{" "} */}
                    </div>
                  );
                })}
              </Container>
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

export default TemplateOne;
