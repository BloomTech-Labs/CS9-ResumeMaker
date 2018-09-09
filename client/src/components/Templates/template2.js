import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { FormGroup } from "reactstrap";
import { Redirect } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import SummaryDropdown from "./TemplateClassFunctions/summaryDropdown";
import TitleDropdown from "./TemplateClassFunctions/titleDropdown";
import CheckBox from "./TemplateClassFunctions/checkbox";
const urls = require("../../config/config.json");

class TemplateTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.context.userInfo.currentResume || 0
    };
  }

  componentWillMount() {
    if (this.props.context.userInfo.auth)
      this.props.context.actions.expandResumeIDs(this.props.context.userInfo.currentResume)
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleSubmit = event => {
    event.preventDefault();
    const tempObj = this.props.context.userInfo.resumes[
      this.props.context.userInfo.resumes.length - 1
    ];
    if (!tempObj["user"]) tempObj["user"] = this.props.context.userInfo.id;
    if (tempObj._id) {
      axios
        .put(
          `${urls[urls.basePath]}/resume/` +
            this.props.context.userInfo.resumes[
              this.props.context.userInfo.resumes.length - 1
            ]._id,
          tempObj,
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
    } else {
      axios
        .post(`${urls[urls.basePath]}/resume/`, tempObj, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          this.setState({ success: true });
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  onCreate = () => {
    this.props.context.actions.createResume();
  };

  render() {
    if (!this.props.context.userInfo.auth) {
      return <Redirect to="/templates" />;
    }
    if (this.state.success) {
      return <Redirect to="/resumes" />;
    }
    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    const resumes = this.props.context.userInfo.resumes;

    return (
      <div>
         <Navbar context={this.props.context}/>
        <div className="component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className="template title-div">
              <span className="template page-header"style={{fontSize: "1.5rem"}}>Modern</span>
              <button
              style={{width: "4rem", fontSize:".7rem"}}
                to="/resumes"
                className="save-button"
                type="submit"
                onClick={this.handleSubmit}
              >
                {" "}
                SAVE 
              </button>
            </div>
            <form className="template1">
              <div style={{ textAlign: "center" }} className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                <TitleDropdown
                  context={this.props.context}
                  data={userInfo}
                  value={resumes[resumes.length - 1].title.filter(
                    title => title.value === true
                  )}
                  index={resumes.length - 1}
                />
              </div>
              <Divider className="divider-div" />
              <Container
                textalign="center"
                id="summary"
                className="summarySection"
              >
                <h3 className="subtitle">Summary</h3>
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
              <div className="row">
                <div className="col">
                  <FormGroup textalign="center" className="contactSection">
                    <h3 className="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p> {userInfo.email}</p>
                    </a>
                    <div>
                  <div className="fa fa-mobile" aria-hidden="true" />
                  {" "}{userInfo.phonenumber}
                </div>
                <div>
                  <CheckBox
                    context={this.props.context}
                    index={resumes.length - 1}
                    name="linkedin"
                    value={resumes[resumes.length - 1].links.linkedin}
                  />{" "}
                  <div className={"fa fa-linkedin fa-sm"} />
                  {" "}{userInfo.links.linkedin}
                </div>
                <div>
                  <CheckBox
                    context={this.props.context}
                    index={resumes.length - 1}
                    name="github"
                    value={resumes[resumes.length - 1].links.github}
                  />{" "}
                  <div className="fa fa-github" aria-hidden="true" />
                  {" "}{userInfo.links.github}
                </div>
                <p>
                  <CheckBox
                    context={this.props.context}
                    index={resumes.length - 1}
                    name="portfolio"
                    value={resumes[resumes.length - 1].links.portfolio}
                  />{" "}
                  {userInfo.links.portfolio}
                </p>
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textalign="center" className="educationSection">
                    <h3 className="subtitle">Education</h3>
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
                            />{" "}
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
                  </FormGroup>
                </div>
                <Divider className="divider-div" />
                <div className="col">
                  <FormGroup textalign="center" className="skillsSection">
                    <h3 className="subtitle">Skills</h3>
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
                                resumes[resumes.length - 1].sections.skills[
                                  index
                                ].value
                              }
                              index={resumes.length - 1}
                            />{" "}
                            {content.content}
                          </p>
                        </div>
                      );
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textalign="center" className="experienceSection">
                    <h3 className="subtitle">Experience</h3>
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

export default TemplateTwo;
