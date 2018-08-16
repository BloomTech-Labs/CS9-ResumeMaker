import React, { Component } from 'react';
export const AuthContext = React.createContext({});

class AuthProvider extends Component {
  state = {
    auth: false,
    firstName: "Chris",
    lastName: "LastName",

  };

  toggleAuth = () => {
    this.setState({ auth: !this.state.auth });
  };

  render() {
    const { auth } = this.state;
    return (
      <AuthContext.Provider
        value={{ auth, actions: { toggleAuth: this.toggleAuth } }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;