import React from "react";
import HeatMap from "react-heatmap-grid";

const xLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//const xLabels = new Array(7).fill(0).map((_, i) => `${i}`);

// Display only even labels
// const xLabelsVisibility = new Array(7)
//   .fill(0)
//   .map((_, i) => (i % 2 === 0 ? true : false));

const xLabelsVisibility = new Array(7).fill(0).map(() => true);

const yLabels = [
  "12am",
  "2am",
  "4am",
  "6am",
  "8am",
  "10am",
  "12pm",
  "2pm",
  "4pm",
  "6pm",
  "8pm",
  "10pm",
];
const data = new Array(yLabels.length)
  .fill(0)
  .map(() =>
    new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
  );

class ConversionRate extends React.Component {
  render() {
    return (
      <div style={{ fontSize: "13px"}}>
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          yLabelTextAlign={"right"}
          xLabelsLocation={"bottom"}
          xLabelsVisibility={xLabelsVisibility}
          xLabelWidth={100}
          data={data}
          squares={false}
          unit="Viewers"
    
          //onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
          cellStyle={(background, value, min, max, data, x, y) => ({
            background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
            fontSize: "11.5px",
            color: "#444",
          })}
          cellRender={(value) => value && <div>{value}</div>}
        />
      </div>
    );
  }
}
export default ConversionRate;
