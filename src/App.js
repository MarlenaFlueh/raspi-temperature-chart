import React, { Component } from "react";

import { Bar } from "react-chartjs-2";
import { dataArray } from "./getData";

class App extends Component {
  state = {
    chartData: {}
  };

  componentWillMount() {
    let tempArry = [];
    let timesArray = [];

    dataArray.map(item => tempArry.push(item.degree));
    dataArray.map(item => timesArray.push(item.degree));

    this.setState({
      chartData: {
        labels: timesArray,
        datasets: [
          {
            label: "Temperatur in Grad Celsius",
            backgroundColor: "rgb(220, 220,	220)",
            data: tempArry
          }
        ]
      }
    });
  }

  render() {
    return <Bar data={this.state.chartData} />;
  }
}

export default App;
