import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class Impressions_and_Views extends Component {
  state = {
    series: [this.props.Impressions, this.props.Views],
    options: {
      chart: {
        type: "pie",
      },

      labels: ["Impresions", "views"],
      colors: ["#7356C0", "#3F2B89"],
      stroke: {
        curve: "smooth",
        width: 1,
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
      <div id="chart2" className="chart2 chart-general">
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

export default Impressions_and_Views;
