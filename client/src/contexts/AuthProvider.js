import React, { Component } from "react";

import axios from "axios";
const urls = require("../config/config.json");

export const AuthContext = React.createContext({});

class AuthProvider extends Component {
  state = {
    auth: false,
    username: "",
    email: "",
    name: {
      firstname: "",
      middlename: "",
      lastname: ""
    },
    title: [],
    phonenumber: "",
    links: [],
    education: [],
    experience: [],
    skills: [],
    summary: [],
    resumes: [],
    currentResume: 0
  };

  setLogout = () => {
    localStorage.removeItem("token");
    this.setState({
      auth: false,
      currentResume: 0,
      username: "",
      email: "",
      name: {
        firstname: "",
        middlename: "",
        lastname: ""
      },
      title: [],
      phonenumber: "",
      links: [],
      education: [],
      experience: [],
      skills: [],
      summary: []
    });
  };

  setLogin = userData => {
    this.setState({
      auth: true,
      currentresume: userData.currentresume ? userData.currentresume : 0,
      email: userData.email ? userData.email : "",
      name: {
        firstname: userData.name.firstname ? userData.name.firstname : "",
        middlename: userData.name.middlename ? userData.name.middlename : "",
        lastname: userData.name.lastname ? userData.name.lastname : ""
      },
      title: userData.title ? userData.title : [],
      links: userData.links ? userData.links : [],
      location: userData.location ? userData.location : "",
      phonenumber: userData.phonenumber ? userData.phonenumber : "",
      education: userData.sections.education ? userData.sections.education : [],
      experience: userData.sections.experience
        ? userData.sections.experience
        : [],
      skills: userData.sections.skills ? userData.sections.skills : [],
      summary: userData.sections.summary ? userData.sections.summary : [],
      username: userData.username ? userData.username : "",
      id: userData._id ? userData._id : null
    });
  };

  setResume = resumeData => {
    if (!resumeData.length && resumeData[0] === null) {
      this.createResume(true);
    } else {
      this.setState({
        resumes: resumeData
      });
    }
  };

