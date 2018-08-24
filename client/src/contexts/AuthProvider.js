import React, { Component } from "react";
export const AuthContext = React.createContext({});

class AuthProvider extends Component {
  state = {
    auth: false,
    firstName: "",
    lastName: "",
    middleName: "",
    title: "",
    email: "",
    phoneNumber: "",
    links: [],
    education: [],
    experience: [],
    skills: [],
    summary: [],
    userName: ""
  };

  toggleAuth = () => {
    this.setState({ auth: !this.state.auth });
  };

  setValue = (title, value) => {
    this.setState({ [title]: value });
  };

  setLogin = userData => {
    this.setState({
      auth: true,
      email: userData.email ? userData.email : "",
      firstName: userData.name.firstname ? userData.name.firstname : "",
      lastName: userData.name.lastname ? userData.name.lastname : "",
      middleName: userData.name.middlename ? userData.name.middlename : "",
      title: userData.title ? userData.title : "",
      links: userData.links ? userData.links : [],
      phoneNumber: userData.phonenumber ? userData.phonenumber : "",
      education: userData.sections.education ? userData.sections.education : [],
      experience: userData.sections.experience
        ? userData.sections.experience
        : [],
      skills: userData.sections.skills ? userData.sections.skills : [],
      summary: userData.sections.summary ? userData.sections.summary : [],
      userName: userData.username ? userData.username : "",
      id: userData._id ? userData._id : null
    });
  };

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

  render() {
    const userInfo = this.state;
    return (
      <AuthContext.Provider
        value={{
          userInfo,
          actions: {
            toggleAuth: this.toggleAuth,
            setValue: this.setValue,
            setLogin: this.setLogin,
            setElement: this.setElement,
            addElement: this.addElement
          }
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
