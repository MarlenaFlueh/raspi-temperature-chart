import React, { Component } from "react";

import { Bar } from "react-chartjs-2";
import { tempData } from "./data";

class App extends Component {
  state = {
    chartData: {
      labels: ["11 Uhr", "12 Uhr", "13 Uhr", "14 Uhr"],
      datasets: [
        {
          label: "Temperatur in Grad Celsius",
          backgroundColor: "rgb(220, 220,	220)",
          data: tempData
        }
      ]
    }
  };

  render() {
    return <Bar data={this.state.chartData} />;
  }
}

export default App;