  createResume = newResume => {
    let tempState = this.state.resumes;
    const tempObj = {
      value: false,
      links: { linkedin: false, github: false, portfolio: false },
      title: this.state.title.map(item => {
        return { _id: item._id, value: false };
      }),
      sections: {
        experience: this.state.experience.map(item => {
          return { _id: item._id, value: false };
        }),
        education: this.state.education.map(item => {
          return { _id: item._id, value: false };
        }),
        summary: this.state.summary.map(item => {
          return { _id: item._id, value: false };
        }),
        skills: this.state.skills.map(item => {
          return { _id: item._id, value: false };
        })
      }
    };
    if (newResume) {
      tempState = [];
      tempState.push(tempObj);
    } else tempState.push(tempObj);
    this.setState({ resumes: tempState });

    axios
      .post(`${urls[urls.basePath]}/resume/`, tempObj, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log(response.data.Resume._id);
        this.setState({ currentresume: response.data.Resume._id });
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  expandResumeIDs = index => {

    function findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }
    const tempObj = this.state.resumes[index];
    
    const expandSection = (section, resumeSection) => {

   
      // no .sections portion
      if (!resumeSection) {
        for (let item of this.state[section]) {
          let current = this.state.resumes[index][section].filter(
            resumeItem => resumeItem._id === item._id
          );
          current.length === 0
            ? tempObj[section].push({
                _id: item._id,
                value: false
              })
            : console.log();
        } // All items in context now have a resume counterpart
        console.log("Expanded Section", section )
        let loopVar = this.state.resumes[index][section].length;
        for (let i = 0; loopVar > i; i++) {
          if (
            findWithAttr(
              this.state[section],
              "_id",
              this.state.resumes[index][section][i]._id
            ) > -1
          ) {
          } else {
            tempObj[section].splice(i, 1);
            loopVar--;
            i--;
          }
        } // All items in resume that are not in context were deleted from resume
      } else {
        //.sections portion
        for (let item of this.state[section]) {
          let current = this.state.resumes[index].sections[section].filter(
            resumeItem => resumeItem._id === item._id
          );
          current.length === 0
            ? tempObj.sections[section].push({
                _id: item._id,
                value: false
              })
            : console.log();
        } // All items in context now have a resume counterpart
        let loopVar = this.state.resumes[index].sections[section].length;
        for (let i = 0; loopVar > i; i++) {
          if (
            findWithAttr(
              this.state[section],
              "_id",
              this.state.resumes[index].sections[section][i]._id
            ) > -1
          ) {
          } else {
            tempObj.sections[section].splice(i, 1);
            loopVar--;
            i--;
          }
        } // All items in resume that are not in context were deleted from resume
      }
    }
      this.state.resumes.forEach( () => {
      expandSection("title", false);
      expandSection("experience", true);
      expandSection("education", true);
      expandSection("summary", true);
      expandSection("skills", true);
    });

    this.setState({ ["resumes"[index]]: tempObj });
    const tempResume = this.state.resumes[index];

    if (!tempResume["user"]) tempResume["user"] = this.state.id;
    if (tempResume._id) {
      axios
        .put(
          `${urls[urls.basePath]}/resume/` +
          this.state.resumes[index]._id,
          tempResume,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        )
        .then(response => {
          console.log(response.data.resume._id);
          axios
            .put(
              `${urls[urls.basePath]}/users/info/${
              this.state.id
              }`,
              { currentresume: response.data.resume._id },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              }
            )
            .then(response => {
              this.setState({ success: true });
              console.log("Response: ", response.data.user.currentresume);
            })
            .catch(err => {
              console.log("err", err);
            });
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      axios
        .post(`${urls[urls.basePath]}/resume/`, tempResume, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(() => {
          console.log("Success on updating resumes")
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  };

  setResumeItemState = (index, name, id) => {
    const tempState = this.state;
    if (name === "linkedin" || name === "github" || name === "portfolio") {
      tempState.resumes[index].links[name] = !tempState.resumes[index].links[
        name
      ];
    } else {
      tempState.resumes[index].sections[name].forEach(field => {
        if (field._id === id) {
          field.value = !field.value;
        }
      });
    }
    this.setState(tempState);
  }; //Checkboxes

  setResumeItemDropdown = (index, name, id) => {
    const tempState = this.state;
    if (name === "title") {
      tempState.resumes[index][name].forEach(field => {
        if (field._id === id) {
          field.value = true;
        } else {
          field.value = false;
        }
      });
    } else {
      tempState.resumes[index].sections[name].forEach(field => {
        if (field._id === id) {
          field.value = true;
        } else {
          field.value = false;
        }
      });
    }
    this.setState(tempState);
  }; //Dropdowns

  setElement = (index, elementName, elementValue) => {
    const temp = this.state;
    temp[elementName][index] = elementValue;
    this.setState(temp);
  };

  setSingleElement = (elementName, elementValue) => {
    this.setState({ [elementName]: elementValue });
  };

  addElement = (elementName, elementValue) => {
    const temp = this.state;
    temp[elementName].push(elementValue);
    this.setState(temp);
  };

  removeElement = (index, elementName) => {
    const temp = this.state;
    temp[elementName].splice(index, 1);
    this.setState(temp);
  };

  render() {
    const userInfo = this.state;
    return (
      <AuthContext.Provider
        value={{
          userInfo,
          actions: {
            setResume: this.setResume,
            toggleAuth: this.toggleAuth,
            createResume: this.createResume,
            expandResumeIDs: this.expandResumeIDs,
            setResumeItemState: this.setResumeItemState,
            setResumeItemDropdown: this.setResumeItemDropdown,
            setLogin: this.setLogin,
            setLogout: this.setLogout,
            setElement: this.setElement,
            addElement: this.addElement,
            removeElement: this.removeElement,
            setSingleElement: this.setSingleElement
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
