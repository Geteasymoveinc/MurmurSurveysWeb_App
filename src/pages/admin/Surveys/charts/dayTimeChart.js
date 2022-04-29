import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class DayTimeChart extends Component {
  state = {
    series: [
      {
        name: "Metric1",
        data:
          (18,
          {
            min: 0,
            max: 90,
          }),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "heatmap",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#008FFB"],
      title: {
        text: "HeatMap Chart (Single color)",
      },
    },
  };

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="heatmap"
   
        />
      </div>
    );
  }
}

export default DayTimeChart;
