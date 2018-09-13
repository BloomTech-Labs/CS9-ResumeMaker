import React, { Component } from "react";

class TitleDropdown extends Component {
  // Adding default state as a placeholder
  state = {
    toggled: false
  };

  // Toggles the drop down menu to appear based on the boolean value of state
  handleToggle = () => {
    this.setState({
      toggled: !this.state.toggled
    });
  };

  // Allows us to select an li and set our state with the given value
  handleClick = data => {
    this.setState({
      selected: data.content,
      toggled: false
    });
    this.props.context.actions.setResumeItemDropdown(
      this.props.index,
      "title",
      data._id
    );
  };

  render() {
    const { toggled } = this.state;
    let selectedTitle = null;
    const list = this.props.context.userInfo.resumes[this.props.index].title.map((data, index) => {
      if(data.value === true){
        selectedTitle = this.props.context.userInfo.title[index].content;
      }
      return (
      <li
        className="list-group-item"
        key={data._id}
        name={this.props.context.userInfo.title[index].content}
        // Bound the this context for scoping due to having a function for each iteration
        // onClick={this.handleClick.bind(this, data.name)}
        /* Another option is to simply use this callback syntax as long as the function isn't being passed as props to another component. */
        onClick={() => this.handleClick(data)}
        style={{ cursor: "pointer" }}
      >
        {this.props.context.userInfo.title[index].content}
      </li>
      )
    }
  );

    return (
      <div className="template-card card card-card dropdown mb-3">
        <div className="container">
          <h6>{selectedTitle ? selectedTitle : "Select a title"}</h6>
        </div>
        <h6 style={{fontWeight: "550"}}>
          Choose an option:{" "}
          <i
            // Dynamically assigns a classname based on the value of this.toggled
            className={
              toggled ? "fa fa-angle-up fa-sm" : "fa fa-angle-down fa-sm"
            }
            style={{ cursor: "pointer" }}
            onClick={this.handleToggle}
          />
        </h6>
        {toggled ? <ul className="list-group">{list}</ul> : null}
      </div>
    );
  }
}

export default TitleDropdown;
