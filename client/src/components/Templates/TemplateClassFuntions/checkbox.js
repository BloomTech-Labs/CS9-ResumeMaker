import React, { Component } from "react";

class CheckBox extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        checked: false
      };
    }
  
    toggle = () => {
      this.setState(
        {
          checked: !this.state.checked // flips boolean value
        },
        function() {
          console.log(this.state);
        }.bind(this)
      );
    };
  
    render() {
      return (
        <input
          type="checkbox"
          checked={this.state.checked}
          onChange={this.toggle}
        />
      );
    }
  }
  
  export default CheckBox; 