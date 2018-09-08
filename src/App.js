import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import tempData from "./data";
import Restful from "./utils/img/restapi.png";
import Stack from "./utils/img/stack.png";

const divStyle = {
  position: "relative",
  height: "100vh",
  width: "50vw",
  margin: "auto"
};

const headingStyle = {
  "font-weight": "lighter",
  "text-align": "center",
  "padding-top": "2rem"
};

const textStyle = {
  "font-size": "1.1rem",
  "line-height": "2",
  "padding-top": "2rem",
  "padding-bottom": "2rem"
};

const RestapiStyle = {
  height: "40%",
  width: "40%"
};

const olStyle = {
  "font-size": "1.1rem",
  "line-height": "1.5"
};

const strongStyle = {
  "font-size": "1.1rem",
  "font-weight": "bold",
  "padding-top": "1rem"
};

const stackStyle = {
  width: "80%",
  "margin-left": "10%"
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
          Have you ever wondered what to do as a next Raspberry Pi project? What
          about measuring the temperature and represent it in a chart -
          everything you need is a Raspberry Pi and a temperature sensor. You
          receive the temperature data with the Raspi, then you send the data to
          a Restful API, connected with a database. To display the chart, you
          just get the chart data from the Restful API.
        </p>
        <img src={Stack} style={stackStyle} alt="Stack" />
        <p style={strongStyle}>Possible structure:</p>
        <ol style={olStyle}>
          <li>create Restful API with MongoDB Atlas connection</li>
          <li>receive data with Raspberry Pi from the temperature sensor</li>
          <li>display the temperature as a chart with a React.js app</li>
        </ol>
        <p style={strongStyle}>1. Restful API</p>
        <p style={textStyle}>
          A Restful API is a programming interface and uses HTTP requests to
          handle data (PUT, GET and DELETE). The API simplifies the
          communication of computer programs. An API also allows to interact
          with cloud services like the MongoDB Atlas database. In the browser it
          can look like that:
        </p>
        <img src={Restful} style={RestapiStyle} alt="Restful API" />
        <p style={strongStyle}>2. Raspberry Pi and temperature sensor</p>
        <p style={strongStyle}>3. React app width chart</p>
        <Bar data={this.state.chartData} />
      </div>
    );
  }
}

export default App;
