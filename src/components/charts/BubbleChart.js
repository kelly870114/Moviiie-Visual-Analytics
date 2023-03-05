import React from "react";
import ReactApexChart from "react-apexcharts";
function generateData(baseval, count, yrange) {
 var i = 0;
 var series = [];
 while (i < count) {
  var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
  var y =
   Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

  series.push([x, y, z]);
  baseval += 86400000;
  i++;
 }
 return series;
}
class BubbleChart extends React.Component {
 constructor(props) {
  super(props);

  this.state = {
   chartData: [],
   chartOptions: {},
  };
 }

 componentDidMount() {
  this.setState({
   chartData: this.props.chartData,
   chartOptions: this.props.chartOptions,
  });
 }

 render() {
  return (
   <div id="chart">
    <ReactApexChart
     options={this.state.chartOptions}
     series={this.state.chartData}
     type="bubble"
     height={350}
     width={700}
    />
   </div>
  );
 }
}

export default BubbleChart;

// const domContainer = document.querySelector('#app');
// ReactDOM.render(React.createElement(ApexChart), domContainer);
