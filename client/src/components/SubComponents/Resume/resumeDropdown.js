import React, { Component } from "react";

class ResumeDropdown extends Component {
  // Adding default state as a placeholder
  constructor(props) {
    super(props);
    this.state = {
      toggled: false,
      selected: ""
    };
  }

  componentDidMount = () => {
    this.setState({ selected: this.fillState() });
  }

  fillState = () => {
    if (this.props.context.userInfo.resumes.length !== 0) {
      const temp = this.props.context.userInfo.resumes.filter(resume => {
        return this.props.context.userInfo.currentresume === resume._id;
      });
      if (temp.length > 0) return temp[0].content;
      else return "Select a Resume";
    } else return "Select a Resume";
  };

  // Toggles the drop down menu to appear based on the boolean value of state
  handleToggle = () => {
    this.setState({
      toggled: !this.state.toggled
    });
  };

  // Allows us to select an li and set our state with the given value
  handleClick = (data, index) => {
    console.log("HANDEL KLICK on it boi", data._id, index);
    this.setState({
      selected: "Resume " + (index + 1),
      toggled: false
    });
    this.props.context.actions.setSingleElement("currentresume", data._id);
  };

  render() {
    const { toggled, selected } = this.state;
    const list = this.props.context.userInfo.resumes.map((data, index) => (
      <li
        className="list-group-item"
        key={data._id}
        onClick={() => this.handleClick(data, index)}
        style={{ cursor: "pointer" }}
      >
        {"Resume " + (index + 1)}
      </li>
    ));

    return (
      <div className="template-card card dropdown m-0">
        <div className="container">
          <p>{selected}</p>
        </div>
        <h6>
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

export default ResumeDropdown;
