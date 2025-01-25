// Class that holds the chart Bars

import "./Chart.css";
import ChartBar from "./ChartBar";


const Chart = (props) => {

// objects -> numbers to pass to max()
const dataPointValues = props.dataPoints.map(dataPoint => dataPoint.value)

// transform an array of 12 elements => 12 separate elements by ','
// spread operator
const totalMaximum = Math.max(...dataPointValues)

  return (
    <div className="chart">
      {
        //going through an array (list of dynamic content)
        //props.dataPoints = array of bars => we create a ChartBar for every element in the array
        //dataPoint.value prop = the Value that should be seen on the bar
        //maxValue = maximum value indicated on the bar (initially is null)
        //label = january, february etc.
        //key prop = helps react render the values efficiently (usually uniquely fetched from the Database)
        props.dataPoints.map((dataPoint) => (
          <ChartBar
            key={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMaximum}
            label={dataPoint.label}
          />
        ))
      }
    </div>
  );
};

export default Chart;
