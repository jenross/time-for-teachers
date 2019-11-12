import React from 'react';
import Hero from './Hero';
import Select from "react-select";
import './Home.css';
import watch from './images/ic_watch_later_48px.svg';
import graph from './images/ic_insert_chart_48px.svg';
import send from './images/send-2.svg';

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

function Home() {
  const [specialitySelect, setSpecialitySelect] = React.useState(null);
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("about-us");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("about-us");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <div className="wrapper">
        <Hero />
        <div className="section">
          <div className="about-description text-center">
            <div className="features-3">
              <Container className="how-it-works-container">
                <Row>
                  <Col className="how-it-works mr-auto ml-auto" md="8">
                    <h2 className="section-title">How it Works</h2>
                    <h4 className="description">
                    <span className="italic">Time for Teachers</span> helps school districts track the time teachers are spending on required tasks and measures it against how much planning time they actually get.
                    </h4>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <div className="info info-hover">
                      <div className="icon icon-success icon-circle">
                        <img className="img-icon" src={watch} alt="watch icon" />
                      </div>
                      <h4 className="info-title">Time Tracking</h4>
                      <p className="description">
                        Use the timer to track required tasks and planning time. 
                      </p>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="info info-hover">
                      <div className="icon icon-info icon-circle">
                        <img className="img-icon" src={graph} alt="graph icon" />
                      </div>
                      <h4 className="info-title">Report Generation</h4>
                      <p className="description">
                        Beautiful charts are automatically generated to show teachers' personal time, as well as the consolidated district averages.
                      </p>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="info info-hover">
                      <div className="icon icon-primary icon-circle">
                        <img className="img-icon" src={send} alt="send icon" />
                      </div>
                      <h4 className="info-title">Automatic Distribution</h4>
                      <p className="description">
                        Your district's consolidated reports can be sent to state and local officials, as well as the press. 
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          <div className="separator-line"></div>
            
                
          <div className="about-contact">
            <Container>
              <Row>
                <Col className="mr-auto ml-auto" md="8">
                  <h2 className="text-center section-title">Any questions?</h2>
                  <h4 className="text-center description">
                    We'll get back to you as quickly as possible. We know how valuable your time is.
                  </h4>
                  <Form className="contact-form">
                    <Row>
                      <Col md="4">
                        <label>First name</label>
                        <InputGroup
                          className={firstFocus ? "input-group-focus" : ""}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons users_circle-08"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            autoComplete="firstname"
                            placeholder="First Name..."
                            type="text"
                            onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)}
                          ></Input>
                        </InputGroup>
                      </Col>
                      <Col md="4">
                        <label>Your email</label>
                        <InputGroup
                          className={emailFocus ? "input-group-focus" : ""}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons ui-1_email-85"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            autoComplete="email"
                            placeholder="Email Name..."
                            type="text"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                          ></Input>
                        </InputGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label className="control-label">I'm a...</label>
                          <Select
                            className="react-select"
                            onChange={value => setSpecialitySelect(value)}
                            classNamePrefix="react-select"
                            placeholder="Occupation"
                            value={specialitySelect}
                            name=""
                            options={[
                              {
                                value: "1",
                                label: "Teacher"
                              },
                              { value: "2", label: "Union Representative" },
                              { value: "3", label: "Reporter" }, 
                              { value: "4", label: "Other" }
                            ]}
                          ></Select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-auto mr-auto text-center" md="4">
                        <Button
                          className="btn-round lets-talk mt-4"
                          size="lg"
                        >
                          Let's talk
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
