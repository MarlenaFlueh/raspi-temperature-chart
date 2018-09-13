import React, { Component } from "react";

import * as Style from "../styles/index";
import { sendCommentary } from "../components/data";

class Form extends Component {
  state = {
    comment: ""
  };

  onClickHandler = comment => {
    sendCommentary(comment);
    this.setState({ comment: "" });
  };

  onChangeHandler = event => {
    this.setState({
      comment: event.target.value
    });
  };

  render() {
    console.log(this.state.comment);
    return (
      <Style.FormContainer>
        <form>
          <div>
            <Style.UserBox>
              <Style.SendIcon
                onClick={() => this.onClickHandler(this.state.comment)}
                data-tooltip="I am a tooltip"
              />
            </Style.UserBox>
            <Style.Comment>
              <Style.Textarea
                type="textarea"
                value={this.state.comment}
                onChange={this.onChangeHandler}
                placeholder="Your message.."
              />
            </Style.Comment>
          </div>
        </form>
      </Style.FormContainer>
    );
  }
}

export default Form;
