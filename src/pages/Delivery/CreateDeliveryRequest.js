import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Row,
  Col,
  Alert,
  Container,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  FormText,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import MapContainer from "./GoogleMaps/mapApi";
import GoogleAutoCompletePickup from "./GoogleMaps/GoogleAutoCompletePickup";
import GoogleAutoCompleteDropoff from "./GoogleMaps/GoogleAutoCompleteDropOff";

const ModalExample = (props) => {
  const { buttonLabel, className } = props;
};

class CreateDeliveryRequest extends Component {
  state = {
    alertStatus: false,
    startDate: new Date(),
    modalStatus: false,
    modalTimeStatus: false,
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleDateModal = () => {
    if (this.state.modalStatus !== true) {
      this.setState({ modalStatus: true });
    } else {
      this.setState({ modalStatus: false });
    }
  };

  handleTimeModal = () => {
    if (this.state.modalTimeStatus !== true) {
      this.setState({ modalTimeStatus: true });
    } else {
      this.setState({ modalTimeStatus: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container className="themed-container">
            <Modal
              isOpen={this.state.modalStatus}
              toggle={this.handleDateModal}
              className={ModalExample.className}
            >
              <ModalBody>
                <div>
                  <Container className="themed-container" fluid={true}>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={(date) => this.handleChange(date)}
                      inline
                    />
                  </Container>
                </div>
              </ModalBody>
              <ModalHeader>
                <Button onClick={this.handleDateModal} color="primary">
                  Close
                </Button>
              </ModalHeader>
            </Modal>
            <Modal
              isOpen={this.state.modalTimeStatus}
              toggle={this.handleTimeModal}
              className={ModalExample.className}
            >
              <ModalBody>
                <div>
                  <Container className="themed-container" fluid={true}>
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={(date) => this.handleChange(date)}
                      inline
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                    />
                  </Container>
                </div>
              </ModalBody>
              <ModalHeader>
                <Button onClick={this.handleTimeModal} color="primary">
                  Close
                </Button>
              </ModalHeader>
            </Modal>
            <Row xs="2">
              <Col>
                <Form>
                  <FormGroup></FormGroup>
                  <FormGroup>
                    <Label for="Pickup Address">Pickup Address</Label>

                    <GoogleAutoCompletePickup />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Drop off Address</Label>
                    <GoogleAutoCompleteDropoff />
                  </FormGroup>

                  <FormGroup>
                    <Label
                      for="exampleText"
                      placeholder="Enter Special Requirements"
                    >
                      Scope of Delivery
                    </Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                    />
                  </FormGroup>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="Date" placeholder="Pick Date ">
                          Pick Date
                        </Label>
                        <Input
                          type="email"
                          name="date"
                          id="date"
                          onClick={this.handleDateModal}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="Time" placeholder="Pick Time ">
                          Pick Time
                        </Label>

                        <Input
                          type="email"
                          name="time"
                          id="time"
                          onClick={this.handleTimeModal}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                      Attach photos of items, Our delivery drivers will know
                      what to expect and understand scope of works
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <Label for="Time" placeholder="Pick Time ">
                      Delivery budget
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Enter your delivery budget" />
                      <InputGroupAddon addonType="append"></InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="Date" placeholder="Pick Date ">
                          Customer Name
                        </Label>
                        <Input type="email" name="date" id="date" />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="Time" placeholder="Pick Time ">
                          Contact Number
                        </Label>
                        <Input type="email" name="time" id="time" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <div style={{ marginTop: 15 }}></div>
                  <Button color="primary" size="lg" block>
                    Request Delivery
                  </Button>
                </Form>
              </Col>
              <Col>
                <MapContainer />
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateDeliveryRequest;
