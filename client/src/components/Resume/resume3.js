import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import { FormGroup } from "reactstrap";
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

        <Navbar context={this.props.context}/>
        <div className="component-div row">
          <Sidebar context={this.props.context} />
          <div className="resume page-div col">
            <div className="resume title-div">
              <h4 className="page-header"style={{fontSize: "1.5rem", paddingTop: "0"}}>Elegant</h4>
            <PDF />
            </div>
            <form className="template1" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="left-column">
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
                  <FormGroup textalign="center" className="contactSection">
                    <h5 className="subtitle" style={{paddingTop: "1rem"}}>Contact Details</h5>
                    <a href={`mailto:${userInfo.email}`}>
                      <p className="contact-section"  style={{fontSize: "0.6rem"}}>  {userInfo.email}</p>
                    </a>
                    <p className="contact-section"  style={{fontSize: "0.6rem"}}>{userInfo.location}</p>
                    <p className="contact-section"  style={{fontSize: "0.6rem"}}>{userInfo.phonenumber}</p>
                    <div className="contact-section" style={{fontSize: "0.55rem"}}>
                      {resumes[this.state.index].links.linkedin ? (
                        <p>{userInfo.links.linkedin}</p>
                      ) : null}
                    </div>
                    <div className="contact-section"  style={{fontSize: "0.55rem"}}>
                      {resumes[this.state.index].links.github ? (
                        <p>{userInfo.links.github}</p>
                      ) : null}
                    </div>
                    <div className="contact-section"  style={{fontSize: "0.55rem"}}>
                      {resumes[this.state.index].links.portfolio ? (
                        <p>{userInfo.links.portfolio}</p>
                      ) : null}
                    </div>
                  </FormGroup>
                </div>
                <div className="col">
                  <div style={{ textAlign: "center" }} className="titleSection">
                    <h4>
                      {userInfo.name.firstname} {userInfo.name.lastname}
                    </h4>
                    {userInfo.title.map((item, index) => {
                      return resumes[this.state.index].title[index].value ? (
                        <p key={item._id}>{item.content}</p>
                      ) : null;
                    })}
                  </div>
                  <Divider className="divider-div" />
                  {summaryLength.length > 0 ? (
                    <FormGroup
                      textalign="center"
                      id="summary"
                      className="summarySection"
                    >
                      <h5 className="subtitle" >Summary</h5>
                      {userInfo.summary.map((item, index) => {
                        return resumes[this.state.index].sections.summary[
                          index
                        ].value ? (
                          <p key={item._id}  style={{fontSize: "0.6rem"}}>{item.content}</p>
                        ) : null;
                      })}
                      <Divider className="divider-div" />
                    </FormGroup>
                  ) : null}
                  {skillsLength.length > 0 ? (
                    <FormGroup textalign="center" className="skillsSection">
                      <h5 className="subtitle">Skills</h5>
                      {userInfo.skills.map((content, index) => {
                        return resumes[this.state.index].sections.skills[
                          index
                        ].value ? (
                          <div key={index} >
                            <p style={{margin: "0.5rem", fontSize: "0.6rem"}}>{content.content}</p>
                          </div>
                        ) : null;
                      })}
                      <Divider className="divider-div" />
                    </FormGroup>
                  ) : null}
                  {experienceLength.length > 0 ? (
                    <FormGroup textalign="center" className="experienceSection" >
                      <h5 className="subtitle">Experience</h5>
                      {experience.map((content, index) => {
                        let from = moment(content.from).format("MMM YYYY");
                        let to = moment(content.to).format("MMM YYYY");
                        return resumes[this.state.index].sections.experience[
                          index
                        ].value ? (
                          <div key={index}  style={{fontSize: "0.6rem"}}>
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
                    </FormGroup>
                  ) : null}
                  {educationLength.length > 0 ? (
                    <FormGroup textalign="center" className="educationSection">
                      <h5 className="subtitle">Education</h5>
                      {education.map((content, index) => {
                        let from = moment(content.from).format("MMM YYYY");
                        let to = moment(content.to).format("MMM YYYY");
                        return resumes[this.state.index].sections.education[
                          index
                        ].value ? (
                          <div key={index}  style={{fontSize: "0.6rem"}}>
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

export default ResumeThree;
