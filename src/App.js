import React, { Component, Fragment } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";

import * as Style from "./styles/index";
import { tempData, commentaryData, sendCommentary } from "./components/data";
import Restful from "./utils/img/restapi.png";
import Stack from "./utils/img/stack.png";
import Form from "./container/form";

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

  onClickHandler = async comment => {
    const generateColor = (min, max) =>
      Math.round(Math.random() * (max - min) + min);
    const oldComments = this.state.commentaries;
    const settedCookie = document.cookie.split(": ")[1];

    let color;
    if (false) {
      const lastComment = oldComments.find(item => item.id === settedCookie);
      color = lastComment.color;
    } else {
      color =
        generateColor(30, 255) +
        "," +
        generateColor(50, 255) +
        "," +
        generateColor(0, 255);
    }

    await sendCommentary(comment, color);
    const commentaryArray = await commentaryData();
    this.setState({
      commentaries: commentaryArray
    });
    if (document.cookie === "" || oldComments.length === 0) {
      const newCookie = commentaryArray[commentaryArray.length - 1].id;
      document.cookie = `name: ${newCookie}`;
    }
  };

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
          <Style.UserIcon inputColor={item.color} />
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
          about measuring the temperatures and represent them in a chart -
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
          <li>display the temperatures as a chart with a React.js app</li>
        </Style.OrderedList>
        <Style.StrongText>1. Restful API</Style.StrongText>
        <Style.TextBlock>
          A Restful API is a programming interface and uses HTTP requests to
          handle data (PUT, GET and DELETE etc.). The API simplifies the
          communication of computer programs. An API also allows to interact
          with cloud services like the MongoDB Atlas database. In the browser it
          can look like that:
        </Style.TextBlock>
        <Style.ApiImg src={Restful} alt="Restful API" />
        <Style.StrongText>
          2. Raspberry Pi and temperature sensor
        </Style.StrongText>
        <Style.TextBlock>
          Next step is to get the temperature data from the sensor. On the
          Raspberry Pi we can run a webserver, which receives temperature data
          from the temperature sensor every hour. With a post request we can
          send data to the Restful API. For communication between the Raspi and
          the sensor we need the GPIOs (General Purpose Input Output). With four
          wires (power, ground, receive and transmit) we connect the devices.
          For using JavaScript on a Single Board Computer search for an npm
          package. For example check out the{" "}
          <Style.Link href="https://www.npmjs.com/package/gpio">
            gpio
          </Style.Link>{" "}
          library.
        </Style.TextBlock>
        <Style.StrongText>3. React app with chart</Style.StrongText>
        <Style.TextBlock>
          Last but not least we display temperatures using a React.js app. With{" "}
          <Style.Link href="https://reactjs.org/docs/create-a-new-react-app.html">
            create-react-app
          </Style.Link>
          , we create a new project. The npm package{" "}
          <Style.Link href="https://www.npmjs.com/package/react-chartjs-2">
            react-chartjs-2
          </Style.Link>{" "}
          is a simple, intuitive opportunity for React.js charts. To get the
          data, fetch them from the Restful API. To simplify time handling I
          used the <Style.Link href="https://momentjs.com/">moment</Style.Link>{" "}
          library.
        </Style.TextBlock>
        <Bar data={this.state.chartData} />
        <Style.TextBlock>
          If you haven't got a Raspberry Pi, but you want to try out this
          node-react-chart.js architecture, just fetch data from another weather
          API. But I promise, it's more fun with own measured temperatures!
          Hopefully you'll be successful. Enjoy coding ;)
        </Style.TextBlock>
        <Style.CommentCounter>
          <Style.BubbleIcon />
          {` ${this.showCommentLength()} comments`}
        </Style.CommentCounter>
        {this.showComments()}
        <Form clicked={this.onClickHandler} />
      </Style.Container>
    );
  }
}

export default App;
