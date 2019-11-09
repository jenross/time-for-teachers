import React, { Component } from "react";
import API from "../utility/API";
// import CategoryRow from "./CategoryRow";
import "../Dashboard.css";
import PanelHeader from "../PanelHeader";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import Add from "../images/ic_add_circle_48px.svg";

let counter = 0;

export default class Dashboard extends Component {
  state = {
    userData: [],
    grading: "",
    lessonPlanning: "",
    specialEventPlanning: "",
    communications: "",
    paperwork: "",
    training: "",
    continuingEducation: "",
    other: "",

    time: 0,
    clockRunning: false,
    converted: "00:00",
    confirmation: ""
  };

  //? =============================TIME FUNCTIONS=================================//
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
        [this.props.category]: this.state.time,
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

  //? ==============================================================//

  getGradingSum = () => {
    return this.state.userData
      .map(data => parseInt(data.grading))
      .reduce((a, b) => a + b, 0);
  };

  componentDidMount() {
    API.getUserData(localStorage.getItem("email"))
      .then(res => {
        this.setState({
          userData: res.data
          // grading: "",
          // lessonPlanning: "",
          // specialEventPlanning: "",
          // communications: "",
          // paperwork: "",
          // training: "",
          // continuingEducation: "",
          // other: ""
        });
        console.log("AT MOUNT", this.state.userData);
        this.getGradingSum();
      })
      .then()
      .catch(err => console.log(err));
  }

