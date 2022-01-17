import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class AgeOfReachedDemographics extends Component {
  state = {
    series: [
      this.props.a,
      this.props.b,
      this.props.c,
      this.props.d,
      this.props.e,
    ],
    options: {
      chart: {
        type: "pie",
      },
      colors: ['#3F2B89', '#3F2B89','#997FD8','#573EA4','#7356C0'],
      labels: ["0-18", "18-25", "25-35", "35-45", "45-65"],
      stroke: {
        curve: 'smooth',
        width:1,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
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
    return (
      <div id='chart3' className="chart3 chart-general">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          height={170}
          width={500}
        />
     </div>
    );
  }
}

export default AgeOfReachedDemographics;