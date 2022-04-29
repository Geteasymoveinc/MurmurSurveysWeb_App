import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";
import './chart.css'

class BarHorisontal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: "Users",
          data: this.props.series,
        },
      ],
      options: {
        colors: [ function({ value, seriesIndex, w }) {
   
          if (value ===77) {
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
            columnWidth: '45%',
          },
        },
        xaxis: {
          type: "number",
          categories: [
            "18-24",
            "25-35",
            "36-48",
            "49-55",
            "56-78",
            "78+",
          ],
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
  componentDidUpdate(prevProps){
    if(prevProps.time !== this.props.time){
      this.setState({
        ...this.state,
        series: [
          {
            name: "Users",
            data: this.props.series
          }
        ]
      })
    }
 }
  render() {
    return (
  
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="100%"
          height='100%'
        />

    );
  }
}

export default BarHorisontal;
