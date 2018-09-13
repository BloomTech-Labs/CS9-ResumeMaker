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
    if (this.props.context.userInfo.auth !== true) {
      //future home of login automatically on refresh or revisit
    } else {
      // This automatically updates the state properties with userInfo ones, but they have to be in the same format/names as userInfo uses!
      this.setState(
        this.augmentObject(this.state.skills, this.props.context.userInfo.skills)
      );
    }
  };
  
  componentDidUpdate = () => {
    if (
      this.state.skills !== this.props.context.userInfo.skills &&
      this.props.context.userInfo.auth === true
    ) {
      this.setState({ skills: this.props.context.userInfo.skills });
    }
  };

  augmentObject = (initObj, modObj) => {
    for (let prop in initObj) {
      if (modObj[prop]) {
        let val = modObj[prop];
        if (typeof val === "object" && typeof initObj[prop] === "object")
          this.augmentObject(initObj[prop], val);
        else initObj[prop] = val;
      }
    }
    return initObj;
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
        this.props.context.actions.setLogin(response.data, true);
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
        this.props.context.actions.setLogin(response.data, true);
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
                  <React.Fragment>
                  <h5>Skill Group - {this.state.skills[index].groupname} </h5>
                  <Form
                    className="skillgroup"
                    key={element._id ? element._id : element.groupname + index}
                  >
                    <FormGroup row>
                      <Col>
                        <Input
                          style={{
                            height: "2rem",
                            fontSize: ".85rem",
                            fontWeight: "550",
                            width: "20%"
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
                      <button
                        className="close"
                        aria-label="Delete"
                        onClick={() => this.handleDelete(index, "skills")}
                        >
                        <span aria-hidden="true" style={{ color: "red" }}>
                          &times;
                        </span>
                      </button>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <Input
                          style={{ height: "2rem", fontSize: ".85rem", width: "80%" }}
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
              </React.Fragment>
                );
              })}
              <Form className="skillgroup">
                <FormGroup>
                  <Label
                    style={{
                      fontSize: "0.8rem"
                    }}
                  >
                    Add a New Skill Group:
                  </Label>
                  <Input
                    style={{
                      height: "2rem",
                      fontSize: ".85rem",
                      fontWeight: "550"
                    }}
                    className="groupname-input"
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
              </Form>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
