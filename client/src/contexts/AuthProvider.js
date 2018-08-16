import React, { Component } from 'react';
export const AuthContext = React.createContext({});

class AuthProvider extends Component {
  state = {
    auth: false,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    links: [],
    education: [],
    experience: [],
    summary: []
  };

  toggleAuth = () => {
    this.setState({ auth: !this.state.auth });
  };

  setContext = (title, value) => {
    this.setState({ title: value });
  }

  render() {
    const userInfo = this.state;
    return (
      <AuthContext.Provider
        value={{ userInfo, actions: { toggleAuth: this.toggleAuth, setContext: this.setContext } }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;