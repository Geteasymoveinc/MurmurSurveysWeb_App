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
        colors: [ ({ value, seriesIndex, w }) =>  {
          const heighest = this.props.heighest
          if (value ===heighest) {
            return '#7356C0'
          } else {
            return '#B69EEA'
          }
        }],
        chart: {
          redrawOnParentResize: true,
          events: {
            mounted: (chart) => {
              chart.windowResizeHandler();
            }
          }
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
  componentDidUpdate(prevProps){
    if(prevProps.time !== this.props.time || this.props.loaded !== prevProps.loaded){
      this.setState({
        ...this.state,
        series: [
          {
            name: "Users",
            data: this.props.series
          }
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
          categories: this.props.categories
          }
        }
      })
    }
 }
  render() {
    console.log(this.props)
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
