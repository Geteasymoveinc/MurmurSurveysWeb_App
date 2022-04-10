import ReactApexChart from "react-apexcharts";
import React, { Component } from "react";

class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "",
      series: [],
      options: {
        chart: {
          type: "pie",
        },
        labels: this.props.labels,
        colors: ["#7356C0", "#3F2B89"],
        stroke: {
          curve: "smooth",
          width: 1,
        },

        legend: {
          show: true,
          position: "right",
          horizontalAlign: "center",
          floating: false,
          fontSize: "12px",
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 500,
          formatter: undefined,
          inverseOrder: false,
          tooltipHoverFormatter: undefined,
          customLegendItems: [],
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
      },
    };
  }
  componentDidMount() {
    this.setState({
      location: this.props.location,
      series: [
        Number.parseInt(this.props.male),
        Number.parseInt(this.props.female),
      ],
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.location !== this.props.location) {
      console.log("update");
      this.setState({
        location: this.props.location,
        series: [
          Number.parseInt(this.props.male),
          Number.parseInt(this.props.female),
        ],
      });
    }
  }
  render() {
    return (
      <div id="chart-dash1 chart-dash-tooltip" className="chart-dash1 chart-general">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          height={100}
          width={240}
        />
      </div>
    );
  }
}

export default PieChart;
