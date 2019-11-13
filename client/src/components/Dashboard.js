import React, { Component } from "react";
import API from "./utility/API";
import CategoryRow from "./CategoryRow";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { Auth } from "aws-amplify";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Table,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Alert,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  NavLink,
  NavItem,
  Nav
} from "reactstrap";
import plus from "./images/ic_add_circle_48px.svg";
import play from "./images/ic_play_circle_filled_white_48px.svg";
import stop from "./images/ic_stop_48px.svg";
import background from "./images/pencils_yellow.png";
import plan from "./images/calendar-60.svg";
import clock from "./images/ic_timer_48px.svg";
import charts from "./images/ic_insert_chart_48px.svg";
import { CostExplorer } from "aws-sdk";

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

        res.data[0].time.forEach(x => {
          if (x.date.slice(0, 10) !== this.state.todayDate) {
            this.setState({ userDataToday: res.data[0].time });
          }
        });
        console.log("USER data TODAY", this.state.userDataToday);

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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  submitTime = () => {
    API.createComparisonTime(localStorage.getItem("email"), {
      scheduledTime: this.state.scheduledTime,
      accumulatedTime: this.state.allTime
    })
      .then(res => console.log("THIS IS THE DATA", res.data))
      .catch(err => console.log(err));
  };

  render() {
    // console.log("THE DAY TODAY IS", moment().format("dddd"));
    return (
      <div className="content header-filter">
        <Navbar className="secondary-nav" expand="lg">
          <Container>
            <NavbarBrand className="secondary-nav-text">
              <p>Hello, user!</p>
            </NavbarBrand>
            <NavbarBrand className="mx-auto secondary-nav-text">
              {moment().format("MMMM Do YYYY, h:mm:ss a")}
            </NavbarBrand>

            <Nav navbar>
              <NavItem>
                <NavLink href="/reports" onClick={e => e.preventDefault()}>
                  <Link to="/reports">
                    <img
                      className="chart-icon"
                      src={charts}
                      alt="charts icon"
                    />
                    <p className="secondary-nav-text">Reports</p>
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>

        <Row>
          <Col lg="3" md="6" sm="12">
            <Card className="card-pricing">
              <CardBody>
                <h6 className="category category-title">
                  Planning Time Allotted
                </h6>
                <div className="icon icon-info">
                  <img
                    className="planning-icon"
                    src={plan}
                    alt="planning calendar icon"
                  />
                </div>
                <p className="card-description planning-description">
                  Not including required meetings, picking up/dropping off your
                  class, and going to the bathroom.
                </p>
                <Input
                  onChange={this.handleInputChange}
                  name="scheduledTime"
                  id="exampleNumber"
                  placeholder="time hh:mm"
                  type="text"
                ></Input>
                <img
                  id="plus-btn-planning"
                  onClick={this.submitTime}
                  src={plus}
                  alt="plus icon"
                />
                <p className="card-description planning-description">
                  You recived:{" "}
                  {moment(this.state.scheduledTime, "HH:mm").format("HH:mm:ss")}{" "}
                  hours/minutes/seconds of planning time today.
                </p>
                <div className="icon icon-info">
                  <img
                    className="clock-icon"
                    src={clock}
                    I
                    alt="stopwatch icon"
                  />
                </div>
                <p className="card-description planning-description">
                  You've spent{" "}
                  {/* {moment.utc(this.state.allTime * 1000).format("HH")} hours and{" "} */}
                  {moment.utc(this.state.allTime * 1000).format("HH:MM:ss")}{" "}
                  minutes on required tasks today.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="8" md="6" sm="12">
            <Card className="card-profile">
              <CardBody>
                <Table responsive striped>
                  <tbody className="table-body">
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
    );
  }
}
