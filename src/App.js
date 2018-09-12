import React, { Component, Fragment } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";

import * as Style from "./styles/index";
import { tempData } from "./data";
import { commentaryData } from "./data";
import Restful from "./utils/img/restapi.png";
import Stack from "./utils/img/stack.png";

class App extends Component {
  state = {
    chartData: {
      labels: null,
      datasets: [
        {
          label: "Temperature, Lüneburg (degree Celsius)",
          backgroundColor: "#21a4d0",
          borderColor: "rgb(128, 185, 188)",
          borderWidth: 1,
          data: null
        }
      ]
    },
    commentaries: null
  };

  async componentDidMount() {
    const res = await tempData();
    const commentaryArray = await commentaryData();
    const data = res.map(item => item.temp);
    const labels = res.map(item => item.time);

    this.setState(prevState => ({
      chartData: {
        ...prevState.chartData,
        labels,
        datasets: prevState.chartData.datasets.map(set => ({ ...set, data }))
      },
      commentaries: commentaryArray
    }));
  }

  showCommentLength = () => {
    if (!this.state.commentaries) {
      return " Loading...";
    }
    return this.state.commentaries.length;
  };

  showComments = () => {
    if (!this.state.commentaries) {
      return " Loading...";
    }
    return this.state.commentaries.map(item => (
      <Fragment key={item.id}>
        <Style.UserBox>
          <Style.UserIcon />
        </Style.UserBox>
        <Style.Comment>
          <Style.FloatDiv>{item.time}</Style.FloatDiv>
          {item.comment}
        </Style.Comment>
      </Fragment>
    ));
  };

  render() {
    return (
      <Style.Container>
        <Style.Heading>Measure temperature with the Raspberry Pi</Style.Heading>
        <Style.CenterText>
          {moment("2018-09-10T20:15:37.075Z").format("ll")}
        </Style.CenterText>
        <Style.FollowButton
          href="https://twitter.com/intent/follow?screen_name=@temperaturebot2"
          target="_blank_"
        >
          <Style.TwitterIcon />
          {" Follow @temperaturebot"}
        </Style.FollowButton>
        <Style.TextBlock>
          Have you ever wondered what to do as a next Raspberry Pi project? What
          about measuring the temperature and represent it in a chart -
          everything you need is a Raspberry Pi and a temperature sensor. You
          receive the temperature data with the Raspi, then you send the data to
          a Restful API, connected with a database. To display the chart, you
          just get the chart data from the Restful API.
        </Style.TextBlock>
        <Style.StackImg src={Stack} alt="Stack" />
        <Style.StrongText>Possible structure:</Style.StrongText>
        <Style.OrderedList>
          <li>create Restful API with MongoDB Atlas connection</li>
          <li>receive data with Raspberry Pi from the temperature sensor</li>
          <li>display the temperature as a chart with a React.js app</li>
        </Style.OrderedList>
        <Style.StrongText>1. Restful API</Style.StrongText>
        <Style.TextBlock>
          A Restful API is a programming interface and uses HTTP requests to
          handle data (PUT, GET and DELETE). The API simplifies the
          communication of computer programs. An API also allows to interact
          with cloud services like the MongoDB Atlas database. In the browser it
          can look like that:
        </Style.TextBlock>
        <Style.ApiImg src={Restful} alt="Restful API" />
        <Style.StrongText>
          2. Raspberry Pi and temperature sensor
        </Style.StrongText>
        <Style.StrongText>3. React app width chart</Style.StrongText>
        <Bar data={this.state.chartData} />
        <Style.CommentCounter>
          <Style.BubbleIcon />
          {` ${this.showCommentLength()} comments`}
        </Style.CommentCounter>
        {this.showComments()}
      </Style.Container>
    );
  }
}

export default App;
