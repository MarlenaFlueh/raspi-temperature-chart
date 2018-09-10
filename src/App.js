import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import tempData from "./data";
import Restful from "./utils/img/restapi.png";
import Stack from "./utils/img/stack.png";

const breakpoints = {
  desktop: 1040,
  tablet: 840,
  mobile: 540
};

const container = {
  position: "relative",
  height: "100vh",
  width: "90vw",
  margin: "auto"
};

const heading = {
  fontWeight: "lighter",
  textAlign: "center",
  paddingTop: "2rem"
};

const textBlock = {
  fontSize: "1.1rem",
  lineHeight: "2",
  paddingTop: "2rem",
  paddingBottom: "2rem"
};

const apiImg = {
  width: "80%"
};

const orderedList = {
  fontSize: "1.1rem",
  lineHeight: "1.5"
};

const strongText = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  paddingTop: "1rem"
};

const stackImg = {
  width: "100%"
};

const chartImg = {
  width: "100%"
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
      <div style={container}>
        <h1 style={heading}>Measure temperature with the Raspberry Pi</h1>
        <p style={textBlock}>
          Have you ever wondered what to do as a next Raspberry Pi project? What
          about measuring the temperature and represent it in a chart -
          everything you need is a Raspberry Pi and a temperature sensor. You
          receive the temperature data with the Raspi, then you send the data to
          a Restful API, connected with a database. To display the chart, you
          just get the chart data from the Restful API.
        </p>
        <img src={Stack} style={stackImg} alt="Stack" />
        <p style={strongText}>Possible structure:</p>
        <ol style={orderedList}>
          <li>create Restful API with MongoDB Atlas connection</li>
          <li>receive data with Raspberry Pi from the temperature sensor</li>
          <li>display the temperature as a chart with a React.js app</li>
        </ol>
        <p style={strongText}>1. Restful API</p>
        <p style={textBlock}>
          A Restful API is a programming interface and uses HTTP requests to
          handle data (PUT, GET and DELETE). The API simplifies the
          communication of computer programs. An API also allows to interact
          with cloud services like the MongoDB Atlas database. In the browser it
          can look like that:
        </p>
        <img src={Restful} style={apiImg} alt="Restful API" />
        <p style={strongText}>2. Raspberry Pi and temperature sensor</p>
        <p style={strongText}>3. React app width chart</p>
        <Bar data={this.state.chartData} style={chartImg} />
      </div>
    );
  }
}

export default App;
