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
    currentresume: null,
    membership: false
  };

  setLogout = () => {
    localStorage.removeItem("token");
    this.setState({
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
      currentresume: null,
      membership: false
    });
  };

  setLogin = dataFromUser => {
    console.log("SETLOGIN, userdata:", dataFromUser);
    const userData = dataFromUser.user;
    this.setState({
      auth: true,
      currentresume: userData.currentresume ? userData.currentresume : null,
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
      id: userData._id ? userData._id : null,
      membership: userData.membership ? userData.membership : false
    });
    // Every time setLogin is called due to changing user data in database,
    // setLogin is called which then updates the resumes.
    this.setResume(dataFromUser.resumes)
  };

  setResume = resumeData => {
    console.log("resdata is,", resumeData)
    if(this.state.auth !== true){
      return;
    }
    if (!(resumeData.length > 0) || resumeData[0] === null) {
      console.log("SET REZ BOI")
      this.createResume(true);
    } else if (resumeData.length === 1 && this.state.currentresume === null){
      console.log("dont set res 1")
      this.setState({
        resumes: resumeData,
        currentresume: resumeData[0]._id
      });
    } else {
      console.log("dont set res 2")
      this.setState({
        resumes: resumeData
      })
    }
  };

  pushResumes = newResume => {
    let newState = this.state.resumes;
    newState.push(newResume);
    this.setState({ resumes: newState });
  }

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
    tempObj["resumes"] = tempState.map((resume) => resume._id);
    // !fix below setstate maybe
    this.setState({ resumes: tempState });
    
    axios
      .post(`${urls[urls.basePath]}/resume/`, tempObj, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.setState({ resumes: response.data.resumes, currentresume: response.data.Resume._id });
        // if(this.state.resumes.length <= 1){
        //   console.log("setResume replaced index 0 resume", response.data);
        //   this.setState({ resumes: response.data.resumes, currentresume: response.data.Resume._id });
        // } else {
        //   this.setState({ resumes: tempState, currentresume: response.data.Resume._id });
        // }
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  expandResumeIDs = () => {
    function findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

    const tempResume = [];
  
    const expandSection = (section, resumeSection, index) => {
      // no .sections portion
      let tempObj = this.state.resumes[index];
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
      // this.setState({ ["resumes"[index]]: tempObj });
      tempResume.push(tempObj);
  };

  // Using promises means the state is only set a single name, rather than for each
  // subattribute changed or once for each resume that is updated.
  let resumePromises = [];

  // SET TRUE IF .SECTION IS IN FRONT OF IT SO TITLE IS FALSE DUDE
    this.state.resumes.forEach((item, index) => {
      expandSection("title", false, index);
      expandSection("experience", true, index);
      expandSection("education", true, index);
      expandSection("summary", true, index);
      expandSection("skills", true, index);
      console.log("EXPANDIDS IS DOING AN AXIOS M80");
      const resumePromise = axios
      .put(
        `${urls[urls.basePath]}/resume/` + this.state.resumes[index]._id,
        tempResume[index],
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then(response => {
        console.log("response", response);
        return response.data.resume;
      })
      .catch(err => {
        console.log("err", err);
      });
      resumePromises.push(resumePromise);
    });

    // console.log("OUR PROMISES", resumePromises);
    // Once every request is finished state updates once.
    Promise.all(resumePromises).then(updatedResumes => {
      // console.log("promise me ned", updatedResumes);
      this.setState({ resumes: updatedResumes})
    })

  };


  setResumeItemState = (index, name, id) => {
    console.log("SETRESUMEITEMSTATE", index, name, id, this.state.currentresume)
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
    console.log("Set single element was called");
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
            setSingleElement: this.setSingleElement,
            pushResumes: this.pushResumes
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
