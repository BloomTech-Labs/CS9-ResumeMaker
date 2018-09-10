import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import PDF from "../PDF/PDF";

export class ResumeThree extends Component {
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
    if (
      !this.props.context.userInfo.resumes.length ||
      this.props.context.userInfo.resumes[0] === null
    ) {
      console.log(
        "You probably had an error, which redirected you instead of crashing."
      );
      return <Redirect to="/resumes" />;
    }

    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
    const resumes = this.props.context.userInfo.resumes;
    const summaryLength = userInfo.summary.filter((item, index) => {
      return resumes[this.state.index].sections.summary[index].value;
    });
    const skillsLength = userInfo.skills.filter((item, index) => {
      return resumes[this.state.index].sections.skills[index].value;
    });
    const educationLength = userInfo.education.filter((item, index) => {
      return resumes[this.state.index].sections.education[index].value;
    });
    const experienceLength = userInfo.experience.filter((item, index) => {
      return resumes[this.state.index].sections.experience[index].value;
    });

    return (
      <div>
        <Navbar context={this.props.context} />
        <div className="component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div page-container-div">
            <div className="resume title-div">
              <h4 className="resume page-header">Elegant</h4>
              <PDF name="template3" />
            </div>
            <div className="template3">
              <div className="row">
                <div className="col-3 left-column">
                  {/* <a
                    href="https://www.freeiconspng.com/img/37126"
                    title="Image from freeiconspng.com"
                  >
                    <img
                      src="https://www.freeiconspng.com/uploads/logo-lion-head-png-8.png"
                      className="logo"
                      alt="logo lion head png"
                    />
                  </a> */}
                  <Container textalign="center" className="contactSection">
                    <h5 className="subtitle" style={{ paddingTop: "1rem" }}>
                      Contact Details
                    </h5>
                    <a href={`mailto:${userInfo.email}`}>
                      <p className="contact-resume3-section"> {userInfo.email}</p>
                    </a>
                    <p className="contact-resume3-section">{userInfo.location}</p>
                    <p className="contact-resume3-section">{userInfo.phonenumber}</p>
                    <div className="contact-resume3-section">
                      {resumes[this.state.index].links.linkedin ? (
                        <p>{userInfo.links.linkedin}</p>
                      ) : null}
                    </div>
                    <div className="contact-resume3-section">
                      {resumes[this.state.index].links.github ? (
                        <p>{userInfo.links.github}</p>
                      ) : null}
                    </div>
                    <div className="contact-resume3-section">
                      {resumes[this.state.index].links.portfolio ? (
                        <p>{userInfo.links.portfolio}</p>
                      ) : null}
                    </div>
                  </Container>
                </div>
                <div className="col-9">
                  <div className="titleSection">
                    <h4>
                      {userInfo.name.firstname} {userInfo.name.lastname}
                    </h4>
                    {userInfo.title.map((item, index) => {
                      if (
                        resumes[this.state.index].title[index].value === true
                      ) {
                        return <p key={item._id}>{item.content}</p>;
                      } else return null;
                    })}
                  </div>
                  <Divider className="divider-div" />
                  {summaryLength.length > 0 ? (
                    <div>
                      <Container
                        textalign="center"
                        id="summary"
                        className="summarySection"
                      >
                        <h5 className="subtitle">Summary</h5>
                        {userInfo.summary.map((item, index) => {
                          return resumes[this.state.index].sections.summary[index].value ? (
                            <p key={item._id}>{item.content}</p>
                          ) : null;
                        })}
                        <Divider className="divider-div" />
                      </Container>
                    </div>
                  ) : null}
                  {skillsLength.length > 0 ? (
                    <Container textalign="center" className="skillsSection">
                      <h5 className="subtitle">Skills</h5>
                      {userInfo.skills.map((content, index) => {
                        return resumes[this.state.index].sections.skills[index].value ? (
                          <div key={content._id}>
                            <b>{content.groupname}</b>
                            <p>{content.content}</p>
                          </div>
                        ) : null;
                      })}
                      <Divider className="divider-div" />
                    </Container>
                  ) : null}
                  {experienceLength.length > 0 ? (
                    <Container textalign="center" className="experienceSection">
                      <h5 className="subtitle">Experience</h5>
                      {experience.map((content, index) => {
                        let from = moment(content.from).format("MMM YYYY");
                        let to = moment(content.to).format("MMM YYYY");
                        return resumes[this.state.index].sections.experience[index].value ? (
                          <div key={content._id}>
                            <h6>{content.company} </h6>
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
                      <Divider className="divider-div" />
                    </Container>
                  ) : null}
                  {educationLength.length > 0 ? (
                    <Container textalign="center" className="educationSection">
                      <h5 className="subtitle">Education</h5>
                      {education.map((content, index) => {
                        let from = moment(content.from).format("MMM YYYY");
                        let to = moment(content.to).format("MMM YYYY");
                        return resumes[this.state.index].sections.education[index].value ? (
                          <div key={content._id}>
                            <h6>
                              {content.degree} in {content.fieldofstudy}{" "}
                            </h6>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeThree;
