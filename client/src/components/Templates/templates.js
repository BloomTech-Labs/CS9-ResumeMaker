import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import SummaryDropdown from "../Templates/TemplateClassFunctions/summaryDropdown";
import TitleDropdown from "../Templates/TemplateClassFunctions/titleDropdown";
import ResumeDropdown from "../SubComponents/Resume/resumeDropdown";
import CheckBox from "../Templates/TemplateClassFunctions/checkbox";
const urls = require("../../config/config.json");

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: null,
      success: false
    };
  }

  findWithAttr = (array, attr, value) => {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

  componentWillMount() {
    // function findWithAttr(array, attr, value) {
    //   for (var i = 0; i < array.length; i += 1) {
    //     if (array[i][attr] === value) {
    //       return i;
    //     }
    //   }
    //   return -1;
    // }

    // If there are no resumes saved yet, this if statement will prevent crashing.
    if (
      this.props.context.userInfo.auth === true &&
      (!this.props.context.userInfo.resumes.length ||
      this.props.context.userInfo.resumes[0] === null)
    ) {
      this.props.context.actions.setResume([]);
    } else {
      let index = this.findWithAttr(
        this.props.context.userInfo.resumes,
        "_id",
        this.props.context.userInfo.currentresume
      );
      if (index === -1) index = 0;
      this.setState({ index: index });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // componentWillUnmount() {
  //   this.props.context.actions.expandResumeIDs(
  //     this.props.context.userInfo.currentresume
  //   );
  // }

  handleCreate = () => {
    console.log("handle create called")
    const tempObj = {
      links: { linkedin: true, github: true, portfolio: true },
      title: this.props.context.userInfo.title.map(item => {
        return { _id: item._id, value: true };
      }),
      sections: {
        experience: this.props.context.userInfo.experience.map(item => {
          return { _id: item._id, value: true };
        }),
        education: this.props.context.userInfo.education.map(item => {
          return { _id: item._id, value: true };
        }),
        summary: this.props.context.userInfo.summary.map(item => {
          return { _id: item._id, value: true };
        }),
        skills: this.props.context.userInfo.skills.map(item => {
          return { _id: item._id, value: true };
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
    console.log("HANDLESUBMITCALLED")
    if(event){
      event.preventDefault();
    }
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
    if (!this.props.context.userInfo.auth && !localStorage.getItem("token")) {
      return <Redirect to="/login" />;
    }
    if (this.state.success) {
      return <Redirect to="/resumes" />;
    }
    const resumes = this.props.context.userInfo.resumes;
    if (
      !resumes[this.state.index] ||
      this.props.context.userInfo.auth === false ||
      this.props.context.userInfo.currentresume === null ||
      this.state.index === null
    ) {
      return (
        <div style={{display: "none"}}>
          <Sidebar context={this.props.context} />
        </div>
      );

      // console.log(
      //   "You probably had an error, which redirected you instead of crashing."
      // );
      // return <Redirect to="/login" />;
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
              <h4>TEMPLATES</h4>
              <p
                style={{
                  fontSize: "0.7rem",
                  paddingLeft: ".6rem",
                  width: "100%"
                }}
              >
                {" "}
                Enter information into each section on the sidebar. Then choose
                a template below to complete your RESUME.
              </p>
            </div>
            <div className="containers-div">
              {this.props.context.userInfo.name.firstname ? (
                <h1>Hi {this.props.context.userInfo.name.firstname}</h1>
              ) : (
                <h1>Hi</h1>
              )}
              <ResumeDropdown
                className="dropdown"
                context={this.props.context}
                data={userInfo}
              />
              {this.props.context.userInfo.membership ? (
                <button className="resume-button" onClick={this.handleCreate}>
                  {" "}
                  Create Resume
                </button>
              ) : null}
              <button className="resume-button" onClick={this.handleSubmit}>
                {" "}
                Save Resume
              </button>
            </div>

            {/* <Container textAlign="center" className="titleSection"> */}
            <h2>
              {userInfo.name.firstname} {userInfo.name.lastname}
            </h2>

            <TitleDropdown
              className="dropdown"
              context={this.props.context}
              data={userInfo}
              value={resumes[this.state.index] ? resumes[this.state.index].title.filter(
                title => title.value === true
              ): null}
              index={this.state.index}
            />
            {/* </Container> */}
            {/* <Divider className="divider-div" /> */}
            {/* <Container textAlign="center" className="contactSection"> */}
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
                value={resumes[this.state.index] ? resumes[this.state.index].links.linkedin : null}
              />
              <div className={"fa fa-linkedin fa-sm"} />
              {userInfo.links.linkedin}
            </div>
            <div>
              <CheckBox
                context={this.props.context}
                index={this.state.index}
                name="github"
                value={resumes[this.state.index] ? resumes[this.state.index].links.github : null}
              />{" "}
              <div className="fa fa-github" aria-hidden="true" />
              {userInfo.links.github}
            </div>
            <p>
              <CheckBox
                context={this.props.context}
                index={this.state.index}
                name="portfolio"
                value={resumes[this.state.index] ? resumes[this.state.index].links.portfolio : null}
              />{" "}
              {userInfo.links.portfolio}
            </p>
            {/* </Container> */}
            {/* <Divider className="divider-div" /> */}
            {/* <Container
              textAlign="center"
              id="summary"
              className="summarySection"
            > */}
            <h3>Summary</h3>
            <SummaryDropdown
              context={this.props.context}
              data={userInfo}
              value={resumes[this.state.index] ? resumes[this.state.index].sections.summary.filter(
                summary => summary.value === true
              ) : null}
              index={this.state.index}
            />
            {/* </Container> */}
            {/* <Divider className="divider-div" /> */}
            {/* <Container textAlign="center" className="skillsSection"> */}
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
                        resumes[this.state.index].sections.skills[index] ? resumes[this.state.index].sections.skills[index].value : null
                      }
                      index={this.state.index}
                    />
                    {content.content}
                  </p>
                </div>
              );
            })}
            {/* </Container> */}
            {/* <Divider className="divider-div" /> */}
            {/* <Container textAlign="center" className="experienceSection"> */}
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
                            resumes[this.state.index].sections.experience[index] ? resumes[this.state.index].sections.experience[index]
                              .value : null
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
            {/* </Container> */}
            {/* <Divider className="divider-div" /> */}
            {/* <Container textAlign="center" className="educationSection"> */}
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
                            resumes[this.state.index].sections.education[index] ? resumes[this.state.index].sections.education[index]
                              .value : null
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
            {/* </Container> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Templates;
