import React, { Component } from "react";

import ReactApexChart from "react-apexcharts";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";

class StoreEfficiencyReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [100],
      options: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "97%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#556ee6",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: -2,
                fontSize: "22px",
              },
            },
          },
        },
        grid: {
          padding: {
            top: -10,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
        labels: ["Average Results"],
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <CardTitle>Store Efficiency Report</CardTitle>
            <CardSubtitle>Store Visibility</CardSubtitle>
            <Col>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="radialBar"
              />
            </Col>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default StoreEfficiencyReport;
