import React, { Component } from "react";
import API from "./utility/API";
let counter = 0;

export default class Timer extends Component {
  state = {
    time: 0,
    clockRunning: false,
    converted: "00:00",
    grading: "",
    confirmation: "",
    menuSelection: ""
  };

  submitTime = () => {
    counter = 0;
    this.setState({ time: counter });
  };

  timeConverter = t => {
    let minutes = Math.floor(t / 60);
    let seconds = t - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    const convertedTime = minutes + ":" + seconds;
    this.setState({ converted: convertedTime });
  };

  count = () => {
    counter++;
    console.log(counter);
    this.setState({ time: counter });
    this.timeConverter(counter);
  };

  startClock = () => {
    if (!this.state.clockRunning) {
      let intervalId = setInterval(this.count, 1000);
      this.setState({ clockRunning: true, intervalId: intervalId });
    }
  };
  stopClock = () => {
    console.log("stop");
    clearInterval(this.state.intervalId);

    this.setState({ clockRunning: false });
  };

  submitTime = event => {
    event.preventDefault();
    if (counter !== 0 && !this.state.clockRunning) {
      API.saveUserData({
        [this.state.menuSelection]: this.state.time,
        email: localStorage.getItem("email")
      })
        .then(
          this.setState({
            confirmation: "time submitted",
            time: 0,
            converted: "00:00"
          })
        )
        .catch(err => console.log(err));
    } else {
      this.setState({ confirmation: "Cannot submitt" });
    }
  };

  render() {
    console.log(this.state.menuSelection);
    return (
      <div className="wrapper">
        <div>
          <button onClick={() => this.setState({ menuSelection: "grading" })}>
            grading
          </button>
          <button
            onClick={() => this.setState({ menuSelection: "lessonPlanning" })}
          >
            Lesson Planning
          </button>
          <button
            onClick={() => this.setState({ menuSelection: "communications" })}
          >
            Communications
          </button>
          <button
            onClick={() => this.setState({ menuSelection: "specialEventPlanning" })}
          >
            Special Event Planning
          </button>
        </div>
        <div className="display">{this.state.converted}</div>
        <div className="buttons">
          <button onClick={this.startClock}>Start</button>
          <button onClick={this.stopClock}>Stop</button>
          <button onClick={this.submitTime}>Submit</button>
        </div>
        <h1>{this.state.confirmation}</h1>
      </div>
    );
  }
}
