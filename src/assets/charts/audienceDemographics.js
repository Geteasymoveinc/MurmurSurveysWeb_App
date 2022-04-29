import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class AudienceDemographicsPieChart extends Component {
  state = {
    series: [this.props.Male, this.props.Female],
    options: {
      chart: {
        type: "pie",
      },
      labels: ["Male", "Female"],
      colors: ["#3F2B89", "#7356C0"],
      stroke: {
        curve: 'smooth',
        width:1,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
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
      <div id="chart1" className="chart1 chart-general">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          height={160}
          width={500}
        />
      </div>
    );
  }
}

export default AudienceDemographicsPieChart;
