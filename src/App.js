import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import tempData from "./data";

const divStyle = {
  position: "relative",
  height: "90vh",
  width: "90vw"
};

const headingStyle = {
  "font-weight": "lighter"
};

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
    return (
      <div style={divStyle}>
        <div>
          <h1 style={headingStyle}>Temperatur Messung mit dem Raspberry Pi</h1>
        </div>
        <Bar data={this.state.chartData} />
      </div>
    );
  }
}

export default App;
