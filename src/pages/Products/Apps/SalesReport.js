import React, { Component } from "react";

import ReactApexChart from "react-apexcharts";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

class SalesDashboardReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Revenue per Product",
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: "Sales per Product",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle>Sales Reports</CardTitle>
            <CardSubtitle>Trending Activity</CardSubtitle>
            <Col>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="area"
                height={350}
              />
            </Col>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default SalesDashboardReport;
