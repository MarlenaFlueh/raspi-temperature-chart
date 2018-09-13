import React, { Component } from "react";

import * as Style from "../styles/index";

class Form extends Component {
  state = {
    comment: ""
  };

  onChangeHandler = event => {
    this.setState({
      comment: event.target.value
    });
  };

  onSubmitHandler = () => {
    console.log("success");
  };

  render() {
    return (
      <Style.FormContainer>
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <Style.UserBox>
              <Style.SendIcon
                onClick={() => this.props.clicked(this.state.comment)}
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
