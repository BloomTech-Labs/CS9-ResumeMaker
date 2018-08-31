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
      username: "",
      email: "",
      name: {
        firstname: "",
        middlename: "",
        lastname: ""
      },
      title: "",
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
    this.setState({
      resumes: resumeData
    })
  }

  createResume = () => {
    const tempState = this.state.resumes;
    const tempObj = {
      links: { linkedin: false, github: false, portfolio: false },
      sections: {
        experience: this.state.experience.map(item => {
          return { id: item._id, value: false }
        }),
        education: this.state.education.map(item => {
          return { id: item._id, value: false }
        }),
        summary: this.state.summary.map(item => {
          return { id: item._id, value: false }
        }),
        skills: this.state.skills.map(item => {
          return { id: item._id, value: false }
        }),
      }
    }
    tempState.push(tempObj);
    this.setState({ resumes: tempState })
  }

  setResumeItemState = (index, name, id) => {
    const tempState = this.state;
    tempState.resumes[index].sections[name].filter(field => {
      console.log("field", field)
      if (field._id === id) {
        field.value = !field.value;
      }
    });

    // const str = "resumes" + "[" + index.toString() + "]" + name + ".value";
    // const tempObj = { [str]: !this.state[str].value };
    // console.log(tempObj);
    console.log("Before", tempState)
    this.setState(tempState);
    console.log("After", this.state.resumes[index].sections[name])
  }

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
            setResumeItemState: this.setResumeItemState,
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
