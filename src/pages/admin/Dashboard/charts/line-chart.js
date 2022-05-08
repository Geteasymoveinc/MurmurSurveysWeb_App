import Chart from "react-apexcharts";
import React, { Component } from "react";
import './chart.css'

class Statistics_Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {

      options: {
        colors: this.props.colors,

        chart: {
          redrawOnParentResize: true,
            events: {
              mounted: (chart) => {
                chart.windowResizeHandler();
              }
            },
          zoom: {
            enabled: false,
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
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },


        xaxis: {
          show:false,
          categories: this.props.categories
        },
      },
      series: [
        {
          name: this.props.name,
          data: this.props.series,
        },
      ],
    };
  }


  componentDidUpdate(prevProps){
    if(prevProps.time !== this.props.time || this.props.loaded !== prevProps.loaded){
      let series = this.props.series
      let categories = this.props.categories
      

       this.setState({
         ...this.state,
         options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: categories
          },
         },
         series: [
           {
             data: series
           }
         ]
       })
     }
  }

  render() {
    return (
      <div id="dashboard">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type= "area"
          width="100%"
          height='100%'
        />
      </div>
    );
  }
}

export default Statistics_Chart;
