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
        },
      },
      series: [
        {
          data: this.props.series,
        },
      ],
    };
  }


  componentDidUpdate(prevProps){
     if(prevProps.time !== this.props.time){
       this.setState({
         ...this.state,
         series: [
           {
             data: this.props.series
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
