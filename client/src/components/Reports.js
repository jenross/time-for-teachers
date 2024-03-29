import React, { Component } from "react";
import "./Reports.css";
import {
  // Card,
  // CardBody,
  // CardHeader,
  // CardTitle,
  // Table,
  Row
  // Col,
  // Input,
  // Container
} from "reactstrap";

export default class Reports extends Component {
    render() {
        document.cookie = 'same-site-cookie=foo; SameSite=Lax';
        document.cookie = 'cross-site-cookie=bar; SameSite=None; Secure';
        return (
            <div className="main-container">
                    <div className="reports-container">
                        <Row className="chart-row">
                        
                            <iframe title="myTime" className="chart left" src="https://charts.mongodb.com/charts-project-0-gzgvf/embed/charts?id=6ee66a38-1145-4329-a93b-7ef939a04298&tenant=68dc28ae-bfb9-4609-b84d-aec2600b3c0b"></iframe>
                    
                            <iframe title="myTotalTime" className="chart" src="https://charts.mongodb.com/charts-project-0-gzgvf/embed/charts?id=edfd5192-2a4a-44ca-bef0-7c58864fa9ed&tenant=68dc28ae-bfb9-4609-b84d-aec2600b3c0b"></iframe>
        
                        </Row>
                        <Row className="second">
                        <iframe title="districtTime" className="chart left" src="https://charts.mongodb.com/charts-project-0-gzgvf/embed/charts?id=ee137418-f5ac-4cd0-8252-0bbd5c7e0866&tenant=68dc28ae-bfb9-4609-b84d-aec2600b3c0b"></iframe>
                        <iframe title="districtTotalTime" className="chart" src="https://charts.mongodb.com/charts-project-0-gzgvf/embed/charts?id=000f14fa-df06-4efa-a74a-e76847fb145d&tenant=68dc28ae-bfb9-4609-b84d-aec2600b3c0b"></iframe>
                        </Row>
                    </div>
            </div>
        )
    }
}
