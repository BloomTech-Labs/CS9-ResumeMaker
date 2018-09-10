import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import SummaryDropdown from "../Templates/TemplateClassFunctions/summaryDropdown";
import TitleDropdown from "../Templates/TemplateClassFunctions/titleDropdown";
import ResumeDropdown from "../Templates/TemplateClassFunctions/resumeDropdown";
import CheckBox from "../Templates/TemplateClassFunctions/checkbox";
const urls = require("../../config/config.json");

class Resumes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      success: false
    };
  }

  findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i++) {
      console.log("arrayI", array[i][attr], "value compared to", value);
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  };

  updateResumeIndex = newIndex => {
    console.log("UPDATERESUMEINDEX CALD", newIndex);
    this.setState({ index: newIndex });
  };

  componentWillMount() {
    if (!this.props.context.userInfo.resumes.length)
      this.props.context.actions.createResume();
    //   console.log("template componentWillMount");
    //   let index = this.findWithAttr(
    //     this.props.context.userInfo.resumes,
    //     "_id",
    //     this.props.context.userInfo.currentresume
    //   );
    //   console.log(this.props.context.userInfo.currentresume)
    //   console.log("index from findWithAttr is:", index);
    //   if (index === -1) index = 0;
    //   this.setState({ index: index });
  }

  componentDidMount() {
    console.log("template componentDidMount");
    window.scrollTo(0, 0);
    let index = this.findWithAttr(
      this.props.context.userInfo.resumes,
      "_id",
      this.props.context.userInfo.currentresume
    );
    if (index === -1) index = 0;
    this.setState({ index: index });
  }

  handleCreate = () => {
    console.log("handle create called");
    const tempObj = {
      links: { linkedin: true, github: true, portfolio: true },
      title: this.props.context.userInfo.title.map(item => {
        return { _id: item._id, value: false };
      }),
      sections: {
        experience: this.props.context.userInfo.experience.map(item => {
          return { _id: item._id, value: true };
        }),
        education: this.props.context.userInfo.education.map(item => {
          return { _id: item._id, value: true };
        }),
        summary: this.props.context.userInfo.summary.map(item => {
          return { _id: item._id, value: false };
        }),
        skills: this.props.context.userInfo.skills.map(item => {
          return { _id: item._id, value: true };
        })
      }
    };
    tempObj["resumes"] = this.props.context.userInfo.resumes.map(
      resume => resume._id
    );
    axios
      .post(`${urls[urls.basePath]}/resume/`, tempObj, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.props.context.actions.pushResumes(response.data.Resume);
        console.log("RESPONSE TO CREATE TEMPLATE", response);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    const tempObj = this.props.context.userInfo.resumes[this.state.index];
    tempObj["resumes"] = this.props.context.userInfo.resumes.map(
      resume => resume._id
    );
    if (tempObj._id) {
      axios
        .put(
          `${urls[urls.basePath]}/resume/` +
            this.props.context.userInfo.resumes[this.state.index]._id,
          tempObj,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          axios
            .put(
              `${urls[urls.basePath]}/users/info/${
                this.props.context.userInfo.id
              }`,
              { currentresume: response.data.resume._id },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              }
            )
            .then(response => {
              this.setState({ success: true });
              // this.props.context.actions.setElement(this.state.index, "resumes", response.data.Resume);
            })
            .catch(err => {
              console.log("err", err);
            });
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      if (!tempObj["user"]) tempObj["user"] = this.props.context.userInfo.id;
      axios
        .post(`${urls[urls.basePath]}/resume/`, tempObj, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.props.context.actions.pushResumes(response.data.Resume);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  render() {

    if (!this.props.context.userInfo.auth && !localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    if (this.state.success) {
      return <Redirect to="/templates" />;
    }
    const resumes = this.props.context.userInfo.resumes;
    // The following if statement prevents crashes if resumes aren't loaded or don't exist yet.
    // Sidebar will either retrieve the resumes or will use setResume to make a default one for the user
    if (
      this.state.index === null ||
      this.props.context.userInfo.currentresume === null ||
      !resumes[this.state.index]
    ) {
      return (
        <div style={{ display: "none" }}>
          <Sidebar context={this.props.context} />
        </div>
      );
    }

    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    return (
      <div className="entire-page">
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className="title-div templates">
              <h4>RESUMES</h4>
              <p
                style={{
                  fontSize: "0.7rem",
                  paddingLeft: ".6rem",
                  width: "100%"
                }}
              >
                {" "}
                Enter information into each section: JOB TITLE, SUMMARY, SKILLS,
                EXPERIENCE, EDUCATION.
              </p>
            </div>
            <div className="containers-div">
              {this.props.context.userInfo.name.firstname ? (
                <h1>
                  Greetings, {this.props.context.userInfo.name.firstname}!
                </h1>
              ) : (
                <React.Fragment>
                  <h1>Welcome! </h1>
                  <p>
                    Please go to the SETTINGS page and fill in your information
                    to get started!
                  </p>
                </React.Fragment>
              )}
              {this.props.context.userInfo.membership ? (
                <React.Fragment>
                  <ResumeDropdown
                    updateResumeIndex={this.updateResumeIndex}
                    index={this.state.index}
                    className="dropdown"
                    context={this.props.context}
                    data={userInfo}
                  />
                  <button className="resume-button" onClick={this.handleCreate}>
                    {" "}
                    Create Resume
                  </button>
                </React.Fragment>
              ) : null}
              <button className="resume-button" onClick={this.handleSubmit}>
                {" "}
                Save Resume
              </button>
            </div>
            <Container className="resumePage">
              <Container className="contact-section">
                <h3>Contact Details</h3>
                <Container className="contactSection">
                  {this.props.context.userInfo.name.firstname &&
                  this.props.context.userInfo.name.lastname ? (
                    <h2>
                      {userInfo.name.firstname} {userInfo.name.lastname}
                    </h2>
                  ) : (
                    <h2>Please enter your full name in the SETTINGS page</h2>
                  )}
                  <Container className="contactHolder">
                    <Container className="contactOne">
                      <a href={`mailto:${userInfo.email}`}>
                        <div> {userInfo.email}</div>
                      </a>
                      <div>
                        <div className="fa fa-globe" aria-hidden="true" />
                        {" " + userInfo.location}
                      </div>
                      <div>
                        <div className="fa fa-mobile" aria-hidden="true" />
                        {" " + userInfo.phonenumber}
                      </div>
                    </Container>
                    <Container className="contactTwo">
                      <CheckBox
                        context={this.props.context}
                        index={this.state.index}
                        name="linkedin"
                        value={
                          resumes[this.state.index]
                            ? resumes[this.state.index].links.linkedin
                            : null
                        }
                      />
                      {" " + userInfo.links.linkedin}{" "}
                      <div className={"fa fa-linkedin fa-sm"} />
                      <div>
                        <CheckBox
                          context={this.props.context}
                          index={this.state.index}
                          name="github"
                          value={
                            resumes[this.state.index]
                              ? resumes[this.state.index].links.github
                              : null
                          }
                        />
                        {" " + userInfo.links.github}{" "}
                        <div className="fa fa-github" aria-hidden="true" />
                      </div>
                      <p>
                        <CheckBox
                          context={this.props.context}
                          index={this.state.index}
                          name="portfolio"
                          value={
                            resumes[this.state.index]
                              ? resumes[this.state.index].links.portfolio
                              : null
                          }
                        />{" "}
                        {" " + userInfo.links.portfolio}
                      </p>
                    </Container>
                  </Container>
                </Container>
              </Container>
              <Container className="title-section">
                <Container className="titleHolder">
                  <h3>Titles</h3>
                </Container>
                <Container className="titleSection">
                  <TitleDropdown
                    context={this.props.context}
                    data={userInfo}
                    value={
                      resumes[this.state.index]
                        ? resumes[this.state.index].title.filter(
                            title => title.value === true
                          )
                        : null
                    }
                    index={this.state.index}
                  />
                </Container>
              </Container>
              <Container className="summary-section">
                <div className="summaryHolder">
                  <h3>Summary</h3>
                </div>
                <Container className="summarySection">
                  <SummaryDropdown
                    context={this.props.context}
                    data={userInfo}
                    value={
                      resumes[this.state.index]
                        ? resumes[this.state.index].sections.summary.filter(
                            summary => summary.value === true
                          )
                        : null
                    }
                    index={this.state.index}
                  />
                </Container>
              </Container>
              <Container className="skills-section">
                <div className="skillsHolder">
                  <h3>Skills</h3>
                </div>
                <Container className="skillsSection">
                  {userInfo.skills.map((content, index) => {
                    return (
                      <div key={content._id}>
                        <p>
                          <CheckBox
                            context={this.props.context}
                            id={content._id}
                            name="skills"
                            value={
                              resumes[this.state.index].sections.skills[index]
                                ? resumes[this.state.index].sections.skills[
                                    index
                                  ].value
                                : null
                            }
                            index={this.state.index}
                          />
                          {" " + content.content}
                        </p>
                      </div>
                    );
                  })}
                </Container>
              </Container>
              <Container className="experience-section">
                <div className="experienceHolder">
                  <h3>Experience</h3>
                </div>
                <Container className="experienceSection">
                  {experience.map((content, index) => {
                    let from = moment(content.from).format("MMM YYYY");
                    let to = moment(content.to).format("MMM YYYY");
                    return (
                      <div key={content._id}>
                        <h5>
                          {" "}
                          <CheckBox
                            context={this.props.context}
                            id={content._id}
                            name="experience"
                            value={
                              resumes[this.state.index].sections.experience[
                                index
                              ]
                                ? resumes[this.state.index].sections.experience[
                                    index
                                  ].value
                                : null
                            }
                            index={this.state.index}
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
              </Container>
              <Container className="education-section">
                <div className="educationHolder">
                  <h3>Education</h3>
                </div>
                <Container className="educationSection">
                  {education.map((content, index) => {
                    let from = moment(content.from).format("MMM YYYY");
                    let to = moment(content.to).format("MMM YYYY");
                    return (
                      <div key={content._id}>
                        <h5>
                          <CheckBox
                            context={this.props.context}
                            id={content._id}
                            name="education"
                            value={
                              resumes[this.state.index].sections.education[
                                index
                              ]
                                ? resumes[this.state.index].sections.education[
                                    index
                                  ].value
                                : null
                            }
                            index={this.state.index}
                          />
                          {" " + content.degree} in {content.fieldofstudy}{" "}
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
              </Container>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Resumes;
