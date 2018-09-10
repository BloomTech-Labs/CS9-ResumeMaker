import React, { Component } from "react";

class CheckBox extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     checked: this.props.value
  //   };
  // }

  toggle = () => {
    this.props.context.actions.setResumeItemState(
      this.props.index,
      this.props.name,
      this.props.id
    );
  };

  render() {
    console.log("CHECKBOX INDEX BOI", this.props.index);
    return (
      <input
        type="checkbox"
        checked={this.props.value}
        onChange={this.toggle}
      />
    );
  }
}

export default CheckBox;
