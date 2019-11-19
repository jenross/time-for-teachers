import React, { Component } from "react";
import { Input } from "reactstrap";
import API from "./utility/API";
import plus from "./images/ic_add_circle_48px.svg";
import "./InputTime.css";
import moment from "moment";

export default class InputTime extends Component {
  state = {
    userInput: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitTime = () => {
    if (!this.state.userInput) {
      console.log("THE USER TRIED TO SUBMITT 0", this.state.userInput);
      return "Cannot Submitt 0";
    }
    API.saveUserData(this.props.category, {
      [this.props.category]: moment.duration(this.state.userInput).asSeconds(),
      [this.props.convertedtime]: this.state.userInput.replace(/:/gi, "."),
      email: localStorage.getItem("email")
    })
      .then(res => this.setState({ userInput: "" }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
          <Input
            type="time"
            className="without_ampm"
            name="userInput"
            onChange={this.handleInputChange}
            {...this.props}
          />
          <img
            className="add-btn"
            onClick={this.submitTime}
            src={plus}
            alt="plus icon"
          />
      </React.Fragment>
    );
  }
}
