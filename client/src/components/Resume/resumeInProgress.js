import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import Sidebar from "../SubComponents/Sidebar/sidebar";
import "../Templates/template1.css";
import SummaryDropdown from "../Templates/TemplateClassFunctions/summaryDropdown";
import TitleDropdown from "../Templates/TemplateClassFunctions/titleDropdown";
import ResumeDropdown from "../SubComponents/Resume/resumeDropdown";
import CheckBox from "../Templates/TemplateClassFunctions/checkbox";
const urls = require("../../config/config.json");

class RIP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      success: false
    };
  }

  componentWillMount() {
    function findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

    let index = findWithAttr(
      this.props.context.userInfo.resumes,
      "_id",
      this.props.context.userInfo.currentresume
    );
    if (index === -1) index = 0;
    this.setState({ index: index });

    // if (this.props.context.userInfo.auth)
    // this.props.context.actions.expandResumeIDs(
    //   this.props.context.userInfo.currentResume
    // );
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    // if (this.props.context.userInfo.auth)
    //   this.props.context.actions.expandResumeIDs(
    //     this.props.context.userInfo.currentResume
    //   );
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

    axios
      .post(`${urls[urls.basePath]}/resume/`, tempObj, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data);
        this.props.context.actions.setSingleElement(
          "currentresume",
          response.data.Resume._id
        );
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    const tempObj = this.props.context.userInfo.resumes[this.state.index];
    if (!tempObj["user"]) tempObj["user"] = this.props.context.userInfo.id;
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
          console.log(response.data.resume._id);
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
              console.log("Response: ", response.data.user.currentresume);
            })
            .catch(err => {
              console.log("err", err);
            });
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      axios
        .post(`${urls[urls.basePath]}/resume/`, tempObj, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          this.setState({ success: true });
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  render() {
    if (!this.props.context.userInfo.auth) {
      return <Redirect to="/resumes" />;
    }
    if (this.state.success) {
      return <Redirect to="/templates" />;
    }
    if (!this.props.context.userInfo.resumes.length || this.props.context.userInfo.resumes[0] === null) {
      console.log("You probably had an error, which redirected you instead of crashing.");
      return <Redirect to="/resumes" />;
    }

    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    const resumes = this.props.context.userInfo.resumes;
    return (
      <div>
        <div className="component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Traditional</h3>
            </div>
            <div className="justify-content-center">
              <ResumeDropdown
                className="dropdown"
                context={this.props.context}
                data={userInfo}
              />
              <button className="resume-button" onClick={this.handleCreate}>
                {" "}
                Create Resume
              </button>
              <button className="resume-button" onClick={this.handleSubmit}>
                {" "}
                Save Resume
              </button>
            </div>
            <form className="template1">
              <Container textAlign="center" className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                {console.log(
                  "The Resume to RIP",
                  resumes,
                  "Index",
                  this.state.index,
                  "length",
                  resumes.length
                )}
                <TitleDropdown
                  className="dropdown"
                  context={this.props.context}
                  data={userInfo}
                  value={resumes[this.state.index].title.filter(
                    title => title.value === true
                  )}
                  index={this.state.index}
                />
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="contactSection">
                <h3>Contact Details</h3>
                <a href={`mailto:${userInfo.email}`}>
                  <p> {userInfo.email}</p>
                </a>
                <div>
                  <div className="fa fa-globe" aria-hidden="true" />
                  {userInfo.location}
                </div>
                <div>
                  <div className="fa fa-mobile" aria-hidden="true" />
                  {userInfo.phonenumber}
                </div>
                <div>
                  <CheckBox
                    context={this.props.context}
                    index={this.state.index}
                    name="linkedin"
                    value={resumes[this.state.index].links.linkedin}
                  />
                  <div className={"fa fa-linkedin fa-sm"} />
                  {userInfo.links.linkedin}
                </div>
                <div>
                  <CheckBox
                    context={this.props.context}
                    index={this.state.index}
                    name="github"
                    value={resumes[this.state.index].links.github}
                  />{" "}
                  <div className="fa fa-github" aria-hidden="true" />
                  {userInfo.links.github}
                </div>
                <p>
                  <CheckBox
                    context={this.props.context}
                    index={this.state.index}
                    name="portfolio"
                    value={resumes[this.state.index].links.portfolio}
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
                  value={resumes[this.state.index].sections.summary.filter(
                    summary => summary.value === true
                  )}
                  index={this.state.index}
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
                        {console.log(index, resumes[this.state.index].sections.skills[index])}
                        <CheckBox
                          context={this.props.context}
                          id={content._id}
                          name="skills"
                          value={
                            resumes[this.state.index].sections.skills[index]
                              .value
                          }
                          index={this.state.index}
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
                {experience.length > 0
                  ? experience.map((content, index) => {
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
                                resumes[this.state.index].sections.experience[
                                  index
                                ].value
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
                    })
                  : null}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="educationSection">
                <h3>Education</h3>
                {education.length > 0
                  ? education.map((content, index) => {
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
                                resumes[this.state.index].sections.education[
                                  index
                                ].value
                              }
                              index={this.state.index}
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
                    })
                  : null}
              </Container>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RIP;
