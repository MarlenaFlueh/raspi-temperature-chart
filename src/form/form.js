import React, { Component } from "react";

import * as Style from "../styles/index";

class Form extends Component {
  render() {
    return (
      <form>
        <div>
          <label for="uname">Choose a username: </label>
          <input type="text" id="uname" name="name" />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

export default Form;
