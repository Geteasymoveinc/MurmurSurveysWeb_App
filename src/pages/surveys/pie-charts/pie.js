import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";


import '../../../assets/css/surveys/apexchart/index.css'


class Pie extends Component{
    constructor(props){
        super(props)
        this.state={
            series: [44, 55, 34,44,55,65],
             options: {
            
                chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Team A', 'Team B','Team A', 'Team B','Team A', 'Team B'],
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
        <div id='chart-survey'>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="pie"
              height={160}
              width={500}
            /> 
            </div>
        )
    }
}


export default Pie