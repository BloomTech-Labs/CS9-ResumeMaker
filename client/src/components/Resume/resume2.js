import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import { FormGroup } from "reactstrap";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import Navbar from "../SubComponents/Navbar/navbar";
import "../Templates/template2.css";
import { Link } from "react-router-dom";
import SummaryDropdown from "../Templates/TemplateClassFunctions/summaryDropdown";
import TitleDropdown from "../Templates/TemplateClassFunctions/titleDropdown";

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

export class ResumeTwo extends Component {
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
                                <TitleDropdown
                                    context={this.props.context}
                                    data={userInfo}
                                    value={resumes[resumes.length - 1].title.filter(title => title.value === true)}
                                    index={resumes.length - 1}
                                />
                            </div>
                            <Divider className="divider-div" />
                            <Container
                                textAlign="center"
                                id="summary"
                                className="summarySection"
                            >
                                <h3 className="subtitle">Summary</h3>
                                <SummaryDropdown
                                    context={this.props.context}
                                    data={userInfo}
                                    value={resumes[resumes.length - 1].sections.summary.filter(summary => summary.value === true)}
                                    index={resumes.length - 1}
                                />
                            </Container>
                            <Divider className="divider-div" />
                            <div className="row">
                                <div className="col">
                                    <FormGroup textAlign="center" className="contactSection">
                                        <h3 className="subtitle">Contact Details</h3>
                                        <a href={`mailto:${userInfo.email}`}>
                                            <p> {userInfo.email}</p>
                                        </a>
                                        <p>{userInfo.location}</p>
                                        <p>{userInfo.phonenumber}</p>
                                        <p>
                                            <CheckBox
                                                context={this.props.context}
                                                index={resumes.length - 1}
                                                name="linkedin"
                                                value={
                                                    resumes[resumes.length - 1].links.linkedin.value
                                                }
                                            />
                                            {userInfo.links.linkedin}
                                        </p>
                                        <p>
                                            <CheckBox
                                                context={this.props.context}
                                                index={resumes.length - 1}
                                                name="github"
                                                value={
                                                    resumes[resumes.length - 1].links.github.value
                                                }
                                            /> {userInfo.links.github}
                                        </p>
                                        <p>
                                            <CheckBox
                                                context={this.props.context}
                                                index={resumes.length - 1}
                                                name="portfolio"
                                                value={resumes[resumes.length - 1].links.portfolio.value}
                                            /> {userInfo.links.portfolio}
                                        </p>
                                    </FormGroup>
                                    <Divider className="divider-div" />
                                    <FormGroup textAlign="center" className="educationSection">
                                        <h3 className="subtitle">Education</h3>
                                        {education.map((content, index) => {
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
                                                            name="skills"
                                                            value={
                                                                resumes[resumes.length - 1].sections.skills[
                                                                    index
                                                                ].value
                                                            }
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

export default ResumeTwo;