import React, { Component } from "react";
import "./classFunction.css";

class SummaryDropdown extends Component {
  // Adding default state as a placeholder
  state = {
    toggled: false,
    selected: ""
  };

  componentDidMount() {
    this.setState({ selected: this.fillState() });
  }

  fillState = () => {
    if (
      this.props.value.length !== 0 &&
      this.props.context.userInfo.summary.length !== 0
    ) {
      const temp = this.props.context.userInfo.summary.filter(summary => {
        return this.props.value[0]._id === summary._id;
      });
      if (temp.length > 0) return temp[0].content;
      else return "Select a Summary";
    } else {
      return "Select a Summary";
    }
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
      "summary",
      data._id
    );
  };

  render() {
    // console.log(this.props.context.userInfo.summary.map(item => item));

    const { summary } = this.props.data;
    const { toggled, selected } = this.state;
    const list = summary.map(data => (
      <li
        className="list-group-item"
        key={data._id}
        name={data.content}
        // Bound the this context for scoping due to having a function for each iteration
        // onClick={this.handleClick.bind(this, data.name)}
        /* Another option is to simply use this callback syntax as long as the function isn't being passed as props to another component. */
        onClick={() => this.handleClick(data)}
        style={{ cursor: "pointer" }}
      >
        {data.content}
      </li>
    ));

    return (
      <div className="template-card card card-card card-body mb-3">
        {/* <div className="jumbotron"> */}
        <div className="container">
          <p>{selected}</p>
        </div>
        {/* </div> */}
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

export default SummaryDropdown;
