import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { FormGroup } from "reactstrap";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "./template2.css";
import { Link } from "react-router-dom";
import SummaryDropdown from "./TemplateClassFuntions/summaryDropdown";
import TitleDropdown from "./TemplateClassFuntions/titleDropdown";

class CheckBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.value
    };
    {
      console.log("value", this.props.value);
    }
  }

  toggle = () => {
    this.props.context.actions.setResumeItemState(
      this.props.index,
      this.props.name,
      this.props.id
    );
  };

  render() {
    return (
      <input
        type="checkbox"
        checked={this.props.value}
        onChange={this.toggle}
      />
    );
  }
}

export class TemplateTwo extends Component {
  constructor(props) {
    super(props);
  }

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
    const resumes = this.props.context.userInfo.resumes;

    console.log(userInfo);
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" },
            { link: "/Templates/template-2", title: "Template Two" }
          ]}
        />

        <div className="component-div">
          <Sidebar context={this.props.context} />
          <div className="page-div">
            <div className="d-block justify-content-center title-div">
              <h3 className="page-header">Modern</h3>
            </div>
            <form className="template1" onSubmit={this.handleSubmit}>
              <div textAlign="center" className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                <TitleDropdown data={userInfo} />
              </div>
              <Divider className="divider-div" />
              <Container
                textAlign="center"
                id="summary"
                className="summarySection"
              >
                <h3 className="subtitle">Summary</h3>
                <SummaryDropdown data={userInfo} />
              </Container>
              <Divider className="divider-div" />
              <div className="row">
                <div className="col">
                  <FormGroup textAlign="center" className="contactSection">
                    <h3 className="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p>
                        {" "}
                        <CheckBox /> {userInfo.email}
                      </p>
                    </a>
                    <p>
                      <CheckBox /> {userInfo.location}
                    </p>
                    <p>
                      <CheckBox /> {userInfo.phonenumber}
                    </p>
                    <p>
                      <CheckBox /> {userInfo.links.linkedin}
                    </p>
                    <p>
                      <CheckBox /> {userInfo.links.github}
                    </p>
                    <p>
                      <CheckBox /> {userInfo.links.portfolio}
                    </p>
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="educationSection">
                    <h3 className="subtitle">Education</h3>
                    {education.map((content, index) => {
                      return (
                        <div key={index}>
                          <h5>
                            <CheckBox /> {content.degree} in{" "}
                            {content.fieldofstudy}{" "}
                          </h5>
                          <p>{content.location}</p>
                          <p>
                            {content.school}
                            <br />
                            {content.from} - {content.to}
                          </p>
                        </div>
                      );
                    })}
                  </FormGroup>
                </div>
                <Divider className="divider-div" />
                <div className="col">
                  <FormGroup textAlign="center" className="skillsSection">
                    <h3 className="subtitle">Skills</h3>
                    {userInfo.skills.map((content, index) => {
                      return (
                        <div key={index}>
                          <p>
                            {" "}
                            <CheckBox
                              context={this.props.context}
                              id={content._id}
                              value={
                                resumes[resumes.length - 1].sections.skills[
                                  index
                                ].value
                              }
                              name="skills"
                              index={resumes.length - 1}
                            />
                            {content.content}
                          </p>
                        </div>
                      );
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="experienceSection">
                    <h3 className="subtitle">Experience</h3>
                    {experience.map((content, index) => {
                      return (
                        <div key={index}>
                          <h5>
                            {" "}
                            <CheckBox
                              context={this.props.context}
                              id={content._id}
                              value={
                                resumes[resumes.length - 1].sections.experience[
                                  index
                                ].value
                              }
                              name="experience"
                              index={resumes.length - 1}
                            />{" "}
                            {content.company}{" "}
                          </h5>
                          <p>
                            {content.title}
                            <br />
                            {content.location}
                            <br />
                            {content.from} - {content.to}
                          </p>
                          <p>{content.description} </p>
                        </div>
                      );
                    })}
                  </FormGroup>
                </div>
              </div>
            </form>
            <div className="justify-content-center">
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
