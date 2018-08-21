import React, { Component } from "react";
import Sidebar from "../subComponents/sidebar";
import Navbar from "../subComponents/navbar";

export class TemplateOne extends Component {
  render() {
    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;
console.log(userInfo)
    return (
      <div>
        <Navbar
          breadcrumbs={[
            { link: "/", title: "Home" },
            { link: "/templates", title: "Templates" },
            { link: "/templates/template-1", title: "Template One" }
          ]}
        />
        <div className="component-div">
          <Sidebar />
          <div className="border page-div">
          <div className="title-div">
            <h1>Template 1</h1>
            <section id="about">
              <div className="row">
                <div className="two columns">
                  {/* <img className="profile-pic" src={picture} alt={name} />
                  <h3> profile pic will go here </h3> */}
                </div>

                <div className="row">
                  <div className="names">
                    <span>
                      John Doe
                      {userInfo.firstName} {userInfo.lastName}
                    
                    </span>
                    <span>{userInfo.title}</span>
                  </div>
                  <div className="columns contact-details">
                    <h2>Contact Details</h2>
                    <p className="location">
                      <span>{userInfo.location}</span>
                    </p>
                    <p>
                      <a href={`mailto:${userInfo.email}`}>
                        <span>{userInfo.email}</span>
                      </a>
                      <span>{userInfo.phoneNumber}</span>
                    </p>
                  </div>
                </div>
                <div className="blurb">
                  {userInfo.summary}
                </div>
              </div>
            </section>
            <section id="experience">
              <div className="experience">
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
                      <h3>{content.description} </h3>
                    </div>
                  );
                })}
              </div>
            </section>
            <section id="education">
              <div className="education">
                {education.map(function(content, index) {
                  return (
                    <div key={index}>
                      <p>{content.school} </p>
                      <p>{content.location}</p>
                      <p>
                        {content.degree} {content.field}
                      </p>
                      <p>
                        {content.from} - {content.to}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
            <section id="skills">
              <div className="skills">
                {userInfo.skills.map((content, index) =>
                      <div key={index}>
                      <p>{content}</p>
                      </div>
                  )}
              </div>
            </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TemplateOne;
