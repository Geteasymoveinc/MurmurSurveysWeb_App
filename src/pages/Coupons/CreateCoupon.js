import React, { Component, AnyReactComponent } from "react";
import ImageUploader from "react-images-upload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Collapse,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  FormText,
} from "reactstrap";

class CreateCoupon extends Component {
  state = {
    pictures: [],
    startDate: new Date(),
    isOpen: false,
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
      isOpen: false,
    });
  };

  handleCollape = () => {
    if (this.state.isOpen !== true) {
      this.setState({ isOpen: true });
    } else {
      this.setState({ isOpen: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container className="themed-container">
            <Row>
              <Col>
                <Form>
                  <FormGroup></FormGroup>
                  <FormGroup>
                    <Label for="coupon_code">What is Coupon Code?</Label>

                    <Input
                      type="email"
                      name="description"
                      id="description"
                      placeholder="Enter Coupon Code"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword"> Expire on </Label>
                    <Input
                      type="text"
                      name="expire_date"
                      id="expire_date"
                      value={this.state.startDate}
                      onClick={this.handleCollape}
                    />
                    <Collapse isOpen={this.state.isOpen}>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={(date) => this.handleChange(date)}
                        inline
                      />
                    </Collapse>
                  </FormGroup>

                  <FormGroup>
                    <Label
                      for="exampleText"
                      placeholder="Enter Special Requirements"
                    >
                      Total quantity
                    </Label>
                    <Input type="email" name="description" id="description" />
                  </FormGroup>

                  <FormGroup>
                    <Label for="Time" placeholder="Coupon Value ">
                      Coupon Value
                    </Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>$</InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Enter price for this coupon" />
                      <InputGroupAddon addonType="append"></InputGroupAddon>
                    </InputGroup>
                  </FormGroup>

                  <div style={{ marginTop: 15 }}></div>
                  <Button color="primary" size="lg" block>
                    Create Coupon
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateCoupon;
