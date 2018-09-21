import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import PDF from "../PDF/PDF";

export class ResumeTwo extends Component {
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

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    if (!this.props.context.userInfo.auth) {
      return <Redirect to="/templates" />;
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
      return <Redirect to="/templates" />;
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
      <div className="entire-page">
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="page-div col">
            <div className="resume section-title">
              <h4>Modern</h4>
              <PDF name="template2"/>
            </div>
            <div className="template2">
              <div style={{ textAlign: "center" }} className="titleSection">
                <h2>
                  {userInfo.name.firstname} {userInfo.name.lastname}
                </h2>
                {userInfo.title.map((item, index) => {
                  if (resumes[this.state.index].title[index].value === true) {
                    return <h4 key={item._id} style={{textTransform: "uppercase"}}>{item.content}</h4>;
                  } else return null;
                })}
              </div>

               {summaryLength.length > 0 ? (
                  <div
                    textalign="center"
                    id="summary"
                    className="summarySection"
                    style={{padding: "0"}}
                  >
                    <Divider className="divider-div" style={{padding: "0"}}/>
                    {/* <h4 className="subtitle">Summary</h4> */}
                    {userInfo.summary.map((item, index) => {
                      return resumes[this.state.index].sections.summary[index]
                        .value ? (
                        <p key={item._id}>{item.content}</p>
                      ) : null;
                    })}
                  </div>
              ) : null}

              <Divider className="divider-div" />
              <div className="row">
                <div className="col-5">
                  <Container textalign="center" className="contactSection">
                    <h4 className="subtitle">Contact Details</h4>
                    <a href={`mailto:${userInfo.email}`}>
                      <p> {userInfo.email}</p>
                    </a>
                    <p>{userInfo.location}</p>
                    <p>{userInfo.phonenumber}</p>
                    {resumes[this.state.index].links.linkedin ? (
                      <p>{userInfo.links.linkedin}</p>
                    ) : null}
                    {resumes[this.state.index].links.github ? (
                      <p>{userInfo.links.github}</p>
                    ) : null}
                    {resumes[this.state.index].links.portfolio ? (
                      <p>{userInfo.links.portfolio}</p>
                    ) : null}
                  </Container>

                  {educationLength.length > 0 ? (
                    <Container textalign="center" className="educationSection">
                      <Divider className="divider-div" />
                      <h4 className="subtitle">Education</h4>
                      {education.map((content, index) => {
                        let from = moment(content.from).format("MMM YYYY");
                        let to = moment(content.to).format("MMM YYYY");
                        return resumes[this.state.index].sections.education[
                          index
                        ].value ? (
                          <div key={content._id}>
                            <h6 style={{textTransform: "uppercase"}}>
                              {content.degree}{content.fieldofstudy !== "" ? " in " + content.fieldofstudy : null}
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
                <Divider className="divider-div" />
                <div className="col-7">
                  {skillsLength.length > 0 ? (
                    <Container textalign="center" className="skillsSection">
                      <h4 className="subtitle">Skills</h4>
                      {userInfo.skills.map((content, index) => {
                        return resumes[this.state.index].sections.skills[index]
                          .value ? (
                          <div key={content._id}>
                            <p>{content.groupname}:</p>
                            <p>{content.content}</p>
                          </div>
                        ) : null;
                      })}
                      <Divider className="divider-div" />
                    </Container>
                  ) : null}

                  {experienceLength.length > 0 ? (
                    <Container textalign="center" className="experienceSection">
                      <h4 className="subtitle">Experience</h4>
                      {experience.map((content, index) => {
                        let from = moment(content.from).format("MMM YYYY");
                        let to = moment(content.to).format("MMM YYYY");
                        return resumes[this.state.index].sections.experience[
                          index
                        ].value ? (
                          <div key={index}>
                            <h5 style={{textTransform: "uppercase"}}>{content.title} </h5>
                            <p>
                              {content.company}
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

export default ResumeTwo;
