import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

class CampaignData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <Row md="6">
            <Col xs="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Total Number of Drivers </CardTitle>
                  <CardText>20</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="2">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Total Number of Miles </CardTitle>

                  <CardText>842</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="2">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Total Impressions</CardTitle>

                  <CardText>1,800574</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="2">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Total Engagements</CardTitle>

                  <CardText>1,580,401</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="2">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Total Population Density</CardTitle>

                  <CardText>2,245,102</CardText>
                </CardBody>
              </Card>
            </Col>
            <Col xs="2">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Total Campaign Cost </CardTitle>

                  <CardText>$14,745.85</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default CampaignData;
