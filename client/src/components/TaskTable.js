import React from "react";
// import DashboardNav from "./DashboardNav";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Button,
  Col
} from "reactstrap";

// core components
import PanelHeader from "./PanelHeader";

// import { thead, tbody } from "variables/general";

class TaskTable extends React.Component {
    
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
            {/* <Row>
                <DashboardNav auth={authProps} />
            </Row> */}
          <Row>
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
            <Col xs={8}>
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Table on Plain Background</CardTitle>
                  <p className="category"> Here is a subtitle for this table</p>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Monday</th>
                      </tr>
                    </thead>
                    <tbody>
                          <tr>
                             <td>Grading </td>
                          </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default TaskTable;