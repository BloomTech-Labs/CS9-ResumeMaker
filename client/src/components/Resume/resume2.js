import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { FormGroup } from "reactstrap";
import moment from "moment";
import { Redirect } from "react-router-dom";

import Sidebar from "../SubComponents/Sidebar/sidebar";
import "../Templates/template2.css";
import PDF from "../PDF/PDF";

export class ResumeTwo extends Component {
  componentWillMount() {
    if (this.props.context.userInfo.auth !== true)
      this.props.history.push("/resumes");
    else
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
        <div className="component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Modern</h3>
            </div>
            <PDF />
            <form className="template1" onSubmit={this.handleSubmit}>
              <div style={{ textAlign: "center" }} className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                {userInfo.title.map((item, index) => {
                  return resumes[resumes.length - 1].title[index].value ? (
                    <p key={item._id}>{item.content}</p>
                  ) : null;
                })}
              </div>

              {summaryLength.length > 0 ? (
                <Container
                  textalign="center"
                  id="summary"
                  className="summarySection"
                >
                  <Divider className="divider-div" />
                  <h3 className="subtitle">Summary</h3>
                  {userInfo.summary.map((item, index) => {
                    return resumes[resumes.length - 1].sections.summary[index]
                      .value ? (
                      <p key={item._id}>{item.content}</p>
                    ) : null;
                  })}
                </Container>
              ) : null}

              <Divider className="divider-div" />
              <div className="row">
                <div className="col">
                  <FormGroup textalign="center" className="contactSection">
                    <h3 className="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p> {userInfo.email}</p>
                    </a>
                    <p>{userInfo.location}</p>
                    <p>{userInfo.phonenumber}</p>
                    {resumes[resumes.length - 1].links.linkedin ? (
                      <p>{userInfo.links.linkedin}</p>
                    ) : null}
                    {resumes[resumes.length - 1].links.github ? (
                      <p>{userInfo.links.github}</p>
                    ) : null}
                    {resumes[resumes.length - 1].links.portfolio ? (
                      <p>{userInfo.links.portfolio}</p>
                    ) : null}
                  </FormGroup>

                  {educationLength.length > 0 ? (
                    <FormGroup textalign="center" className="educationSection">
                      <Divider className="divider-div" />
                      <h3 className="subtitle">Education</h3>
                      {education.map((content, index) => {
                        let from = moment(content.from).format("MMM YYYY");
                        let to = moment(content.to).format("MMM YYYY");
                        return resumes[resumes.length - 1].sections.education[
                          index
                        ].value ? (
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
                    </FormGroup>
                  ) : null}
                </div>

                <Divider className="divider-div" />
                <div className="col">
                  {skillsLength.length > 0 ? (
                    <FormGroup textalign="center" className="skillsSection">
                      <h3 className="subtitle">Skills</h3>
                      {userInfo.skills.map((content, index) => {
                        return resumes[resumes.length - 1].sections.skills[
                          index
                        ].value ? (
                          <div key={index}>
                            <p>{content.content}</p>
                          </div>
                        ) : null;
                      })}
                      <Divider className="divider-div" />
                    </FormGroup>
                  ) : null}

                  {experienceLength.length > 0 ? (
                    <FormGroup textalign="center" className="experienceSection">
                      <h3 className="subtitle">Experience</h3>
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
                    </FormGroup>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeTwo;
