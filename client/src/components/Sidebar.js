import React from "react";
// import { NavLink } from "react-router-dom";
// // used for making the prop types of this component
// import PropTypes from "prop-types";
// // javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from "perfect-scrollbar";
import Play from './images/ic_play_circle_filled_white_48px.svg'
import './Sidebar.css';

// reactstrap components
import { 
  // Container, 
  // Row, 
  Col, Card, CardBody, CardTitle, Button } from "reactstrap";

class Sidebar extends React.Component {
    render() {
        return (
            // <div className="section section-cards">
            //     <Container>
            //         <Row>
            //         <Col className="text-center" md="4">
            //             <div className="sidebar-container section-description">
            //             <h2 className="title">Timer</h2>
            //             <h6 className="category">Log time for each task</h6>
            //                 <div className="icons-nucleo">
            //                     <img className="play-button" src={Play} alt="play button" />
            //                 </div>
            //             </div>
            //         </Col>
            //         </Row>
            //     </Container>
            // </div>
            <Col md="4">
                <Card
                  className="card-pricing card-background card-raised"
                  style={{
                    backgroundImage:
                      "url(" + require("assets/img/pricing2.jpg") + ")"
                  }}
                >
                  <CardBody>
                    <h5 className="category text-info">Professional</h5>
                    <CardTitle tag="h1">
                      <small>$</small>
                      29
                    </CardTitle>
                    <ul>
                      <li>
                        <b>5GB</b> Disk Space
                      </li>
                      <li>
                        <b>50GB</b> Monthly Bandwidth
                      </li>
                      <li>
                        <b>10</b> Email Accounts
                      </li>
                      <li>
                        <b>Unlimited</b> subdomains
                      </li>
                    </ul>
                    <Button
                      className="btn-neutral btn-round"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                    >
                      Sign Up
                    </Button>
                  </CardBody>
                </Card>
              </Col>
        );
    }
};

export default Sidebar;