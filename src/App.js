import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import tempData from "./data";

const divStyle = {
  position: "relative",
  height: "100vh",
  width: "60vw",
  margin: "auto"
};

const headingStyle = {
  "font-weight": "lighter",
  "text-align": "center"
};

const textStyle = {
  "font-size": "1.1rem",
  padding: "1rem",
  "line-height": "2"
};

class App extends Component {
  state = {
    chartData: {
      labels: null,
      datasets: [
        {
          label: "Temperature, Lüneburg (degree Celsius)",
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
        <h1 style={headingStyle}>Measure temperature with the Raspberry Pi</h1>
        <p style={textStyle}>
          Have you ever wondered what to do as a next project with your
          Raspberry Pi? What about measuring the temperature and represent it in
          a chart - everything you need is a Raspberry Pi and a temperature
          sensor. You receive the temperature data with the Raspi, then you send
          the data to a Restful API, connected with a database. To display the
          chart, you just get the chart data from the Restful API.
        </p>
        <Bar data={this.state.chartData} />
      </div>
    );
  }
}

export default App;
