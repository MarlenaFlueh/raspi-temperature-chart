import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import tempData from "./data";

class App extends Component {
  state = {
    chartData: {
      labels: null,
      datasets: [
        {
          label: "Temperatur in Lüneburg (Grad Celsius)",
          backgroundColor: "rgb(136, 219, 224)",
          borderColor: "rgb(128, 185, 188)",
          borderWidth: 1,
          data: null
        }
      ]
    }
  };

  async componentDidMount() {
    const res = await tempData();
    const data = res.map(item => item.temp);
    const labels = res.map(item => item.time);

    this.setState(prevState => ({
      chartData: {
        ...prevState.chartData,
        labels,
        datasets: prevState.chartData.datasets.map(set => ({ ...set, data }))
      }
    }));
  }

  render() {
    return <Bar data={this.state.chartData} />;
  }
}

export default App;
