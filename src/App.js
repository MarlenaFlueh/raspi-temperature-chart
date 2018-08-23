import React, { Component } from "react";

import { Bar } from "react-chartjs-2";
import { tempData } from "./data";

class App extends Component {
  state = {
    chartData: {}
  };

  componentWillMount() {
    let temperatures = Object.values(tempData);
    let times = Object.keys(tempData);

    this.setState({
      chartData: {
        labels: times,
        datasets: [
          {
            label: "Temperatur in Grad Celsius",
            backgroundColor: "rgb(220, 220,	220)",
            data: temperatures
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
