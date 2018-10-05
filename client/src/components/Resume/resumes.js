import React, { Component } from "react";
import { Container } from "reactstrap";
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
      success: false,
      resumeName: null
    };
  }

  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  findWithAttr = (array, attr, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  };

  updateResumeName = newIndex => {
    console.log("NULL ME BABY", newIndex);
    // console.log("updateResumeName: newIndex = ", newIndex)
    if (this.props.context.userInfo.resumes.length > 0) {
      if (newIndex >= 0) {
        this.setState({
          resumeName: this.props.context.userInfo.resumes[newIndex].name
        });
      } else if (
        this.state.index >= 0 &&
        this.props.context.userInfo.resumes[this.state.index]
      ) {
        this.setState({
          resumeName: this.props.context.userInfo.resumes[this.state.index].name
        });
      }
    }
  };

  updateResumeIndex = newIndex => {
    // console.log("IS THIS RUN UPDATE", newIndex)
    if (newIndex >= 0) {
      // console.log("NEWINDEX", newIndex)
      // console.log("updateResumeIndex, newIndex", newIndex)
      this.setState({ index: newIndex });
    } else {
      let index = this.findWithAttr(
        this.props.context.userInfo.resumes,
        "_id",
        this.props.context.userInfo.currentresume
      );
      if (index >= 0) {
        this.setState({ index: index });
      } else if (
        this.props.context.userInfo.membership === false &&
        this.props.context.userInfo.membership.auth === true
      ) {
        this.setState({ index: 0 });
      }
    }

    if (this.props.context.userInfo.resumes[0]) {
      this.updateResumeName(newIndex);
    }

    if (
      this.props.context.userInfo.auth === true &&
      this.props.context.userInfo.resumes.length === 0
    ) {
      this.handleCreate();
    } else if (
      newIndex >= 0 &&
      this.props.context.userInfo.resumes.length > 0
    ) {
      this.props.context.actions.setCurrentResume(
        this.props.context.userInfo.resumes[newIndex]._id
      );
    } else if (
      this.props.context.userInfo.resumes.length > 0 &&
      this.state.index
    ) {
      this.props.context.actions.setCurrentResume(
        this.props.context.userInfo.resumes[this.state.index]._id
      );
    } else if (this.props.context.userInfo.resumes.length === 1) {
      this.props.context.actions.setCurrentResume(
        this.props.context.userInfo.resumes[0]._id
      );
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.updateResumeIndex();
  }

  handleCreate = () => {
    const tempObj = {
      links: { linkedin: false, github: false, portfolio: false },
      title: this.props.context.userInfo.title.map(item => {
        return { _id: item._id, value: false };
      }),
      sections: {
        experience: this.props.context.userInfo.experience.map(item => {
          return { _id: item._id, value: false };
        }),
        education: this.props.context.userInfo.education.map(item => {
          return { _id: item._id, value: false };
        }),
        summary: this.props.context.userInfo.summary.map(item => {
          return { _id: item._id, value: false };
        }),
        skills: this.props.context.userInfo.skills.map(item => {
          return { _id: item._id, value: false };
        })
      }
    };
    // tempObj["resumes"] = this.props.context.userInfo.resumes.map(
    //   resume => resume._id
    // );
    axios
      .post(`${urls[urls.basePath]}/resume/`, tempObj, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.props.context.actions.pushResumes(response.data.Resume);
        this.updateResumeIndex(this.props.context.userInfo.resumes.length - 1);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleSubmit = (event, useProps) => {
    if (event) {
      event.preventDefault();
    }
    const tempObj = this.props.context.userInfo.resumes[this.state.index];
    if(useProps === true){
      tempObj.name = this.props.resumeName;
    } else {
      tempObj.name = this.state.resumeName;
    }
    // tempObj["resumes"] = this.props.context.userInfo.resumes.map(
    //   resume => resume._id
    // );
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
              if(useProps !== true){
                this.setState({ success: true });
              }
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
          // this.setState({ success: true });
          this.props.context.actions.pushResumes(response.data.Resume);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  handleDelete = event => {
    if (event) {
      event.preventDefault();
    }
    const tempObj = this.props.context.userInfo.resumes[this.state.index];
    console.log("TEMP OBJ", tempObj);
    if (tempObj._id) {
      axios
        .delete(`${urls[urls.basePath]}/resume/delete/` + tempObj._id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log("DELETE RESPONSE");
          this.props.context.actions.removeElement(this.state.index, "resumes");
          // this.props.context.actions.setSingleElement("currentresume", )
          if (this.state.index > 0) {
            // this.props.context.actions.setCurrentResume(this.state.index - 1);
            this.updateResumeIndex(this.state.index - 1);
          } else this.updateResumeIndex(this.state.index);
          // else if(this.props.context.userInfo.resumes[this.state.index + 1]){
          //   // this.props.context.actions.setCurrentResume(this.state.index + 1);
          //   this.updateResumeIndex(this.state.index + 1);
          // }
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
          this.setState({ success: true });
          this.props.context.actions.pushResumes(response.data.Resume);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  componentDidUpdate = () => {
    if (this.props.context.userInfo.resumes[0]) {
      if (this.state.resumeName === null || this.state.index === null) {
        this.updateResumeIndex();
        // } else if(this.state.index !== null && this.state.resumeName != this.props.context.userInfo.resumes[this.state.index].name){
        //   this.updateResumeName(this.state.index);
      }
    }
  };

  render() {
    console.log(
      "resumes render props resumes",
      this.props.context.userInfo.resumes
    );
    console.log("resumes render state index", this.state.index);
    console.log(
      "resumes render currentres props",
      this.props.context.userInfo.currentresume
    );

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
      // {resumes.length ? this.handleCreate() : null}
      return (
        <div>
          <div style={{ display: "none" }}>
            <Sidebar context={this.props.context} />
          </div>
        </div>
      );
    }

    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    return (
      <div className="entire-page">
        <Navbar context={this.props.context} />
        <div className="templates overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className="templates section-title">
              {this.props.context.userInfo.name.firstname ? (
                <React.Fragment>
                  <div className="link-hide" style={{float: "left", padding: "0"}}>
                    <h4>
                      Welcome to your Dashboard,{" "}
                      {this.props.context.userInfo.name.firstname}!
                    </h4>
                  </div>
                  <div style = {{width: "100%"}}>
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "0.7rem",
                        paddingLeft: "0.6rem",
                        borderTop: "1px solid black",
                        width: "100%",
                        textAlign: "left"
                      }}
                    >
                      {" "}
                      Click each tab on the left to enter your information and
                      populate each section on the resume form below: JOB TITLE,
                      SUMMARY, SKILLS, EXPERIENCE, & EDUCATION. Next, scroll down
                      this page to check the information you would like displayed
                      on your final resume. Once completed, SAVE your changes and
                      go to TEMPLATES to choose your layout. You can also CREATE
                      multiple RESUMES with a subscription.
                    </p>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="link-hide" style={{float: "left", padding: "0"}}>
                    <h4>Welcome! </h4>
                  </div>
                  <div style={{width: "100%"}}>
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "0.7rem",
                        paddingLeft: "0.6rem",
                        borderTop: "1px solid black",
                        width: "100%",
                        textAlign: "left"
                      }}
                    >
                      {"  "} Please go to the SETTINGS page and fill in your
                      information to get started!
                    </p>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="containers-div">
              {this.props.context.userInfo.membership ? (
                <React.Fragment>
                  <ResumeDropdown
                    updateResumeIndex={this.updateResumeIndex}
                    onInputChange={this.onInputChange}
                    handleSubmit={this.handleSubmit}
                    resumeName={this.state.resumeName}
                    index={this.state.index}
                    className="dropdown"
                    context={this.props.context}
                    data={userInfo}
                  />
                  <button
                    className="resume-button"
                    onClick={this.handleCreate}
                    style={{
                      width: "6rem",
                      height: "1.5rem",
                      fontSize: ".7rem"
                    }}
                  >
                    {" "}
                    Create Resume
                  </button>
                  <button
                    className="resume-button"
                    onClick={this.handleDelete}
                    style={{
                      width: "6rem",
                      height: "1.5rem",
                      fontSize: ".7rem"
                    }}
                  >
                    {" "}
                    Delete Resume
                  </button>
                </React.Fragment>
              ) : null}
              <button
                className="resume-button"
                onClick={this.handleSubmit}
                style={{ width: "6rem", height: "1.5rem", fontSize: ".7rem" }}
              >
                {" "}
                Save Changes
              </button>
            </div>
            <Container className="resumePage">
              <Container className="contact-section">
                <Container className="contact-holder">
                <h6 style={{ fontWeight: "bold" }}>Contact Details:</h6>
                </Container>
                <Container className="contactSection">
                  {this.props.context.userInfo.name.firstname &&
                  this.props.context.userInfo.name.lastname ? (
                    this.props.context.userInfo.name.middlename ? (
                      <h5>
                        {userInfo.name.firstname} {userInfo.name.middlename}{" "}
                        {userInfo.name.lastname}
                      </h5>
                    ) : (
                      <h5>
                        {userInfo.name.firstname} {userInfo.name.lastname}
                      </h5>
                    )
                  ) : (
                    <h4>Please enter your full name in the SETTINGS page</h4>
                  )}
                  <Container className="contactHolder">
                    <Container className="contactOne">
                      <div
                        className="fas fa-envelope"
                        style={{ display: "flex", justifyContent: "center" }}
                        aria-hidden="true"
                      >
                        <a href={`mailto:${userInfo.email}`}>
                          <div style={{ marginLeft: "4%" }}>
                            {" "}
                            {userInfo.email}
                          </div>
                        </a>
                      </div>
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
                      <div className="checkbox-div">
                        <CheckBox
                          context={this.props.context}
                          index={this.state.index}
                          name="linkedin"
                          value={
                            resumes[this.state.index] &&
                            resumes[this.state.index].links
                              ? resumes[this.state.index].links.linkedin
                              : null
                          }
                        />
                        {" " + userInfo.links.linkedin + " "}
                        <div className={"fa fa-linkedin fa-sm"} />
                      </div>
                      <div className="checkbox-div">
                        <CheckBox
                          context={this.props.context}
                          index={this.state.index}
                          name="github"
                          value={
                            resumes[this.state.index] &&
                            resumes[this.state.index].links
                              ? resumes[this.state.index].links.github
                              : null
                          }
                        />
                        {" " + userInfo.links.github + " "}
                        <div className="fa fa-github" aria-hidden="true" />
                      </div>
                      <div className="checkbox-div">
                        <CheckBox
                          style={{ marginRight: "1%" }}
                          context={this.props.context}
                          index={this.state.index}
                          name="portfolio"
                          value={
                            resumes[this.state.index] &&
                            resumes[this.state.index].links
                              ? resumes[this.state.index].links.portfolio
                              : null
                          }
                        />
                        {" " + userInfo.links.portfolio + " "}
                        <div className="fa fa-folder-open" aria-hidden="true" />
                      </div>
                    </Container>
                  </Container>
                </Container>
              </Container>
              <Container className="title-section">
                <Container className="titleHolder">
                <h6 style={{ fontWeight: "bold" }}>Titles:</h6>
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
                <h6 style={{ fontWeight: "bold" }}>Summary:</h6>
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
                <h6 style={{ fontWeight: "bold" }}>Skills:</h6>
                </div>
                <Container
                  className="skillsSection"
                  style={{ fontSize: ".8rem" }}
                >
                  {userInfo.skills.map((content, index) => {
                    return (
                      <div key={content._id}>
                          {" "}
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
                          <b>{" " + content.groupname}</b>
                          <p>{content.content}</p>
                      </div>
                    );
                  })}
                </Container>
              </Container>
              <Container className="experience-section">
                <div className="experienceHolder">
                  <h6 style={{ fontWeight: "bold" }}>Experience:</h6>
                </div>
                <Container
                  className="experienceSection"
                  style={{ fontSize: ".75rem" }}
                >
                  {experience.map((content, index) => {
                    let from = moment(content.from).format("MMM YYYY");
                    let to = moment(content.to).format("MMM YYYY");
                    return (
                      <div key={content._id}>
                        <h6>
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
                        </h6>
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
                  <h6 style={{ fontWeight: "bold" }}>Education:</h6>
                </div>
                <Container
                  className="educationSection"
                  style={{ fontSize: ".75rem" }}
                >
                  {education.map((content, index) => {
                    let from = moment(content.from).format("MMM YYYY");
                    let to = moment(content.to).format("MMM YYYY");
                    return (
                      <div key={content._id}>
                        <h6>
                          {" "}
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
                          {" " + content.degree}{content.fieldofstudy !== "" ? " in " + content.fieldofstudy : null}
                        </h6>
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
