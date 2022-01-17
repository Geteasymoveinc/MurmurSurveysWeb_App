import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

class DeliveryPieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 67, 83],
      options: {
        chart: {
          height: 350,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontSize: "16px",
              },
              total: {
                show: true,
                label: "Total",
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                },
              },
            },
          },
        },
        labels: [
          "Scheduled",
          "In Progress Deliveries",
          "Completed Deliveries",
          "Canceled Orders",
        ],
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle>Delivery Reports</CardTitle>
            <CardSubtitle>Success Rate </CardSubtitle>
            <Col sm="6">
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="radialBar"
                height={250}
                width={250}
              />
            </Col>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default DeliveryPieChart;
