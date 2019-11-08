import React, { Component } from "react";
import API from "./utility/API";

import "./Dashboard.css";

import PanelHeader from "./PanelHeader";
import Play from "./images/ic_play_circle_filled_white_48px.svg";
import Stop from "./images/ic_stop_48px.svg";
import Add from "./images/ic_add_circle_48px.svg";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";
import Timer from "./Timer";

export default class Dashboard extends Component {
  state = {
    userData: []
    // grading: "",
    // lessonPlanning: "",
    // specialEventPlanning: "",
    // communications: "",
    // paperwork: "",
    // training: "",
    // continuingEducation: "",
    // other: ""
  };

  componentDidMount() {
    API.getUserData(localStorage.getItem("email"))
      .then(res => {
        this.setState({
          userData: res.data,
          grading: 0
          // lessonPlanning: "",
          // specialEventPlanning: "",
          // communications: "",
          // paperwork: "",
          // training: "",
          // continuingEducation: "",
          // other: ""
        });

        console.log("AT MOUNT", this.state.userData);
      })
      .then(this.getGradingSum())
      .catch(err => console.log(err));
  }

  getGradingSum = () => {
    return this.state.userData
      .map(data => parseInt(data.grading))
      .reduce((a, b) => a + b, 0);
  };

  // getLessonPlanningSum = () => {
  //   return this.state.userData
  //     .map(
  //       data => parseInt(data.lessonPlanning)
  //       // <div key={data._id}>
  //       //   {console.log(data)}
  //       //   {/* <p>{data.grading.reduce((a, b) => a + b, 0)}</p> */}
  //       // </div>
  //     )
  //     .reduce((a, b) => a + b, 0);
  // };

  // const [tabs, setTabs] = React.useState("1");
  render() {
    console.log("get sum", this.getGradingSum());
    console.log(this.state.userData);
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
                      "url(" + require("./images/pencil_bkgrnd.png") + ")"
                  }}
                >
                  <CardBody>
                    <Timer />
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} md={8}>
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
                          <td>Grading</td>
                          <div>{this.getGradingSum()}</div>
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
                          <td>Lesson Planning</td>
                          {/* <div>{this.getLessonPlanningSum()}</div> */}

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
