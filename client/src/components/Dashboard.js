import React, { Component } from "react";
import API from "./utility/API";
import CategoryRow from "./CategoryRow";
import "./Dashboard.css";
import moment from "moment";
import UpdateModal from "./UpdateModal";

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
let counterCat = "";

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
    todayDate: moment().format("YYYY-MM-DD"),
    allTime: [],
    clockRunning: false,
    counter: 0,
    counterCategory: ""
  };

  //? ==============================================================//

  //? ==============================================================//
  getSum = category => {
    return this.state.userData
      .filter(data => data[category])
      .map(data => parseInt(data[category]))
      .reduce((a, b) => a + b, 0);
  };

  // triggerRerender = () => {
  //   console.log("Test rerender");
  // };

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
  };

  componentDidMount() {
    API.checkUserData(localStorage.getItem("email")) //? ======== Checks to see if user has a document associated, Creats one if they don't ======== //

      .then(res => {
        if (res.data.length === 0) {
          API.createDocument(localStorage.getItem("email"))
            .then(res)
            .catch(err => console.log(err));
        }

        todaysDataArr = []; //? ======== get acumulated time data for the user submit function ======== //
        res.data[0].time.forEach(x => {
          if (
            moment(x.date)
              .subtract(5, "hours")
              .format("YYYY-MM-DD") === this.state.todayDate
          ) {
            todaysDataArr.push(x);
          }
        });
        this.setState({ userDataToday: todaysDataArr });

        //! CHANGE THIS LATER // So that if a submitted time already exists, prompt the user if they wish to update ir keep the same
        todaysSchduledTimeArr = [];
        res.data[0].comparisonTime.forEach(x => {
          if (
            moment(x.date)
              .subtract(5, "hours")
              .format("YYYY-MM-DD") === this.state.todayDate
          ) {
            // console.log("What is this?", x.scheduledTime);
            todaysSchduledTimeArr.push(x.scheduledTime);
          }
        });
        this.setState({ scheduledTimeToday: todaysSchduledTimeArr[0] });
        //! CHANGE THIS LATER //

        this.setState({ userDataToday: todaysDataArr });

        //?======== Sums only todays data ///////
        this.addAllTimeData(this.state.userDataToday);

        this.setState({
          userData: this.state.userDataToday
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

  startClockRunning = x => {
    console.log("++++++++ ITS RUNNING +++++++++++");
    counterCat = x;
    return this.setState({
      counterCategory: counterCat,
      clockRunning: !this.state.clockRunning
    });
  };

  stopClockRunning = x => {
    console.log("++++++++ ITS NOT RUNNING +++++++++++", x);
    // this.setState({});
    this.setState({
      clockRunning: !this.state.clockRunning,
      counter: this.state.counter
    });
    console.log("Counter", this.state.counterCategory);
    console.log(counterCat);
  };

  updateCounter = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    console.log(this.state.allTime);

    const currentUser = localStorage.getItem("CognitoIdentityServiceProvider.333cmqjblblchgm61rg8nankre.LastAuthUser");

    return (
      <div className="content header-filter">
        <Navbar className="secondary-nav" expand="lg">
          <Container>
            <NavbarBrand className="secondary-nav-text">
              <p>Hello, {currentUser}!</p>
            </NavbarBrand>
            <NavbarBrand className="mx-auto secondary-nav-text">
              <CurrentTime />
            </NavbarBrand>
            
              <NavbarBrand href="/reports">
                    <img
                      className="chart-icon"
                      src={charts}
                      alt="charts icon"
                    />
                    <p className="secondary-nav-text">Reports</p>
              </NavbarBrand>
          </Container>
        </Navbar>

        <Row className="dashboard-container">
          <Col lg="3" md="12" sm="12">
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
                  Not including required meetings, and picking up/dropping off your
                  class.
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
          <Col lg="8" md="12" sm="12">
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
                        startClock={this.startClockRunning}
                        stopClock={this.stopClockRunning}
                        clockStatus={this.state.clockRunning}
                        // triggerRerender={this.triggerRerender}
                        counter={this.state.counter}
                        updateCounter={this.updateCounter}
                        counterCategory={this.state.counterCategory}
                        rerender={this.butt}
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
