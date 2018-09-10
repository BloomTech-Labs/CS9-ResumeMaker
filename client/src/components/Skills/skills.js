import React, { Component } from "react";

import Navbar from "../SubComponents/Navbar/navbar";
import Sidebar from "../SubComponents/Sidebar/sidebar";
import {
  Container,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

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

  componentDidUpdate = () => {
    console.log("ComponentDidUpdate");
    console.log(this.state.skills + "=?" + this.props.context.userInfo.skills)
    if (
      this.state.skills !== this.props.context.userInfo.skills &&
      this.props.context.userInfo.auth === true
    ) {
      this.componentDidMount();
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

  handleSubmit = (action) => {
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
        console.log("oops", err.message);
      });
  };

  render() {
    return (
      <div>
        <Navbar context={this.props.context} />
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
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
              Please enter your skills under skills under skill group headers. On the bottom you can add new skill groups.
            </p>

            <Container className="skills-containment-div">
              {this.state.skills.map((element, index) => {
                return (
                  <Form
                    className="skillgroup"
                    key={element._id ? element._id : element.groupname + index}
                  >
                    <FormGroup row>
                      <Col>
                        <Input
                          className="groupname-input"
                          id={`skills`}
                          name="groupname"
                          placeholder="Group Name"
                          // size="sm"
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
                          className="skills-input"
                          id={`skills`}
                          name="content"
                          placeholder="Skill 1, skill 2, skill 3..."
                          type="textarea submit"
                          // size="sm"
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
              {/* <Button color="primary" onClick={() => this.handleSubmit("edit")}>
                Submit
              </Button> */}
              <div className="groupname-input skillgroup skillgroup-input">
                <FormGroup className="">
                  <Label>New Skill Group</Label>
                  <Input
                    id="newSkill"
                    value={this.state.newSkill}
                    onChange={this.newSkillChange}
                  />
                </FormGroup>
                <Button
                  color="primary"
                  onClick={() => this.handleSubmit("add")}
                >
                  Submit
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
