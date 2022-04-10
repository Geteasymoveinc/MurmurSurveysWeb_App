import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class PieChart extends Component {
  state = {
    series: Object.values(this.props.data),
    options: {
      chart: {
        type: "pie",
      },
      
      labels: this.props.labels,
      colors:[ '#3F2B89', '#1616a8', '#2c2cb8','#5a5aed', '#7272db','#B69EEA'],
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
      <div id='chart2'  className="chart2 chart-streetIQ">
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

export default PieChart;