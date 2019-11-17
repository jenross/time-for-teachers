import React, { Component } from "react";
import API from "./utility/API";
import CategoryRow from "./CategoryRow";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import moment from "moment";
// import { Auth } from "aws-amplify";
import {
  // Button,
  Card,
  CardBody,
  // CardHeader,
  Table,
  // CardFooter,
  // CardTitle,
  // Label,
  // FormGroup,
  // Form,
  Input,
  // InputGroupAddon,
  // InputGroupText,
  // InputGroup,
  Container,
  // Alert,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  NavLink,
  NavItem,
  Nav
} from "reactstrap";
import plus from "./images/ic_add_circle_48px.svg";
// import play from "./images/ic_play_circle_filled_white_48px.svg";
// import stop from "./images/ic_stop_48px.svg";
// import background from "./images/pencils_yellow.png";
import plan from "./images/calendar-60.svg";
import clock from "./images/ic_timer_48px.svg";
import charts from "./images/ic_insert_chart_48px.svg";
// import { CostExplorer } from "aws-sdk";
import CurrentTime from "./CurrentTime";

const allTimeArr = [];
let todaysDataArr = [];
let todaysSchduledTimeArr = [];

export default class Dashboard extends Component {
  state = {
    categories: [
      {
        name: "Grading",
        category: "grading",
        convertedTime: "gradingConverted"
      },
      {
        name: "Lesson Planning",
        category: "lessonPlanning",
        convertedTime: "lessonPlanningConverted"
      },
      {
        name: "Planning & Organizing Special Events",
        category: "specialEventPlanning",
        convertedTime: "specialEventPlanningConverted"
      },
      {
        name: "Communication",
        category: "communications",
        convertedTime: "communicationsConverted"
      },
      {
        name: "Legal Documentation & Paperwork",
        category: "paperwork",
        convertedTime: "paperworkConverted"
      },
      {
        name: "Mandatory Trainings & Continuing Education",
        category: "continuingEducation",
        convertedTime: "continuingEducationConverted"
      },
      { name: "Other", category: "other", convertedTime: "otherConverted" }
    ],
    scheduledTime: 0,
    scheduledTimeToday: 0,
    userData: [],
    userDataToday: [],
    today: moment().format("dddd"),
    todayDate: moment()
      .add(5, "hours") //? accounts for the 5 hour differenc in the mongo timestamp//
      .format("YYYY-MM-DD"),
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
    console.log(data);
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

    // console.log(data);
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
        //? =============================================================================================//
        //? ======== get acumulated time data for the user submit function ======== //

        todaysDataArr = [];
        res.data[0].time.forEach(x => {
          if (x.date.slice(0, 10) === this.state.todayDate) {
            todaysDataArr.push(x);
          }
        });
        this.setState({ userDataToday: todaysDataArr });
        // console.log("USER DATA TODAY", this.state.userDataToday);
        // console.log(this.state.userDataToday);
        //! CHANGE THIS LATER //
        todaysSchduledTimeArr = [];
        res.data[0].comparisonTime.forEach(x => {
          if (x.date.slice(0, 10) === this.state.todayDate) {
            console.log("What is this?", x.scheduledTime);
            todaysSchduledTimeArr.push(x.scheduledTime);
          }
        });
        this.setState({ scheduledTimeToday: todaysSchduledTimeArr[0] });
        //! CHANGE THIS LATER //

        this.setState({ userDataToday: todaysDataArr });

        //!========//
        this.addAllTimeData(this.state.userDataToday);
        // console.log(this.state.allTime);
        //!========//

        this.setState({
          userData: this.state.userDataToday
        });

        // console.log(res.data[0].comparisonTime);
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
    if (this.state.scheduledTime) {
      //? prevent the user from submitting without adding time //
      API.createComparisonTime(localStorage.getItem("email"), {
        scheduledTime: this.state.scheduledTime.replace(/:/gi, "."),
        accumulatedTime: moment
          .utc(this.state.allTime * 1000)
          .format("HH:mm")
          .replace(/:/gi, ".")
      })
        .then(res => console.log("THIS IS THE DATA", res.data))
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log(this.state.allTime);
    return (
      <div className="content header-filter">
        <Navbar className="secondary-nav" expand="lg">
          <Container>
            <NavbarBrand className="secondary-nav-text">
              <p>Hello, user!</p>
            </NavbarBrand>
            <NavbarBrand className="mx-auto secondary-nav-text">
              <CurrentTime />
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
                {this.state.scheduledTimeToday ? ( //? ternerrary to display different message if the user has ot hasn't added their time for the day
                  <p className="card-description planning-description">
                    You recived:{" "}
                    {moment(this.state.scheduledTimeToday, "HH:mm").format(
                      "HH:mm:ss"
                    )}{" "}
                    hours/minutes/seconds of planning time today.
                  </p>
                ) : (
                  <p className="card-description planning-description">
                    Input the time you recived for all planning time today
                  </p>
                )}
                <div className="icon icon-info">
                  <img
                    className="clock-icon"
                    src={clock}
                    I
                    alt="stopwatch icon"
                  />
                </div>
                {this.state.allTime ? (
                  <p className="card-description planning-description">
                    You've spent{" "}
                    {moment.utc(this.state.allTime * 1000).format("HH:mm")}{" "}
                    minutes on required tasks today.
                  </p>
                ) : (
                  <p className="card-description planning-description">
                    You currently have no time inputed for today
                  </p>
                )}
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
                        convertedTime={x.convertedTime}
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
