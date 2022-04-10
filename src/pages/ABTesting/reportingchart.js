import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import "./apexchart.css";

class ReportingChart extends Component {
  constructor(props){
    super(props)
  
  this.state = {

    series: [
 
      {
        name: "Variant 1",
        data: [1000, 3000, 2500,5000, 8000, 10000, 9000],
      
      },
      {
        name: "Variant 2",
        data: [1000, 5000, 3000,5000, 7000, 9000, 7000],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      colors: ["#C9E165", "#FEBD59"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        /* type: "datetime",*/
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sut", "Sun"],
      },
      tooltip: {
        /* x: {
          format: "dd/MM/yy HH:mm",
        },*/
      },
      title: {
        text: "Variant Statistics",
        style: {
          fontFamily: "Montserrat",
          color: "#192038",
          fontWeight: "500",
          fontSize: "16px",
          lineHeight: "24px",
        },
      },
      subtitle: {
        text: "Integer ipsum amet in potenti.",
        style: {
          fontFamily: "Montserrat",

          fontSize: "14px",
          lineHeight: "20px",

          letterSpacing: "0.0015em",

          /* Basic colors/Neutral 600 */

          color: "#8F9BB3",
        }
      }
    }
  }
}

  render() {
    return (
      <div id="chart-report">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={350}
        />
      </div>
    );
  }
}

export default ReportingChart;
