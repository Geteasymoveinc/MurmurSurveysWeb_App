import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class PeopleReachedByWeekDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      series: [
        {
          name: "reach",
          data: [1,2,3,4,5,6],
        },
      ],
      options: {
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false,
          position: "right",
          showForSingleSeries: true,
          customLegendItems: ['0-19','20-29', '30-39','40-49','50-59'],
          borderRadius: 12,
          markers: {
            fillColors: [
              "#3F2B89",
              "#573EA4",
              "#7356C0",
              "#997FD8",
              "#B69EEA",
              "#B69EEA",
            ],
          },
        },

        chart: {
          type: "bar",
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
          foreColor: "blue",
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
            borderRadius: 2,
            horizontal: false,
          },
        },
        xaxis: {
          labels: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        fill: {
          opacity: 1,
          colors: ["#3F2B89", "#573EA4", "#7356C0", "#997FD8", "#B69EEA","#B69EEA"],
        },
        
        tooltip: {
          followCursor: true,
          onDatasetHover: {
            highlightDataSeries: true,
          },
  
        }
      }
    }
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      location: this.props.location,
      series: [
        {
          data: this.props.data.slice(0,5),
        },
      ],
      options: {
        ...this.state.options,
        labels: this.props.labels.slice(0,5),
        colors: ["#3F2B89", "#573EA4", "#7356C0", "#997FD8", "#B69EEA","#B69EEA"],
        legend: {
          ...this.state.options.legend,
          customLegendItems: this.props.labels.slice(0, 5)
        }
        }
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.props.location) {
      console.log("update");

      this.setState({
        ...this.state,
        location: this.props.location,
        series: [
          {
            data: this.props.data.slice(0,5),
          },
        ],
        options: {
          ...this.state.options,
          labels: this.props.labels.slice(0,5),
          colors: ["#3F2B89", "#573EA4", "#7356C0", "#997FD8", "#B69EEA","#B69EEA"],
          legend: {
            ...this.state.options.legend,
            customLegendItems: this.props.labels.slice(0, 5)
          }
          
        }
      });
    }
  }
  render() {
    console.log(this.state.options.legend);
    return (
      <div id="chart-dash2" className="chart-dash2">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width={250}
          height={122}
        />
      </div>
    );
  }
}

export default PeopleReachedByWeekDay;
