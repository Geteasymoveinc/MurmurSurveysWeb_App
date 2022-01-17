import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class PieChart extends Component {
  state = {
    series: [this.props.Android, this.props.IOS],
    options: {
      chart: {
        type: "pie",
      },
      
      labels: ["Android", "IOS"],
      colors:['#7356C0', '#3F2B89'],
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
      <div id='chart2' className="chart2 chart-general">
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

export default PieChart;