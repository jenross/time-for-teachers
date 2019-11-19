import React, { Component } from "react";
import API from "./utility/API";
import plus from "./images/ic_add_circle_48px.svg";
import play from "./images/ic_play_circle_filled_white_48px.svg";
import stop from "./images/ic_stop_48px.svg";
import UpdateModal from "./UpdateModal";
import "./Timer.css";
import moment from "moment";

let counter = 0;

export default class Timer extends Component {
  state = {
    time: 0,
    clockRunning: false,
    converted: "00:00",
    convertedTime: ""
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
    const convertedDisplayTime = minutes + ":" + seconds;
    this.setState({ converted: convertedDisplayTime });
  };

  count = () => {
    counter++;
    this.setState({ time: counter });
    this.timeConverter(counter);
    this.props.updateCounter();
  };

  startClock = () => {
    if (
      !counter ||
      (counter === this.props.counter &&
        this.props.category === this.props.counterCategory)
    ) {
      if (!this.props.clockStatus) {
        this.props.startClock(this.props.category);
        let intervalId = setInterval(this.count, 1000);
        this.setState({ clockRunning: true, intervalId: intervalId });
        this.setState({
          time: counter
        });
      }
    }
  };

  stopClock = () => {
    if (this.props.category === this.props.counterCategory) {
      clearInterval(this.state.intervalId);
      this.props.stopClock(this.props.category);
      this.setState({ clockRunning: false });
    }
  };

  submitTime = event => {
    event.preventDefault();
    if (counter !== 0 && !this.state.clockRunning) {
      API.saveUserData(this.props.category, {
        [this.props.category]: this.state.time,
        [this.props.convertedTime]: moment
          .utc(this.state.time * 1000)
          .format("HH:mm")
          .replace(/:/gi, "."),
        email: localStorage.getItem("email")
      })
        .then(
          this.setState({
            time: 0,
            converted: "00:00"
          }),
          // this.props.rerender(),
          (counter = 0)
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="display">{this.state.converted}</div>
        <div className="buttons">
          <img
            className="timer-btns start"
            ref="btn"
            onClick={this.startClock}
            // disabled={this.state.disabled}
            src={play}
            alt="play icon"
          />
          <img
            className="timer-btns stop"
            onClick={this.stopClock}
            src={stop}
            alt="stop icon"
          />
          <img
            className="timer-btns submit"
            onClick={this.submitTime}
            src={plus}
            alt="plus icon"
          />
          {/* <UpdateModal /> */}
        </div>
      </div>
    );
  }
}
