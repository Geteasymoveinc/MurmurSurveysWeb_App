import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class BarDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "All",
          data: this.props.series,
        },
      ],
      options: {
        colors: [
          function ({ value, seriesIndex, w }) {
            return "#7356C0";
          },
        ],

        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
          foreColor: "#ffffff",
        },

        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            borderRadius: 8,
            horizontal: false,
          },
        },
        xaxis: {
          type: "number",
          categories: this.props.categories,
          labels: {
            show: true,
            style: {
              colors: ["#ffffff"],
              fontSize: "12px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        legend: {
          position: "right",
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="100%"
          height={340}
        />
      </div>
    );
  }
}

export default BarDefault;
