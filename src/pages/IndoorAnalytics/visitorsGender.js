import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class VisitorGender extends Component {
  state = {
    //series: [this.props.Male, this.props.Female],
    series: [this.props.Male, this.props.Female],
    options: {
      chart: {
        width: 200,
        height: 180,
        type: "pie",
      },
      labels: ["Male", "Female"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };
  render() {
    console.log(this.props);
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          //width={380}
          height={190}
        />
      </div>
    );
  }
}

export default VisitorGender;
