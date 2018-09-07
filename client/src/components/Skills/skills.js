import React, { Component } from "react";

import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import Navbar from "../SubComponents/Navbar/navbar";import Sidebar from "../SubComponents/Sidebar/sidebar";
import { Link } from "react-router-dom";
import ItemCard from "../SubComponents/ItemCard/itemCard";
import "../CSS/component-general.css";

import axios from "axios";
const urls = require("../../config/config.json");

class Skills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSkillGroup: "",
      skillgroups: []
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
  }

  componentDidUpdate = () => {
    console.log("ComponentDidUpdate");
    if (this.state.skillgroups !== this.props.context.userInfo.skillgroups && this.props.context.userInfo.auth === true) {
      this.setState({ skillgroups: this.props.context.userInfo.skillgroups});
    }
  };

  onInputChange = (e, index) => {
    // this.setState({ [e.target.id]: e.target.value });
    const eName = e.target.id;
    const value = e.target.value;
    if (eName.includes("skillgroups")) {
      let newState = this.state.skillgroups;
      newState[index].content = value; 
      this.setState({ skillgroups: newState })
    } else {
      this.setState({ [eName]: value });
    }
  };

  handleSubmit = (action) => {
    this.setState({ newSkillGroup: "" })

    if(action === "add"){
      this.props.context.actions.addElement("skillgroups", { "groupname": this.state.newSkillGroup });
    } else if(action === "edit"){
      this.props.context.actions.setEntireElement("skillgroups", this.state.skillgroups);
    }

    const tempObj = {
      "sections.skillgroups": this.props.context.userInfo.skillgroups
    };
    
    axios
      .put(
        `${urls[urls.basePath]}/users/info/` + this.props.context.userInfo.id, tempObj,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        // This updates context with the new user info from server
        this.props.context.actions.setLogin(response.data.user);
      })
      .catch(err => {
        console.log("oops", err.message);
      });
  };

  render() {
    // console.log("CONTEXT IS THIS:", this.props.context.userInfo.skillgroups)
    // console.log("STATE IS THIS:", this.state)
    return (
      <div>
        <Navbar context={this.props.context}/>
        <div className="overall-component-div row">
          <Sidebar context={this.props.context} />
          <div className="title-div col">
            <div className="link-hide">
              <h1 style={{ fontWeight: "600" }}>
                SKILLS{" "}
                <Link
                  to={{
                    pathname: "/skills/create", // component being Linked to
                    state: { skillGroupIndex: false, skillIndex: false } // Setting Index passed into educationCreate component - false means new
                  }}
                >
                  <i className="fa fa-pencil fa-sm" />
                </Link>
              </h1>
            </div>
            <p>
              Please click the pencil to enter each of your work related skills.
            </p>
            <div className="skills-containment-div">
              {this.state.skillgroups.map((element, skillGroupIndex) => {
                return (
                  <div className="skillgroup" key={element._id ? element._id : element.groupname + skillGroupIndex}>
                    <b>{element.groupname}</b>
                    {element.content}
                    <FormGroup>
                      <Label>Skills</Label>
                      <Input
                        id={`skillgroups`}
                        size="sm"
                        value={this.state.skillgroups[skillGroupIndex].content}
                        onChange={(e) => this.onInputChange(e, skillGroupIndex)}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={() => this.handleSubmit("edit")}>
                      Submit
                    </Button>
                    {/* <Link
                      to={{
                        pathname: "/skills/create", // component being Linked to
                        state: { skillGroupIndex: skillGroupIndex, skillIndex: false } // Setting Index passed into educationCreate component - false means new
                      }}
                    >
                      <i className="fa fa-pencil fa-sm" />
                    </Link>
                    {element.skills ? element.skills.map((element, skillIndex) => {
                      return (
                        <ItemCard
                          linkTo="/skills"
                          elementName="skills"
                          putPath={`sections.skillgroups`}
                          skillGroupIndex={skillGroupIndex}
                          skillIndex={skillIndex}
                          key={element._id ? element._id : element.content + skillIndex}
                          content={element.content}
                          context={this.props.context}
                        />
                      )
                    }) : null} */}
                  </div>
                )
              })}
            </div>
            <div className="skillgroup-input">
              <FormGroup>
                <Label>New Skill Group</Label>
                <Input
                  id="newSkillGroup"
                  size="sm"
                  value={this.state.newSkillGroup}
                  onChange={this.onInputChange}
                />
              </FormGroup>
              <Button color="primary" onClick={() => this.handleSubmit("add")}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
