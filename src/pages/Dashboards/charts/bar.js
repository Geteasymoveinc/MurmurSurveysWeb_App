import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class Bar extends Component {
    constructor(props){
        super(props)
        this.state={
    series: [
      {
        name: 'All',
        data: [44, 55, 41, 67, 22, 43],
      },
      
    ],
    options: {
      colors: [function({ value, seriesIndex, w }) {
   
        if (value === 67) {
          return '#7356C0'
        } else {
          return '#B69EEA'
        }
      }],

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
          horizontal: true,
      
        },
      },
      xaxis: {
        type: "number",
        categories: [
          '18-24',
          '25-35',
          '36-48',
          '49-55',
          '56-78',
          '78+'
        ],
        labels: {
          show: false,
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
  }
}
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width='100%'
          height= {340}
 
        />
      </div>
    );
  }
}

export default Bar;