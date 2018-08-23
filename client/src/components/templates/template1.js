import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";
import { fromByteArray } from "ipaddr.js";
import "./template1.css";
import { Link } from "react-router-dom";

export class TemplateOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  // getInitialState(e) {
  //   return { isSelected: this.props.data.isSelected };
  // }
  handleChange = e => {
    var selected = !this.state.isSelected;
    this.setState({ isSelected: selected });
  };

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
    console.log(userInfo);
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" },
            { link: "/templates/template-1", title: "Template One" }
          ]}
        />

        <div className="page-div">
          <Sidebar />
          <div className="component-div d-flex">
            <h1>Template One</h1>
            <form className="template1" onSubmit={this.handleSubmit}>
              <Container textAlign="center" className="titleSection">
                <h2>
                  David Hemsworth
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <h4>
                  Real Estate Developer
                  {userInfo.title}
                </h4>
              </Container>
              <Divider className="divider-div"/>
              <Container textAlign="center" className="contactSection">
                <h3>Contact Details</h3>
                <a href={`mailto:${userInfo.email}`}>
                  <p>{userInfo.email}</p>
                </a>
                <p>{userInfo.location}</p>

                <p>{userInfo.phoneNumber}</p>
              </Container>
              <Divider className="divider-div"/>
              <Container
                textAlign="center"
                id="summary"
                className="summarySection"
              >
                <h3>Summary</h3>
                <p>{userInfo.summary}</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </Container>
              <Divider className="divider-div"/>
              <Container textAlign="center" className="experienceSection">
                <h3>Experience</h3>
                <h5>Mitchel Design</h5>
                <p> High in fiber and good for your heart, Veggie Ipsum delivers 
                  the most organic, hand-picked, lorem ipsum placeholder 
                  text right to your door (or browser... I guess).</p>
                  <p>2003-2009</p>
                  <h4>Bjarko Serra Architects</h4>
                <p> High in fiber and good for your heart, Veggie Ipsum delivers 
                  the most organic, hand-picked, lorem ipsum placeholder 
                  text right to your door (or browser... I guess).</p>
                  <p>2009-2018</p>
                {experience.map(function(content, index) {
                  return (
                    <div key={index}>
                      {console.log(content)}
                      <p>{content.title} </p>
                      <p>{content.company}</p>
                      <p>{content.location}</p>
                      <p>
                        {content.from} - {content.to}
                      </p>
                      <p>{content.description} </p>
                    </div>
                  );
                })}
              </Container>
              <Divider className="divider-div"/>
              <Container textAlign="center" className="educationSection">
                <h3>Education</h3>
                <p> Lambda Coding Academy -2018</p>
                <p>
                  Master’s Degree of Science in Biology
                  <br /> University of St. Joseph-2016
                </p>
                <p>
                  Bachelor of Science in Biology <br /> Gonzaga University-2012
                </p>

                {education.map(function(content, index) {
                  return (
                    <div key={index}>
                      <h3>{content.school} </h3>
                      <p>{content.location}</p>
                      <p>
                        {content.degree} {content.field}{" "}
                      </p>
                      <p>
                        {content.from} - {content.to}
                      </p>
                    </div>
                  );
                })}
              </Container>
              <Divider className="divider-div" />
              <Container textAlign="center" className="skillsSection">
                <h3>Skills</h3>
                <p>AutoCAD</p>
                <p>Quickbooks</p>
                <p>Speed Reading</p>
                <p>Spanish Speaking</p>
                {userInfo.skills.map((content, index) => (
                  <div key={index}>
                    <p>{content}</p>
                    <input
                      type="checkbox"
                      checked={this.state.isSelected}
                      onClick={this.handleChange}
                    />{" "}
                  </div>
                ))}
              </Container>
              <Divider className="divider-div"/>
              <Link to="/resumes" className="sidebar-button" type="submit">
                {" "}
                Add Resume
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TemplateOne;
