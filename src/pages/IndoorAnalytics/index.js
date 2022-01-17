import React, { Component } from "react";
import axios from "axios";
import { Indoor_Analytics_API } from "../../api";
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
  Badge,
  CardText,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Fade,
  FormText,
  Tooltip,
  Alert,
} from "reactstrap";
import ReactApexChart from "react-apexcharts";
import VisitorsGender from "./visitorsGender";

const url = "/api/v1/indoorstoreanalytics/";

class IndoorAnalytics extends Component {
  state = {
    analytics: [],
    female: [],
    male: [],
    api_response: null,
    api_response_status: false,
  };

  componentDidMount() {
    this.handleFetchIndoorAnalytics();
  }

  handleFetchIndoorAnalytics = () => {
    axios
      .get(Indoor_Analytics_API + url)
      .then((response) => {
        console.log(response);
        this.setState({ api_response: response.data.response });
        this.handleGetTheNumberOfManReachedTheShels();
      }, console.log("Eto", this.state))
      .catch((error) => console.log({ error }));
  };

  handleGetTheNumberOfManReachedTheShels = () => {
    let Audience = [];
    let Male = [];
    let Female = [];
    const api_response = this.state.api_response;
    console.log("API", api_response);
    if (api_response) {
      api_response.map((id) => {
        if (id.gender === "man") {
          Male.push({ gender: id.gender, age: id.age });
        } else {
          Female.push({ gender: id.gender, age: id.age });
        }
      });
    }
    this.setState({
      female: Female.length,
      male: Male.length,
      api_response_status: true,
    });
    console.log("Eto array", this.state);
    // for (let i = 0; i < response.length; i++) {
    //   if (response[i].user_id !== response[i + 1].user_id) {
    //     return response[i].age;
    //   }
    // }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <p>The number of Visitors approached yout shelf</p>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle tag="h5">Audience Demographics</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    ------
                  </CardSubtitle>
                  <Row>
                    {!this.state.api_response_status ? null : (
                      <VisitorsGender
                        Male={this.state.male}
                        Female={this.state.female}
                      />
                    )}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default IndoorAnalytics;
