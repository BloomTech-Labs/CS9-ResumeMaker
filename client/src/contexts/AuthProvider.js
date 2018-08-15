import React, { Component } from 'react';
export const AuthContext = React.createContext({});

class AuthProvider extends Component {
  state = {
    auth: false
  };

  toggleAuth = () => {
    this.setState({ auth: !this.state.auth });
  };
  render() {
    return (
      <AuthContext.Provider
        value={{ state: this.state, actions: { toggleAuth: this.toggleAuth } }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
