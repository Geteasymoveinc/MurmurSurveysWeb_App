import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";


import '../../../assets/css/surveys/apexchart/index.css'


class Pie extends Component{
  constructor(props){
      super(props)
      this.state={
          series: this.props.series,
           options: {
          
              chart: {
              width: 380,
              type: 'pie',
            },
            labels: this.props.categories,
            legend:{
             show:this.props.show_categories
            },
            colors:['#7356C0', '#3F2B89'],
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
            }
      }
  }

  render(){
      return(
      <div className="chart2 chart-general">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="pie"
            height={230}
          width='100%'
          /> 
          </div>
      )
  }
}

export default Pie