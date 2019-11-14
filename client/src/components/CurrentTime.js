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

  render() {
    return <div name="time">{moment().format("MMMM Do YYYY, h:mm:ss a")}</div>;
  }
}
