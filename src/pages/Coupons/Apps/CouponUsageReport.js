import React, { Component } from "react";

import ReactApexChart from "react-apexcharts";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

class CouponUsageReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Coupons Created",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: "Coupons Used",
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: "Revenue from Coupons",
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      options: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
        },
        yaxis: {
          title: {
            text: " Quantity",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return " " + val + "";
            },
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
            <CardTitle>Coupon Usage Reports</CardTitle>
            <CardSubtitle>Mo</CardSubtitle>
            <Col>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                height={350}
              />
            </Col>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default CouponUsageReport;
