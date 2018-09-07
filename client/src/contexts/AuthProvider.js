import React, { Component } from "react";
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
    skillgroups: [],
    summary: [],
    resumes: [],
    dateformat: "MM/DD/YYYY"
  }


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
      skillgroups: [],
      summary: []
    });
  };

  setLogin = userData => {
    this.setState({
      auth: true,
      currentResume: 0,
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
      skillgroups: userData.sections.skillgroups ? userData.sections.skillgroups : [],
      summary: userData.sections.summary ? userData.sections.summary : [],
      username: userData.username ? userData.username : "",
      id: userData._id ? userData._id : null,
      dateformat: userData.dateformat ? userData.dateformat : "MM/DD/YYYY"
    });
  };

  setResume = (resumeData) => {
    if (resumeData[0] === null) {
      this.createResume(true);
    } else {
      this.setState({
        resumes: resumeData
      })
    }
  }

  createResume = (newResume) => {
    let tempState = this.state.resumes;
    const tempObj = {
      links: { linkedin: false, github: false, portfolio: false },
      title: this.state.title.map(item => {
        return { _id: item._id, value: false }
      }),
      sections: {
        experience: this.state.experience.map(item => {
          return { _id: item._id, value: false }
        }),
        education: this.state.education.map(item => {
          return { _id: item._id, value: false }
        }),
        summary: this.state.summary.map(item => {
          return { _id: item._id, value: false }
        }),
        skillgroups: this.state.skillgroups.map(item => {
          return { _id: item._id, value: false }
        }),
      }
    }
    if (newResume) {
      tempState = [];
      tempState.push(tempObj);
    }
    else
      tempState.push(tempObj);
    this.setState({ resumes: tempState })
  }

  expandResumeIDs = (index) => {

    function findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    }

    const tempObj = this.state.resumes[index];

    for (let item of this.state.title) {
      let current = this.state.resumes[index].title.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].title.push({ _id: item._id, value: false })
        : console.log()
    } // All items in context now have a resume counterpart
    let loopVar = this.state.resumes[index].title.length;
    for (let i = 0; loopVar > i; i++) {
      if (findWithAttr(this.state.title, "_id", this.state.resumes[index].title[i]._id) > -1) { }
      else {
        tempObj.title.splice(i, 1);
        loopVar--;
        i--;
      }
    }// All items in resume that are not in context were deleted from resume

    for (let item of this.state.experience) {
      let current = this.state.resumes[index].sections.experience.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].sections.experience.push({ _id: item._id, value: false })
        : console.log()
    }
    loopVar = this.state.resumes[index].sections.experience.length;
    for (let i = 0; loopVar > i; i++) {
      if (findWithAttr(this.state.experience, "_id", this.state.resumes[index].sections.experience[i]._id) > -1) { }
      else {
        tempObj.sections.experience.splice(i, 1)
        loopVar--;
        i--;
      }
    }

    for (let item of this.state.education) {
      let current = this.state.resumes[index].sections.education.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].sections.education.push({ _id: item._id, value: false })
        : console.log()
    }
    loopVar = this.state.resumes[index].sections.education.length;
    for (let i = 0; loopVar > i; i++) {
      if (findWithAttr(this.state.education, "_id", this.state.resumes[index].sections.education[i]._id) > -1) { }
      else {
        tempObj.sections.education.splice(i, 1)
        loopVar--;
        i--;
      }
    }

    for (let item of this.state.summary) {
      let current = this.state.resumes[index].sections.summary.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].sections.summary.push({ _id: item._id, value: false })
        : console.log()
    }
    loopVar = this.state.resumes[index].sections.summary.length;
    for (let i = 0; loopVar > i; i++) {
      if (findWithAttr(this.state.summary, "_id", this.state.resumes[index].sections.summary[i]._id) > -1) { }
      else {
        tempObj.sections.summary.splice(i, 1)
        loopVar--;
        i--;
      }
    }

    for (let item of this.state.skills) {
      let current = this.state.resumes[index].sections.skills.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].sections.skills.push({ _id: item._id, value: false })
        : console.log()
    }
    loopVar = this.state.resumes[index].sections.skills.length;
    for (let i = 0; loopVar > i; i++) {
      if (findWithAttr(this.state.skills, "_id", this.state.resumes[index].sections.skills[i]._id) > -1) { }
      else {
        tempObj.sections.skills.splice(i, 1)
        loopVar--;
        i--;
      }
    }

    this.setState({ ["resumes"[index]]: tempObj });
  }

  setResumeItemState = (index, name, id) => {
    const tempState = this.state;
    if (name === "linkedin" || name === "github" || name === "portfolio") {
      tempState.resumes[index].links[name] = !tempState.resumes[index].links[name];
    } else {
      tempState.resumes[index].sections[name].forEach(field => {
        if (field._id === id) {
          field.value = !field.value;
        }
      });
    }
    this.setState(tempState);

  } //Checkboxes

  setResumeItemDropdown = (index, name, id) => {
    const tempState = this.state;
    if (name === "title") {
      tempState.resumes[index][name].forEach(field => {
        if (field._id === id) {
          field.value = true;
        }
        else {
          field.value = false;
        }
      })
    } else {
      tempState.resumes[index].sections[name].forEach(field => {
        if (field._id === id) {
          field.value = true;
        }
        else {
          field.value = false;
        }
      })
    }
    this.setState(tempState);
  } //Dropdowns

  setElement = (index, elementName, elementValue) => {
    const temp = this.state;
    temp[elementName][index] = elementValue;
    this.setState(temp);
  };

  setNestedElement = (aIndex, bIndex, elementName, elementValue) => {
    const temp = this.state;
    temp[elementName][aIndex][bIndex] = elementValue;
    this.setState(temp);
  }

  addElement = (elementName, elementValue) => {
    const temp = this.state;
    temp[elementName].push(elementValue);
    this.setState(temp);
  };

  addNestedElement = (parentObjName, index, elementName, elementValue) => {
    const temp = this.state;
    const parentObj = temp[parentObjName][index];
    console.log("PARENT", parentObj)
    parentObj[elementName].push(elementValue);
    this.setState(temp);
  }

  removeElement = (index, elementName) => {
    const temp = this.state;
    temp[elementName].splice(index, 1);
    this.setState(temp);
  }

  removeNestedElement = (aIndex, bIndex, elementName) => {
    const temp = this.state;
    temp[elementName][aIndex].splice(bIndex, 1);
    this.setState(temp);
  }

  render() {
    const userInfo = this.state;
    return (
      <AuthContext.Provider
        value={{
          userInfo,
          actions: {
            toggleAuth: this.toggleAuth,
            setResume: this.setResume,
            createResume: this.createResume,
            expandResumeIDs: this.expandResumeIDs,
            setResumeItemState: this.setResumeItemState,
            setResumeItemDropdown: this.setResumeItemDropdown,
            setLogin: this.setLogin,
            setLogout: this.setLogout,
            setElement: this.setElement,
            addElement: this.addElement,
            removeElement: this.removeElement,
            setNestedElement: this.setNestedElement,
            addNestedElement: this.addNestedElement,
            removeNestedElement: this.removeNestedElement
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
