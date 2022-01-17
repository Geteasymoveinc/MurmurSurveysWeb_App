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
  CardSubtitle,
  CardText,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media,
  Table,
} from "reactstrap";
import CSVReader from "react-csv-reader";

class SMSMArketing extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Card>
            <Button></Button>
            <CSVReader
              onFileLoaded={(data, fileInfo) => console.dir(data, fileInfo)}
            />
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default SMSMArketing;
