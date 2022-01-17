import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

class AudienceManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Audience Manager"
              breadcrumbItem="Audience Manager"
            />
            <h1>Not Available</h1>
            <Row>
              <Col></Col>
              <Col></Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default AudienceManager;
