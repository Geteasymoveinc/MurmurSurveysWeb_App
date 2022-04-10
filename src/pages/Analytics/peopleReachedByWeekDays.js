import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class PeopleReachedByWeekDay extends Component {
  state = {
    series: [
      {
        name: "reach",
        data: [44, 55, 41, 67, 22, 43, 102],
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
        foreColor: '#ffffff'
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
        categories: this.props.categories,
        labels: {
          show: true,
          style: {
            colors: ['#ffffff'],
            fontSize: '12px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-yaxis-label',
        },
        }
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

export default PeopleReachedByWeekDay;