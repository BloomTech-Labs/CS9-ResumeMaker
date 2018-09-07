import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import "../Templates/template1.css";
import PDF from "../PDF/PDF";

export class ResumeOne extends Component {
  componentWillMount() {
    if (this.props.context.userInfo.auth)
      this.props.context.actions.expandResumeIDs(
        this.props.context.userInfo.currentResume
      );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    if (!this.props.context.userInfo.auth) {
      return <Redirect to="/resumes" />;
    }
    if (
      !this.props.context.userInfo.resumes.length ||
      this.props.context.userInfo.resumes[0] === null
    ) {
      return <h1>Loading...</h1>;
    }

    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    const resumes = this.props.context.userInfo.resumes;
    const summaryLength = userInfo.summary.filter((item, index) => {
      return resumes[resumes.length - 1].sections.summary[index].value;
    });
    const skillsLength = userInfo.skills.filter((item, index) => {
      return resumes[resumes.length - 1].sections.skills[index].value;
    });
    const educationLength = userInfo.education.filter((item, index) => {
      return resumes[resumes.length - 1].sections.education[index].value;
    });
    const experienceLength = userInfo.experience.filter((item, index) => {
      return resumes[resumes.length - 1].sections.experience[index].value;
    });

    return (
      <div>
        <Navbar context={this.props.context} />
        <div className="component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Traditional</h3>
            </div>
            <PDF />
            <form className="template1" onSubmit={this.handleSubmit}>
              <Container textAlign="center" className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                {userInfo.title.map((item, index) => {
                  return resumes[resumes.length - 1].title[index].value ? (
                    <p key={item._id}>{item.content}</p>
                  ) : null;
                })}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="contactSection">
                <h3>Contact Details</h3>
                <a href={`mailto:${userInfo.email}`}>
                  <p> {userInfo.email}</p>
                </a>
                <p>{userInfo.location}</p>
                <p>{userInfo.phonenumber}</p>
                <div>
                  {resumes[resumes.length - 1].links.linkedin ? (
                    <p>{userInfo.links.linkedin}</p>
                  ) : null}
                  {resumes[resumes.length - 1].links.github ? (
                    <p>{userInfo.links.github}</p>
                  ) : null}
                  {resumes[resumes.length - 1].links.portfolio ? (
                    <p>{userInfo.links.portfolio}</p>
                  ) : null}
                </div>
              </Container>
              <Divider className="divider-div" />
              {summaryLength.length > 0 ? (
                <div>
                  <Container
                    textAlign="center"
                    id="summary"
                    className="summarySection"
                  >
                    <h3>Summary</h3>
                    {userInfo.summary.map((item, index) => {
                      return resumes[resumes.length - 1].sections.summary[index]
                        .value ? (
                        <p key={item._id}>{item.content}</p>
                      ) : null;
                    })}
                  </Container>
                  <Divider className="divider-div" />
                </div>
              ) : null}

              {skillsLength.length > 0 ? (
                <div>
                  <Container textAlign="center" className="skillsSection">
                    <h3>Skills</h3>
                    {userInfo.skills.map((content, index) => {
                      return resumes[resumes.length - 1].sections.skills[index]
                        .value ? (
                        <div key={index}>
                          <p>{content.content}</p>
                        </div>
                      ) : null;
                    })}
                  </Container>
                  <Divider className="divider-div" />
                </div>
              ) : null}

              {experienceLength.length > 0 ? (
                <div>
                  <Container textAlign="center" className="experienceSection">
                    <h3>Experience</h3>
                    {experience.map((content, index) => {
                      let from = moment(content.from).format("MMM YYYY");
                      let to = moment(content.to).format("MMM YYYY");
                      return resumes[resumes.length - 1].sections.experience[
                        index
                      ].value ? (
                        <div key={index}>
                          <h5>{content.company} </h5>
                          <p>
                            {content.title}
                            <br />
                            {content.location}
                            <br />
                            {from} - {to}
                          </p>
                          <p>{content.description} </p>
                        </div>
                      ) : null;
                    })}
                  </Container>
                  <Divider className="divider-div" />
                </div>
              ) : null}

              {educationLength.length > 0 ? (
                <Container textAlign="center" className="educationSection">
                  <h3>Education</h3>
                  {education.map((content, index) => {
                    let from = moment(content.from).format("MMM YYYY");
                    let to = moment(content.to).format("MMM YYYY");
                    return resumes[resumes.length - 1].sections.education[index]
                      .value ? (
                      <div key={index}>
                        <h5>
                          {content.degree} in {content.fieldofstudy}{" "}
                        </h5>
                        <p>{content.location}</p>
                        <p>
                          {content.school}
                          <br />
                          {from} - {to}
                        </p>
                      </div>
                    ) : null;
                  })}
                </Container>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeOne;
