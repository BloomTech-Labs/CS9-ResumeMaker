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
    skills: [],
    summary: [],
    resumes: []
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
      skills: [],
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
      skills: userData.sections.skills ? userData.sections.skills : [],
      summary: userData.sections.summary ? userData.sections.summary : [],
      username: userData.username ? userData.username : "",
      id: userData._id ? userData._id : null
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
        skills: this.state.skills.map(item => {
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
    const tempObj = this.state.resumes[index];

    for (let item of this.state.title) {
      let current = this.state.resumes[index].title.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].title.push({ _id: item._id, value: false })
        : console.log()
    }
    for (let item of this.state.experience) {
      let current = this.state.resumes[index].sections.experience.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].sections.experience.push({ _id: item._id, value: false })
        : console.log()
    }
    for (let item of this.state.education) {
      let current = this.state.resumes[index].sections.education.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].sections.education.push({ _id: item._id, value: false })
        : console.log()
    }
    for (let item of this.state.summary) {
      let current = this.state.resumes[index].sections.summary.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].sections.summary.push({ _id: item._id, value: false })
        : console.log()
    }
    for (let item of this.state.skills) {
      let current = this.state.resumes[index].sections.skills.filter(resumeItem => (resumeItem._id === item._id))
      current.length === 0
        ? this.state.resumes[index].sections.skills.push({ _id: item._id, value: false })
        : console.log()
    }
    console.log(this.state.resumes[index].sections.skills)

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

  addElement = (elementName, elementValue) => {
    const temp = this.state;
    temp[elementName].push(elementValue);
    this.setState(temp);
  };

  removeElement = (index, elementName) => {
    const temp = this.state;
    temp[elementName].splice(index, 1);
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
            removeElement: this.removeElement
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
