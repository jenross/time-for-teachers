import React, { Component } from "react";
import API from "../utility/API";
import { Input, FormBtn } from "../Form";

export default class AddUser extends Component {
  state = {
    userData: [],
    grading: "",
    lessonPlanning: "",
    specialEventPlanning: "",
    communications: "",
    paperwork: "",
    training: "",
    continuingEducation: "",
    other: ""
  };

  componentDidMount() {
    this.loadUserData();
  }

  loadUserData = () => {
    API.getUserData(localStorage.getItem("email"))
      .then(res => {
        this.setState({
          userData: res.data,
          grading: "",
          lessonPlanning: "",
          specialEventPlanning: "",
          communications: "",
          paperwork: "",
          training: "",
          continuingEducation: "",
          other: ""
        });
        return console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.grading && this.state.lessonPlanning) {
      API.saveUserData({
        grading: this.state.grading,
        lessonPlanning: this.state.lessonPlanning,
        specialEventPlanning: this.state.specialEventPlanning,
        communications: this.state.communications,
        paperwork: this.state.paperwork,
        training: this.state.training,
        continuingEducation: this.state.continuingEducation,
        other: this.state.other,
        email: localStorage.getItem("email")
      })
        .then(res => this.loadUserData())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
        <form>
          <Input
            value={this.state.grading}
            onChange={this.handleInputChange}
            name="grading"
            placeholder="grading "
          />
          <Input
            value={this.state.lessonPlanning}
            onChange={this.handleInputChange}
            name="lessonPlanning"
            placeholder="lessonPlanning "
          />
          <Input
            value={this.state.specialEventPlanning}
            onChange={this.handleInputChange}
            name="specialEventPlanning"
            placeholder="specialEventPlanning "
          />
          <Input
            value={this.state.communications}
            onChange={this.handleInputChange}
            name="communications"
            placeholder="communications "
          />
          <Input
            value={this.state.papaerwork}
            onChange={this.handleInputChange}
            name="papaerwork"
            placeholder="papaerwork "
          />
          <Input
            value={this.state.training}
            onChange={this.handleInputChange}
            name="training"
            placeholder="training "
          />
          <Input
            value={this.state.continuingEducation}
            onChange={this.handleInputChange}
            name="continuingEducation"
            placeholder="continuingEducation "
          />
          <Input
            value={this.state.other}
            onChange={this.handleInputChange}
            name="other"
            placeholder="other "
          />
          <FormBtn onClick={this.handleFormSubmit}>Submit user</FormBtn>
          <div>
            {this.state.userData.map(data => (
              <div
                style={{
                  padding: "20px",
                  borderWidth: "2px",
                  borderStyle: "solid",
                  margin: "5px 10% 5px 10%"
                }}
                key={data._id}
              >
                <li>Grading: {data.grading}</li>
                <li>Lesson Planning: {data.lessonPlanning}</li>
                <li>Time Submitted: {data.date}</li>
              </div>
            ))}
          </div>
        </form>
      </div>
    );
  }
}





//!======================



import React, { Component } from "react";
import API from "./utility/API";
let counter = 0;

export default class Timer extends Component {
  state = {
    time: 0,
    clockRunning: false,
    converted: "00:00",
    grading: "",
    confirmation: ""
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
        grading: this.state.time,
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
    return (
      <div className="wrapper">
        <div>
          <button>grading</button>
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
















import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";
import Footer from "./components/Footer";
import { Auth } from "aws-amplify";
import API from "./components/utility/API";
import AddUser from "./components/pages/AddUser";
import Timer from "./components/Timer";

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  };

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = user => {
    this.setState({ user: user });
  };

  getUser = () => {
    API.getUsers()
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  async componentDidMount() {
    try {
      // const session = await Auth.currentSession();
      this.setAuthStatus(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      if (error !== "No current user") {
        console.log(error);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <Router>
            <div>
              <Navbar auth={authProps} />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <Home {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/login"
                  render={props => <LogIn {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/register"
                  render={props => <Register {...props} auth={authProps} />}
                />
                <Route
                  exact
                  path="/forgotpassword"
                  render={props => (
                    <ForgotPassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/forgotpasswordverification"
                  render={props => (
                    <ForgotPasswordVerification {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepassword"
                  render={props => (
                    <ChangePassword {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/changepasswordconfirmation"
                  render={props => (
                    <ChangePasswordConfirm {...props} auth={authProps} />
                  )}
                />
                <Route
                  exact
                  path="/welcome"
                  render={props => <Welcome {...props} auth={authProps} />}
                />
              </Switch>
              <button onClick={this.getUser}>axios test</button>
              <AddUser />
              <div
                style={{
                  margin: "50px",
                  padding: "100px",
                  border: "2px solid black"
                }}
              >
                <Timer />
              </div>
              <Footer />
            </div>
          </Router>
        </div>
      )
    );
  }
}

export default App;
