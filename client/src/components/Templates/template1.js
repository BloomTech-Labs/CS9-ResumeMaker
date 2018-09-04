import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "./template1.css";
import SummaryDropdown from "./TemplateClassFunctions/summaryDropdown";
import TitleDropdown from "./TemplateClassFunctions/titleDropdown";
import CheckBox from "./TemplateClassFunctions/checkbox";

export class TemplateOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.context.userInfo.currentResume || 0
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = e => {};

  onCreate = () => {
    this.props.context.actions.createResume();
  };

  componentWillMount() {
    this.props.context.actions.expandResumeIDs(
      this.props.context.userInfo.currentResume
    );
  }

  render() {
    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    const resumes = this.props.context.userInfo.resumes;

    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/" },
            { link: "/templates", title: "Templates" },
            { link: "/Templates/template-1", title: "Template One" }
          ]}
        />

        <div className="component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Traditional</h3>
            </div>
            <div className="justify-content-center">
              <Link to="/resumes" className="resume-button" type="submit">
                {" "}
                Add Resume
              </Link>
            </div>
            <form className="template1" onSubmit={this.handleSubmit}>
              <Container textAlign="center" className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                <TitleDropdown
                  className="dropdown"
                  context={this.props.context}
                  data={userInfo}
                  value={resumes[resumes.length - 1].title.filter(
                    title => title.value === true
                  )}
                  index={resumes.length - 1}
                />
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="contactSection">
                <h3>Contact Details</h3>
                <a href={`mailto:${userInfo.email}`}>
                  <p> {userInfo.email}</p>
                </a>
                <p>
                  <i className="fa fa-globe" aria-hidden="true" />
                  {userInfo.location}
                </p>
                <p>
                  <i className="fa fa-mobile" aria-hidden="true" />
                  {userInfo.phonenumber}
                </p>
                <p>
                  <CheckBox
                    context={this.props.context}
                    index={resumes.length - 1}
                    name="linkedin"
                    value={resumes[resumes.length - 1].links.linkedin}
                  />
                  <i className={"fa fa-linkedin fa-sm"} />
                  {userInfo.links.linkedin}
                </p>
                <p>
                  <CheckBox
                    context={this.props.context}
                    index={resumes.length - 1}
                    name="github"
                    value={resumes[resumes.length - 1].links.github}
                  />{" "}
                  <i className="fa fa-github" aria-hidden="true" />
                  {userInfo.links.github}
                </p>
                <p>
                  <CheckBox
                    context={this.props.context}
                    index={resumes.length - 1}
                    name="portfolio"
                    value={resumes[resumes.length - 1].links.portfolio}
                  />{" "}
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
                <SummaryDropdown
                  context={this.props.context}
                  data={userInfo}
                  value={resumes[resumes.length - 1].sections.summary.filter(
                    summary => summary.value === true
                  )}
                  index={resumes.length - 1}
                />
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="skillsSection">
                <h3>Skills</h3>
                {userInfo.skills.map((content, index) => {
                  return (
                    <div key={index}>
                      <p>
                        {" "}
                        <CheckBox
                          context={this.props.context}
                          id={content._id}
                          name="skills"
                          value={
                            resumes[resumes.length - 1].sections.skills[index]
                              .value
                          }
                          index={resumes.length - 1}
                        />
                        {content.content}
                      </p>
                    </div>
                  );
                })}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="experienceSection">
                <h3>Experience</h3>
                {experience.map((content, index) => {
                  let from = moment(content.from).format("MMM YYYY");
                  let to = moment(content.to).format("MMM YYYY");
                  return (
                    <div key={index}>
                      <h5>
                        {" "}
                        <CheckBox
                          context={this.props.context}
                          id={content._id}
                          name="experience"
                          value={
                            resumes[resumes.length - 1].sections.experience[
                              index
                            ].value
                          }
                          index={resumes.length - 1}
                        />{" "}
                        {content.company}{" "}
                      </h5>
                      <p>
                        {" "}
                        {content.title}
                        <br />
                        {content.location}
                        <br />
                        {from} - {to}
                      </p>
                      <p>{content.description} </p>
                    </div>
                  );
                })}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="educationSection">
                <h3>Education</h3>
                {education.map((content, index) => {
                  let from = moment(content.from).format("MMM YYYY");
                  let to = moment(content.to).format("MMM YYYY");
                  return (
                    <div key={index}>
                      <h5>
                        <CheckBox
                          context={this.props.context}
                          id={content._id}
                          name="education"
                          value={
                            resumes[resumes.length - 1].sections.education[
                              index
                            ].value
                          }
                          index={resumes.length - 1}
                        />
                        {content.degree} in {content.fieldofstudy}{" "}
                      </h5>
                      <p>{content.location}</p>
                      <p>
                        {content.school}
                        <br />
                        {from} - {to}
                      </p>
                    </div>
                  );
                })}
              </Container>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TemplateOne;
