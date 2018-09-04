import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import { FormGroup } from "reactstrap";
import moment from "moment";

import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "../Templates/template3.css";
import PDF from "../PDF/PDF";

export class ResumeThree extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
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
            { link: "/resumes", title: "Resumes" },
            { link: "/resumes/resume3", title: "Elegant Resume" }
          ]}
        />

        <div className="component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Elegant</h3>
            </div>
            <PDF />
            <form className="template1" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="left-column">
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
                    <h3 className="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p className="contact-section"> {userInfo.email}</p>
                    </a>
                    <p className="contact-section">{userInfo.location}</p>
                    <p className="contact-section">{userInfo.phonenumber}</p>
                    <p className="contact-section">
                      {resumes[resumes.length - 1].links.linkedin ? (
                        <p>{userInfo.links.linkedin}</p>
                      ) : null}
                    </p>
                    <p className="contact-section">
                      {resumes[resumes.length - 1].links.github ? (
                        <p>{userInfo.links.github}</p>
                      ) : null}
                    </p>
                    <p className="contact-section">
                      {resumes[resumes.length - 1].links.portfolio ? (
                        <p>{userInfo.links.portfolio}</p>
                      ) : null}
                    </p>
                  </FormGroup>
                </div>
                <div className="col">
                  <div textAlign="center" className="titleSection">
                    <h2>
                      {userInfo.name.firstname} {userInfo.name.lastname}
                    </h2>
                    {userInfo.title.map((item, index) => {
                      return resumes[resumes.length - 1].title[index].value ? (
                        <p key={item._id}>{item.content}</p>
                      ) : null;
                    })}
                  </div>
                  <Divider className="divider-div" />
                  <FormGroup
                    textAlign="center"
                    id="summary"
                    className="summarySection"
                  >
                    <h3 className="subtitle">Summary</h3>
                    {userInfo.summary.map((item, index) => {
                      return resumes[resumes.length - 1].sections.summary[index]
                        .value ? (
                        <p key={item._id}>{item.content}</p>
                      ) : null;
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />

                  <Divider className="divider-div" />

                  <FormGroup textAlign="center" className="skillsSection">
                    <h3 className="subtitle">Skills</h3>
                    {userInfo.skills.map((content, index) => {
                      return resumes[resumes.length - 1].sections.skills[index]
                        .value ? (
                        <div key={index}>
                          <p>{content.content}</p>
                        </div>
                      ) : null;
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="experienceSection">
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
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="educationSection">
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeThree;
