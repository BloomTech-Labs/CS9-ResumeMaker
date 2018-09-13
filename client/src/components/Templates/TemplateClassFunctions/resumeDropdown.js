import React, { Component } from "react";

class ResumeDropdown extends Component {
  // Adding default state as a placeholder
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
  }

  // fillState = () => {
  //   if (this.props.context.userInfo.resumes.length !== 0) {
  //     const temp = this.props.context.userInfo.resumes.filter(resume => {
  //       return this.props.context.userInfo.currentresume === resume._id;
  //     });
  //     if (temp.length > 0) return temp[0].content;
  //     else return "Select a Resume";
  //   } else return "Select a Resume";
  // };

  // componentDidMount = () => {
  //   this.setState({ selected: this.fillState() });
  // }

  // Toggles the drop down menu to appear based on the boolean value of state
  handleToggle = () => {
    this.setState({
      toggled: !this.state.toggled
    });
  };

  // Allows us to select an li and set our state with the given value
  handleClick = (data, index) => {
    this.setState({
      toggled: false
    });
    // this updates template page index
    // console.log("handleClick UpdateResumeIndex(newIndex: " + index + ")")
    this.props.updateResumeIndex(index);
    // console.log("resumedropdown newcurrentres", data._id);
    this.props.context.actions.setSingleElement("currentresume", data._id);
  };

  render() {
    const { toggled } = this.state;
    let selectedResume = null;
    const list = this.props.context.userInfo.resumes.map((data, index) => {
      if(data._id == this.props.context.userInfo.currentresume){
        selectedResume = data._id;
      }
      return (
        <li
          className="list-group-item"
          key={data._id}
          onClick={() => this.handleClick(data, index)}
          style={{ cursor: "pointer" }}
        >
          {"Resume " + (index + 1)}
        </li>
      )
    }
  );

    const displayIndex = this.props.index + 1;
    return (
      <div className="template-card card dropdown m-0">
        <div className="container">
          <h4 style={{textTransform: "uppercase"}}>{selectedResume ? selectedResume : "RESUME: " + displayIndex}</h4>
        </div>
        <h6 style={{textTransform: "uppercase"}}>
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
