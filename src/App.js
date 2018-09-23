import React, { Component, Fragment } from "react";

import * as Style from "./styles/index";
import { tempData, commentaryData, sendCommentary } from "./components/data";
import Form from "./container/form";
import Guide from "./components/guide";

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
    if (document.cookie !== "" && oldComments.length) {
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
        <Guide data={this.state.chartData} />
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
