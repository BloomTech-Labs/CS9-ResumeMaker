import React, { Component } from "react";

export class TemplateOne extends Component {
  render() {
    const userInfo = this.props.context.userInfo;
    const education = this.props.context.userInfo.education;
    const experience = this.props.context.userInfo.experience;

    return (
      <div>
        <section id="about">
          <div className="row">
            <div className="two columns">
              <img className="profile-pic" src={picture} alt={name} />
              <h3> profile pic will go here </h3>
            </div>

            <div className="row">
              <div className="names">
                <span>
                  {userInfo.firstName} {userInfo.lastName}
                </span>
                <span>{userInfo.title}</span>
              </div>
              <div className="columns contact-details">
                // <h2>Contact Details</h2>
                <p className="location">
                  <span>{userInfo.location}</span>
                </p>
                <p>
                  <a href={`mailto:${email}`}>
                    <span>{userInfo.email}</span>
                  </a>
                  <span>{userInfo.phoneNumber}</span>
                </p>
              </div>
            </div>
            <div className="blurb">
              {userInfo.summary.map(function(content, index) {
                return (
                  <div>
                    <p key={index}>{content}</p>
                    <h3> summary will go here </h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section id="experience">
          <div className="experience">
            {experience.map(function(content, index) {
              return (
                <div>
                  <p key={index}>{experience.title} </p>
                  <p>{experience.company}</p>
                  <p>{experience.location}</p>
                  <p>
                    {experience.from} - {experience.to}
                  </p>
                  <h3>{experience.description} </h3>
                </div>
              );
            })}
          </div>
        </section>
        <section id="education">
          <div className="education">
            {education.map(function(content, index) {
              return (
                <div>
                  <p key={index}>{education.school} </p>
                  <p>{education.location}</p>
                  <p>
                    {experience.degree} {experience.field}
                  </p>
                  <p>
                    {experience.from} - {experience.to}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
        <section id="skills">
          <div className="skills">
            {userInfo.skills.map(function(content, index) {
              return (
                <div>
                  <p key={index}>{content}</p>
                  <h3> skills will go here </h3>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  }
}

export default TemplateOne;
