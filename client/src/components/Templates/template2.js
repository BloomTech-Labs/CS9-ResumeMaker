import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { FormGroup } from "reactstrap";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "./template2.css";
import { Link } from "react-router-dom";
import SummaryDropdown from './TemplateClassFuntions/summaryDropdown';
import TitleDropdown from './TemplateClassFuntions/titleDropdown';
import CheckBox from './TemplateClassFuntions/checkbox';


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
    console.log(userInfo);
    return (
      <div>
        <Navbar
          context={this.props.context}
          breadcrumbs={[
            { link: "/"},
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
                <h3 class="subtitle">Summary</h3>
                <SummaryDropdown data={userInfo} />
              </Container>
              <Divider className="divider-div" />
              <div class="row">
                <div class="col">
                  <FormGroup textAlign="center" className="contactSection">
                    <h3 class="subtitle">Contact Details</h3>
                    <a href={`mailto:${userInfo.email}`}>
                      <p>
                        {" "}
                        <CheckBox /> {userInfo.email}
                      </p>
                    </a>
                    <p>
                  <CheckBox /> <i class="fa fa-globe" aria-hidden="true"/>{" "}{userInfo.location}
                </p>
                <p>
                  <CheckBox /> <i class="fa fa-mobile" aria-hidden="true"/>{" "}{userInfo.phonenumber}
                </p>
                <p>
                 <CheckBox /> <i className={"fa fa-linkedin fa-sm"}/>{" "}{userInfo.links.linkedin}
                 
                </p>
                <p>
                  <CheckBox /> <i class="fa fa-github" aria-hidden="true"/>{" "} {userInfo.links.github}
                </p>
                    <p>
                      <CheckBox /> {userInfo.links.portfolio}
                    </p>
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="educationSection">
                    <h3 class="subtitle">Education</h3>
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
                <div class="col">
                  <FormGroup textAlign="center" className="skillsSection">
                    <h3 class="subtitle">Skills</h3>
                    {userInfo.skills.map((content, index) => {
                      return (
                        <div key={index}>
                          <p>
                            <CheckBox /> {content.content}
                          </p>
                        </div>
                      );
                    })}
                  </FormGroup>
                  <Divider className="divider-div" />
                  <FormGroup textAlign="center" className="experienceSection">
                    <h3 class="subtitle">Experience</h3>
                    {experience.map((content, index) => {
                      return (
                        <div key={index}>
                          {console.log(content)}
                          <h5>
                            {" "}
                            <CheckBox /> {content.company}{" "}
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
            <div class="justify-content-center">
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
