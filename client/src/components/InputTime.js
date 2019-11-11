import React, { Component } from "react";
import { Input } from "reactstrap";
import API from "./utility/API";

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
    API.saveUserData(this.props.category, {
      [this.props.category]: this.state.userInput,
      email: localStorage.getItem("email")
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <td>
          <Input onChange={this.handleInputChange} {...this.props} />
        </td>
        <td>
          <button onClick={this.submitTime}>add time</button>
        </td>
      </div>
    );
  }
}
