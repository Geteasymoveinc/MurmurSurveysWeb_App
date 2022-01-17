
import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class PieChart extends Component {
  constructor(props){
    super(props)
  
  this.state = {
    district: '',
    series: [],
    options: {
      chart: {
        type: "pie",
      },
      
      labels: ['Male', 'Female'],
      colors:['#7356C0', '#3F2B89'],
      stroke: {
        curve: 'smooth',
        width:1,
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
    }
  }
  };
  componentDidMount(){
    this.setState({
      district: this.props.district,
      series:[Number.parseInt(this.props.male), Number.parseInt(this.props.female)]
    })
  }
  componentDidUpdate(prevProps, prevState){
     
    if(prevState.district!==this.props.district){
      console.log('update')
      this.setState({
        district: this.props.district,
        series:[Number.parseInt(this.props.male), Number.parseInt(this.props.female)]
      })
    }
 }
  render() {
    return (
      <div id='chart2'>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          height={120}
          width={500}
        />
     </div>
    );
  }
}

export default PieChart;

