import React from "react";
import ReactApexChart from "react-apexcharts";

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
