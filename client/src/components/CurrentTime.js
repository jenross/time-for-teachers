import moment from "moment";
import React, { Component } from "react";

export default class CurrentTime extends Component {
  state = {
    time: 0
  };

  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div name="time" onChange={this.handleInputChange}>
        {moment().format("MMMM Do YYYY, h:mm:ss a")}
      </div>
    );
  }
}
