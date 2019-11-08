// import React from "react";
import React, { Component } from "react";
import API from "./utility/API";

// import { withAuthenticator } from 'aws-amplify-react';
import "./Dashboard.css";
// import Sidebar from './Sidebar';
// import TaskTable from './TaskTable'
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
  Button,
  Nav,
  NavLink,
  NavItem,
  FormGroup,
  Label,
  Input,
  Col
} from "reactstrap";

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
    other: ""
  };
  // state = {

  // }

  // handleSubmit = async event => {
  //     event.preventDefault();

  //     // Form validation
  //     this.clearErrorState();
  //     const error = Validate(event, this.state);
  //     if (error) {
  //       this.setState({
  //         errors: { ...this.state.errors, ...error }
  //       });
  //     }

  componentDidMount() {
    // loadUserData = () => {
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
        return console.log();
      })
      .catch(err => console.log(err));
    // };
  }

  // const [tabs, setTabs] = React.useState("1");
  render() {
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
                    <h5 className="category text-info">Timer</h5>
                    <CardTitle className="time" tag="h1">
                      2:30
                    </CardTitle>
                    <div className="icons-nucleo">
                      <img
                        className="play-button"
                        src={Play}
                        alt="play button"
                      />
                      <img
                        className="stop-button"
                        src={Stop}
                        alt="stop button"
                      />
                    </div>
                  </CardBody>
                  
                </Card>
              </Col>
              <Col xs={12} md={8}>
                <CardTitle tag="h4">Tasks</CardTitle>
                {/* <Card className="card-plain">
                    <CardHeader>
                      <CardTitle tag="h4">Tasks</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Table responsive>
                        <thead className="text-primary">
                          <tr>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Wednesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                          </tr>
                        </thead>
                        <tbody>
                              <tr>
                                <td>Grading</td>
                              </tr>
                              <tr>
                                <td>Lesson Planning</td>
                              </tr>
                              <tr>
                                <td>Planning & Organizing Special Events</td>
                              </tr>
                              <tr>
                                <td>Communication</td>
                              </tr>
                              <tr>
                                <td>Legal Documentation & Paperwork</td>
                              </tr>
                              <tr>
                                <td>Mandatory Trainings & Continuing Education</td>
                              </tr>
                              <tr>
                                <td>Other</td>
                              </tr>
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card> */}
                {/* <Card>
                  <CardHeader>
                    <Nav
                      className="weekday-header nav-tabs-neutral justify-content-center"
                      // data-background-color="blue"
                      role="tablist"
                      tabs
                    >
                      <NavItem>
                        <NavLink
                          className={tabs === "1" ? "active" : ""}
                          href="#pablo"
                          onClick={e => {
                            e.preventDefault();
                            setTabs("1");
                          }}
                        >
                          Monday
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={tabs === "2" ? "active" : ""}
                          href="#pablo"
                          onClick={e => {
                            e.preventDefault();
                            setTabs("2");
                          }}
                        >
                          Tuesday
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={tabs === "3" ? "active" : ""}
                          href="#pablo"
                          onClick={e => {
                            e.preventDefault();
                            setTabs("3");
                          }}
                        >
                          Wednesday
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={tabs === "4" ? "active" : ""}
                          href="#pablo"
                          onClick={e => {
                            e.preventDefault();
                            setTabs("4");
                          }}
                        >
                          Thursday
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={tabs === "5" ? "active" : ""}
                          href="#pablo"
                          onClick={e => {
                            e.preventDefault();
                            setTabs("5");
                          }}
                        >
                          Friday
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                </Card> */}
                <Card className="card-plain">
                  <CardHeader>
                    {/* <CardTitle tag="h4">Tasks</CardTitle> */}
                  </CardHeader>
                  <CardBody>
                    <Table responsive striped>
                      {/* <thead className="text-center">
                          <tr>
                            <th className="text-center">Monday</th>
                            <th className="text-center">Tuesday</th>
                            <th className="text-center">Wednesday</th>
                            <th className="text-center">Thursday</th>
                            <th className="text-center">Friday</th>
                          </tr>
                        </thead> */}
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
                          {/* <h1>{this.state.userData[2]._id}</h1> */}
                          <div>
                            {this.state.userData.map(data => (
                              <div key={data._id}>
                                <p>{data.grading}</p>
                              </div>
                            ))}
                          </div>
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
                        {/* <tr>
                            <td colSpan="5"></td>
                            <td className="td-total">Total</td>
                            <td className="td-price">€ 35,999</td>
                          </tr> */}
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
