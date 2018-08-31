import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "../Templates/template1.css";
import { Link } from "react-router-dom";
import SummaryDropdown from "../Templates/TemplateClassFunctions/summaryDropdown";
import TitleDropdown from "../Templates/TemplateClassFunctions/titleDropdown";

export class ResumeOne extends Component {
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

    onCreate = () => {
        this.props.context.actions.createResume();
    };

    componentWillMount() {
        // this.onCreate();
    }

    render() {
        const userInfo = this.props.context.userInfo;
        const education = this.props.context.userInfo.education;
        const experience = this.props.context.userInfo.experience;
        // const summary = this.props.context.userInfo.summary;
        // const title = this.props.context.userInfo.title;
        const resumes = this.props.context.userInfo.resumes;

        return (
            <div>
                <Navbar
                    context={this.props.context}
                    breadcrumbs={[
                        { link: "/", title: "Home" },
                        { link: "/templates", title: "Templates" },
                        { link: "/Templates/template-1", title: "Template One" }
                    ]}
                />

                <div className="component-div">
                    <Sidebar context={this.props.context} />
                    <div className="page-div">
                        <div className="d-block justify-content-center title-div">
                            <h3 className="page-header">Traditional</h3>
                        </div>
                        <form className="template1" onSubmit={this.handleSubmit}>
                            <Container textAlign="center" className="titleSection">
                                <h2>
                                    {userInfo.name.firstname} {userInfo.name.lastname}
                                </h2>
                                {userInfo.title.map((item, index) => {
                                    return resumes[resumes.length - 1].title[index].value ? <p>{item.content}</p> : null
                                })}
                            </Container>
                            <Divider className="divider-div" />
                            <Container textAlign="center" className="contactSection">
                                <h3>Contact Details</h3>
                                <a href={`mailto:${userInfo.email}`}>
                                    <p> {userInfo.email}</p>
                                </a>
                                <p>{userInfo.location}</p>
                                <p>{userInfo.phonenumber}</p>
                                <p>
                                    {resumes[resumes.length - 1].links.linkedin ? <p>{userInfo.links.linkedin}</p> : null}
                                    {resumes[resumes.length - 1].links.github ? <p>{userInfo.links.github}</p> : null}
                                    {resumes[resumes.length - 1].links.portfolio ? <p>{userInfo.links.portfolio}</p> : null}
                                </p>

                            </Container>
                            <Divider className="divider-div" />
                            <Container
                                textAlign="center"
                                id="summary"
                                className="summarySection"
                            >
                                <h3>Summary</h3>
                                {userInfo.summary.map((item, index) => {
                                    return resumes[resumes.length - 1].sections.summary[index].value ? <p>{item.content}</p> : null
                                })}
                            </Container>
                            <Divider className="divider-div" />
                            <Container textAlign="center" className="skillsSection">
                                <h3>Skills</h3>
                                {userInfo.skills.map((content, index) => {
                                    return (
                                        resumes[resumes.length - 1].sections.skills[index].value ?
                                            <div key={index}>
                                                <p>
                                                    {" "}

                                                    {content.content}
                                                </p>
                                            </div>
                                            : null
                                    );
                                })}
                            </Container>
                            <Divider className="divider-div" />
                            <Container textAlign="center" className="experienceSection">
                                <h3>Experience</h3>
                                {experience.map((content, index) => {
                                    return (
                                        resumes[resumes.length - 1].sections.experience[index].value ?
                                            (<div key={index}>
                                                <h5>
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
                                            </div>) : (null)
                                    );
                                })}
                            </Container>
                            <Divider className="divider-div" />
                            <Container textAlign="center" className="educationSection">
                                <h3>Education</h3>
                                {education.map((content, index) => {
                                    return (
                                        resumes[resumes.length - 1].sections.education[index].value ?
                                            (<div key={index}>
                                                <h5>

                                                    {content.degree} in {content.fieldofstudy}{" "}
                                                </h5>
                                                <p>{content.location}</p>
                                                <p>
                                                    {content.school}
                                                    <br />
                                                    {content.from} - {content.to}
                                                </p>
                                            </div>) : null
                                    );
                                })}
                            </Container>
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

export default ResumeOne;
