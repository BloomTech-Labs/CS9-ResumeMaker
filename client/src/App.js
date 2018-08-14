import React, { Component } from 'react';
import { Route } from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h1>Hello World!</h1>
       <Route exact path="/" component = {LandingPage} />
      </div>
    );
  }
}

export default App;
