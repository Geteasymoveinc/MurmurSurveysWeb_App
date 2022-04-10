import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class PieChart extends Component {
  state = {
    series: [Number.parseInt(this.props.males), Number.parseInt(this.props.females)],
    options: {
      chart: {
        type: "pie",
      },
      
      labels: this.props.labels,
      colors:['#3F2B89', '#B69EEA'],
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