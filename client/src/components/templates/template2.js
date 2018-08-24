import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { Button, FormGroup } from "react-bootstrap";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";
import "./template2.css";
import { Link } from "react-router-dom";

export class TemplateTwo extends Component {
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
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Template Two</h3>
            </div>
            <form className="template1" onSubmit={this.handleSubmit}>
              <div textAlign="center" className="titleSection">
                <h2>
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <h4>{userInfo.title}</h4>
              </div>
              <Divider className="divider-div" />
              <Container
                textAlign="center"
                id="summary"
                className="summarySection"
              >
                <h3 class="subtitle">Summary</h3>
                <p>{userInfo.summary}</p>
              </Container>
              <Divider className="divider-div" />
              <div class="row">
                <div class="col">
                  <FormGroup textAlign="center" className="contactSection">
                    <h3 class="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p>{userInfo.email}</p>
                    </a>
                    <p>
                      location!!!
                      {userInfo.location}
                      <br />
                      {userInfo.phoneNumber}
                    </p>
                    <p>
                      {userInfo.links.linkedin}
                      <br />
                      {userInfo.links.github}
                      <br />
                      {userInfo.links.portfolio}
                    </p>
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="educationSection">
                    <h3 class="subtitle">Education</h3>
                    {education.map(function(content, index) {
                      return (
                        <div key={index}>
                          <h3>{content.school} </h3>
                          <p>{content.location}</p>
                          <h5>
                            {content.degree} {content.field}{" "}
                          </h5>
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
                  </FormGroup>
                </div>
                <Divider className="divider-div" />
                <div class="col">
                  <FormGroup textAlign="center" className="skillsSection">
                    <h3 class="subtitle">Skills</h3>
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
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="experienceSection">
                    <h3 class="subtitle">Experience</h3>
                    {experience.map(function(content, index) {
                      return (
                        <div key={index}>
                          {console.log(content)}
                          <h4>{content.title} </h4>
                          <h5>{content.company}</h5>
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

export default TemplateTwo;
