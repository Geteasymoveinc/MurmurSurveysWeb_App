import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";
import './pies.css'


class PeopleReachedByWeekDay extends Component {
  constructor(props){
    super(props)
    this.state = {
      district: '',
      series: [
        {
          name: "age",
          data: [],
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
          type: "Array",
          categories: [],
          labels: {
            show: false,
            style: {
              colors: ["#ffffff"],
              fontSize: "12px",
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
    }
  }
  componentDidMount(){
    this.setState({
      district: this.props.district,
      series:[{
        name: 'age',
        data: this.props.data
      }],
      options:{
         ...this.state.options, 
         xaxis: {
           ...this.state.options.xaxis, categories: this.props.labels
         }
      }
    })
  }
  componentDidUpdate(prevProps, prevState){
     
     if(prevState.district!==this.props.district){
       console.log('update')
       this.setState({
         district: this.props.district,
         series:[{
           name: 'age',
           data: this.props.data
         }],
         options:{
            ...this.state.options, 
            xaxis: {
              ...this.state.options.xaxis, categories: this.props.labels
            }
         }
       })
     }
  }
  render() {
    console.log(this.state.series[0].data)
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width='100%'
          height= {120}
 
        />
      </div>
    );
  }
}

export default PeopleReachedByWeekDay;