  render() {
    console.log("This here, is the UserData", this.state.userData);
    console.log("get sum", this.getGradingSum());
    return (
      <React.Fragment>
        <>
          <PanelHeader size="sm" />
          <div className="content">
            <Row>
              <Col md="4">
                <Card
                  className="card-pricing card-raised"
                  style={{
                    backgroundImage:
                      "url(" + require("../images/pencil_bkgrnd.png") + ")"
                  }}
                ></Card>
              </Col>
              <Col xs={12} md={12}>
                <CardTitle tag="h4">Tasks</CardTitle>
                <Card className="card-plain">
                  <CardHeader></CardHeader>
                  <CardBody>
                    <Table responsive striped>
                      <tbody>
                        <tr>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox"></Input>
                                <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <div className="wrapper">
                              <div className="display">
                                {this.state.converted}
                              </div>
                              <div className="buttons">
                                <button onClick={this.startClock}>Start</button>
                                <button onClick={this.stopClock}>Stop</button>
                                <button onClick={this.submitTime}>
                                  Submit
                                </button>
                              </div>
                              <h1>{this.state.confirmation}</h1>
                            </div>
                          </td>{" "}
                          <td>Grading</td>
                          {/* <div>{this.getGradingSum()}</div> */}
                          {/* <div>
                            {this.state.userData.map( => (
                              <div>{grading}</div>
                            ))}
                          </div> */}
                          <td>
                            <FormGroup>
                              <Input
                                defaultValue=""
                                placeholder="Time (hh:mm)"
                                type="time"
                              ></Input>
                            </FormGroup>
                          </td>
                          <td>
                            <img
                              className="add-btn"
                              src={Add}
                              alt="add button"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox"></Input>
                                <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <div className="wrapper">
                              <div className="display">
                                {this.state.converted}
                              </div>
                              <div className="buttons">
                                <button onClick={this.startClock}>Start</button>
                                <button onClick={this.stopClock}>Stop</button>
                                <button onClick={this.submitTime}>
                                  Submit
                                </button>
                              </div>
                              <h1>{this.state.confirmation}</h1>
                            </div>
                          </td>

                          <td>Lesson Planning</td>
                          <td>
                            <FormGroup>
                              <Input
                                defaultValue=""
                                placeholder="Time (hh:mm)"
                                type="text"
                              ></Input>
                            </FormGroup>
                          </td>
                          <td>
                            <img
                              className="add-btn"
                              src={Add}
                              alt="add button"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox"></Input>
                                <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <div className="wrapper">
                              <div className="display">
                                {this.state.converted}
                              </div>
                              <div className="buttons">
                                <button onClick={this.startClock}>Start</button>
                                <button onClick={this.stopClock}>Stop</button>
                                <button onClick={this.submitTime}>
                                  Submit
                                </button>
                              </div>
                              <h1>{this.state.confirmation}</h1>
                            </div>
                          </td>
                          <td>Planning & Organizing Special Events</td>
                          <td>
                            <FormGroup>
                              <Input
                                defaultValue=""
                                placeholder="Time (hh:mm)"
                                type="text"
                              ></Input>
                            </FormGroup>
                          </td>
                          <td>
                            <img
                              className="add-btn"
                              src={Add}
                              alt="add button"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox"></Input>
                                <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <div className="wrapper">
                              <div className="display">
                                {this.state.converted}
                              </div>
                              <div className="buttons">
                                <button onClick={this.startClock}>Start</button>
                                <button onClick={this.stopClock}>Stop</button>
                                <button onClick={this.submitTime}>
                                  Submit
                                </button>
                              </div>
                              <h1>{this.state.confirmation}</h1>
                            </div>
                          </td>
                          <td>Communication</td>
                          <td>
                            <FormGroup>
                              <Input
                                defaultValue=""
                                placeholder="Time (hh:mm)"
                                type="text"
                              ></Input>
                            </FormGroup>
                          </td>
                          <td>
                            <img
                              className="add-btn"
                              src={Add}
                              alt="add button"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox"></Input>
                                <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <div className="wrapper">
                              <div className="display">
                                {this.state.converted}
                              </div>
                              <div className="buttons">
                                <button onClick={this.startClock}>Start</button>
                                <button onClick={this.stopClock}>Stop</button>
                                <button onClick={this.submitTime}>
                                  Submit
                                </button>
                              </div>
                              <h1>{this.state.confirmation}</h1>
                            </div>
                          </td>
                          <td>Legal Documentation & Paperwork</td>
                          <td>
                            <FormGroup>
                              <Input
                                defaultValue=""
                                placeholder="Time (hh:mm)"
                                type="text"
                              ></Input>
                            </FormGroup>
                          </td>
                          <td>
                            <img
                              className="add-btn"
                              src={Add}
                              alt="add button"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox"></Input>
                                <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <div className="wrapper">
                              <div className="display">
                                {this.state.converted}
                              </div>
                              <div className="buttons">
                                <button onClick={this.startClock}>Start</button>
                                <button onClick={this.stopClock}>Stop</button>
                                <button onClick={this.submitTime}>
                                  Submit
                                </button>
                              </div>
                              <h1>{this.state.confirmation}</h1>
                            </div>
                          </td>
                          <td>Mandatory Trainings & Continuing Education</td>
                          <td>
                            <FormGroup>
                              <Input
                                defaultValue=""
                                placeholder="Time (hh:mm)"
                                type="text"
                              ></Input>
                            </FormGroup>
                          </td>
                          <td>
                            <img
                              className="add-btn"
                              src={Add}
                              alt="add button"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox"></Input>
                                <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <div className="wrapper">
                              <div className="display">
                                {this.state.converted}
                              </div>
                              <div className="buttons">
                                <button onClick={this.startClock}>Start</button>
                                <button onClick={this.stopClock}>Stop</button>
                                <button onClick={this.submitTime}>
                                  Submit
                                </button>
                              </div>
                              <h1>{this.state.confirmation}</h1>
                            </div>
                          </td>
                          <td>Other</td>
                          <td>
                            <FormGroup>
                              <Input
                                defaultValue=""
                                placeholder="Time (hh:mm)"
                                type="text"
                              ></Input>
                            </FormGroup>
                          </td>
                          <td>
                            <img
                              className="add-btn"
                              src={Add}
                              alt="add button"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      </React.Fragment>
    );
  }
}
