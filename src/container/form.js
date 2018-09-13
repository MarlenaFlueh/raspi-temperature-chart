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

  onClickHandler = () => {
    this.props.clicked(this.state.comment);
    this.setState({ comment: "" });
  };
  render() {
    return (
      <Style.FormContainer>
        <form>
          <div>
            <Style.UserBox>
              <Style.SendIcon onClick={this.onClickHandler} />
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
