
import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class SeenByWeekDay extends Component {
  state = {
    series: [
      {
        name: "reach",
        data: [54, 255, 841, 867, 522, 343, 1102],
      },
    ],
    options: {
      colors: ["#3F2B89"],
      chart: {
        type: "bar",

        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
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
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
          "01/05/2011 GMT",
          "01/06/2011 GMT",
        ],
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
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width='100%'
          height= {240}
        />
      </div>
    );
  }
}

export default SeenByWeekDay;