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
  Col
} from "reactstrap";

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
    userData: [],
    postDates: [],
    today: moment().format("dddd"),
    todayDate: moment().format("dddd")
  };

  //? ==============================================================//

  //? ==============================================================//
  getSum = category => {
    console.log(category);
    return this.state.userData
      .filter(data => data[category])
      .map(data => parseInt(data[category]))
      .reduce((a, b) => a + b, 0);
  };

  componentDidMount() {
    API.checkUserData(localStorage.getItem("email"))
      .then(res => {
        if (res.data.length === 0) {
          API.createDocument(localStorage.getItem("email"))
            .then(res)
            .catch(err => console.log(err));
        }
        console.log(res.data[0].time);
        console.log(res.data[0].time[0].date.slice(0, 10));
        // console.log(
        //   "THE RES DATE IS",
        // res.data[0].time.filter(
        //   data => data.date.slice(0, 10) === this.state.todayDate
        // );
        // );
        console.log(
          " THIS IS WHAT IM TESTING AGAINST ",
          moment().format("YYYY-MM-DD")
        );
        this.setState({
          userData: res.data[0].time,
          postDates: res.data[0].date
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    // console.log("This here, is the UserData", this.state.userData);
    // console.log("get sum", this.getGradingSum());
    console.log("THE DAY TODAY IS", moment().format("dddd"));
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
              <Col xs={12} md={12}>
                <CardTitle tag="h4">{moment().format("LTS")}</CardTitle>
                <CardTitle tag="h4">Tasks</CardTitle>
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
