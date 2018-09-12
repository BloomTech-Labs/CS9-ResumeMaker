import React, { Component } from "react";

import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Container, Col, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";
const urls = require("../../config/config.json");

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSkill: "",
      skills: []
    };
  }
  componentDidMount = () => {
    window.scrollTo(0, 0);
  };

  componentDidUpdate = () => {
    if (
      this.state.skills !== this.props.context.userInfo.skills &&
      this.props.context.userInfo.auth === true
    ) {
      this.setState({ skills: this.props.context.userInfo.skills });
    }
  };

  handleChange = (e, index) => {
    const eName = e.target.name;
    const value = e.target.value;
    let newState = this.state.skills;
    newState[index][eName] = value;
    this.setState({ skills: newState });
  };

  newSkillChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleDelete = (index, elementName) => {
    this.props.context.actions.removeElement(index, elementName);
    const tempObj = {
      "sections.skills": this.props.context.userInfo.skills
    };
    axios
      .put(
        `${urls[urls.basePath]}/users/info/` + this.props.context.userInfo.id,
        tempObj,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        this.props.context.actions.setLogin(response.data);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleSubmit = action => {
    if (action === "add") {
      this.props.context.actions.addElement("skills", {
        groupname: this.state.newSkill
      });
    } else if (action === "edit") {
      this.props.context.actions.setSingleElement("skills", this.state.skills);
    }

    this.setState({ newSkill: "" });

    const tempObj = {
      "sections.skills": this.props.context.userInfo.skills
    };

    axios
      .put(
        `${urls[urls.basePath]}/users/info/` + this.props.context.userInfo.id,
        tempObj,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        // This updates context with the new user info from server
        this.props.context.actions.setLogin(response.data);
      })
      .catch(err => {
        console.log("Error", err.message);
      });
  };

  render() {
    return (
      <div>
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col" style={{ paddingRight: "1rem" }}>
            <div className="link-hide">
              <h4>SKILLS </h4>
            </div>
            <p
              style={{
                fontSize: "0.7rem",
                paddingLeft: ".6rem",
                borderTop: "1px solid black",
                width: "100%"
              }}
            >
              Enter a Skill Group Header, press ENTER, and then your associated
              skills. Press ENTER to save any changes. New Skill Groups can be
              added and deleted as needed.
            </p>

            <Container className="skills-containment-div">
              {this.state.skills.map((element, index) => {
                return (
                  <Form
                    className="skillgroup"
                    key={element._id ? element._id : element.groupname + index}
                  >
                    <button
                      className="close"
                      aria-label="Delete"
                      onClick={() => this.handleDelete(index, "skills")}
                    >
                      <span aria-hidden="true" style={{ color: "red" }}>
                        &times;
                      </span>
                    </button>
                    <FormGroup row>
                      <Col>
                        <Input
                          style={{
                            height: "2rem",
                            fontSize: ".85rem",
                            fontWeight: "550"
                          }}
                          className="groupname-input"
                          id={`skills`}
                          name="groupname"
                          placeholder="Group Name"
                          value={this.state.skills[index].groupname}
                          onChange={e => this.handleChange(e, index)}
                          onKeyDown={event => {
                            if (event.key === "Enter") {
                              event.target.blur();
                              event.preventDefault();
                              event.stopPropagation();
                              this.handleSubmit("edit");
                            }
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <Input
                          style={{ height: "2rem", fontSize: ".85rem" }}
                          className="skills-input"
                          id={`skills`}
                          name="content"
                          placeholder="Skill 1, skill 2, skill 3..."
                          type="textarea submit"
                          value={this.state.skills[index].content}
                          onChange={e => this.handleChange(e, index)}
                          onKeyDown={event => {
                            if (event.key === "Enter") {
                              event.target.blur();
                              event.preventDefault();
                              event.stopPropagation();
                              this.handleSubmit("edit");
                            }
                          }}
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                );
              })}
              <div className="skillgroup-input">
                <FormGroup>
                  <Label
                    style={{
                      fontSize: "0.8rem"
                    }}
                  >
                    Add a New Skill Group:
                  </Label>
                  <Input
                    id="newSkill"
                    bssize="sm"
                    value={this.state.newSkill}
                    onChange={this.newSkillChange}
                    onKeyDown={event => {
                      if (event.key === "Enter") {
                        event.target.blur();
                        event.preventDefault();
                        event.stopPropagation();
                        this.handleSubmit("add");
                      }
                    }}
                  />
                </FormGroup>
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
