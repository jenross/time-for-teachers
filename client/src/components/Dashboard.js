import React, { Component } from "react";
import API from "./utility/API";
import CategoryRow from "./CategoryRow";
import "./Dashboard.css";
import PanelHeader from "./PanelHeader";
import moment from "moment";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Input
} from "reactstrap";
import plus from './images/ic_add_circle_48px.svg';

const allTimeArr = [];

export default class Dashboard extends Component {
  state = {
    categories: [
      { name: "Grading", category: "grading", time: 0 },
      { name: "Lesson Planning", category: "lessonPlanning" },
      {
        name: "Planning & Organizing Special Events",
        category: "specialEventPlanning"
      },
      { name: "Communication", category: "communications" },
      { name: "Legal Documentation & Paperwork", category: "paperwork" },
      {
        name: "Mandatory Trainings & Continuing Education",
        category: "continuingEducation"
      },
      { name: "Other", category: "other" }
    ],
    scheduledTime: 0,
    userData: [],
    userDataToday: [],
    postDates: [],
    today: moment().format("dddd"),
    todayDate: moment().format("YYYY-MM-DD"),
    allTime: []
  };

  //? ==============================================================//

  //? ==============================================================//
  getSum = category => {
    return this.state.userData
      .filter(data => data[category])
      .map(data => parseInt(data[category]))
      .reduce((a, b) => a + b, 0);
  };

  addAllTimeData = data => {
    data.forEach(x => {
      allTimeArr.push(
        x.grading ||
          x.lessonPlanning ||
          x.specialEventPlanning ||
          x.communications ||
          x.paperwork ||
          x.continuingEducation ||
          x.other
      );
    });
    this.setState({
      allTime: allTimeArr.map(x => parseInt(x)).reduce((a, b) => a + b, 0)
    });

    console.log(this.state.allTime);
    console.log(data);
  };

  componentDidMount() {
    //? ======== Checks to see if user has a document associated, Creats one if they don't ======== //
    API.checkUserData(localStorage.getItem("email"))
      .then(res => {
        if (res.data.length === 0) {
          API.createDocument(localStorage.getItem("email"))
            .then(res)
            .catch(err => console.log(err));
        }
        //? ======== get acumulated time data for the user submit function ======== //
        this.addAllTimeData(res.data[0].time);

        // res.data[0].time.forEach(x => {
        //   if (x.date.slice(0, 10) !== this.state.todayDate) {
        //     this.setState({ userDataToday: res.data[0].time });
        //   }
        // });
        // console.log("USER data TODAY", this.state.userDataToday);

        // console.log(
        //   " THIS IS WHAT IM TESTING AGAINST ",
        //   moment().format("YYYY-MM-DD")
        // );

        this.setState({
          userData: res.data[0].time,
          postDates: res.data[0].date
        });
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitTime = () => {
    API.createComparisonTime(localStorage.getItem("email"), {
      scheduledTime: this.state.scheduledTime,
      accumulatedTime: moment.utc(this.state.allTime * 1000).format("HH:mm")
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  render() {
    // console.log("THE DAY TODAY IS", moment().format("dddd"));
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
                ></Card>
              </Col>
              </Row>
              <Row>
                <Col md="6">
                  {/* get this to keep running without page refresh */}
                  <h2>{moment().format('MMMM Do YYYY, h:mm:ss a')}</h2>
                </Col>
              </Row>
            

            <Row>
              <Col xs={12} md={3}>
                
                <div
                  style={{
                    margin: "50px auto 50px auto",
                    padding: "100px",
                    backgroundColor: "#ccc"
                  }}
                >
                  <h3>Planning Time Allotted</h3>
                  <img onClick={this.submitTime} src={plus} alt="plus icon" />
                  <Input
                    type="number"
                    name="scheduledTime"
                    id="exampleNumber"
                    placeholder="number placeholder"
                    onChange={this.handleInputChange}
                  />
                  <h4 style={{ padding: "20px" }}>
                    {/* You recived{" "}
                    {moment
                      .utc(this.state.scheduledTime * 1000)
                      .format("HH:mm")}{" "}
                    hours and minutes of planning time today. */}
                    You recived:{" "}
                    {moment
                      .utc(this.state.scheduledTime * 1000)
                      .format("HH:mm:ss")}{" "}
                    hours/minutes/seconds of planning time today. 
                  </h4>
                  <h4 style={{ padding: "20px" }}>
                    You've spent{" "}
                    {moment.utc(this.state.allTime * 1000).format("HH")}{" "}
                    hours and {moment.utc(this.state.allTime * 1000).format("mm")} minutes on required tasks today.
                  </h4>
                </div>
              </Col>
              <Col xs={12} md={9}>
                <Card className="card-plain">
                  <CardHeader></CardHeader>
                  <CardBody>
                    <Table responsive striped>
                      <tbody>
                        {this.state.categories.map(x => (
                          <CategoryRow
                            getSum={this.getSum(x.category)}
                            category={x.category}
                            name={x.name}
                            array={x}
                          />
                        ))}
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

/* <tr>
                          <td className="text-center">
                            <FormGroup check>
                              <Label check>
                                <Input type="checkbox"></Input>
                                <span className="form-check-sign"></span>
                              </Label>
                            </FormGroup>
                          </td>
                          <Timer />
                          <td>Grading</td>
                          <div>{this.getGradingSum()}</div>
                          <div>
                            {this.state.userData.map( => (
                              <div>{grading}</div>
                            ))}
                          </div>

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
                        </tr> */
/* <tr>
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
                        </tr> */

/* <tr>
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
                        </tr> */

/* <tr>
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
                        </tr> */

/* <tr>
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
                        </tr> */

/* <tr>
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
                        </tr> */
/* <tr>
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
                        </tr> */
