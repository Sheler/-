import React, { Component } from 'react';
import Store from "./store";
import {observer} from "mobx-react"
 
// @observer
const Test = observer(
  class Test extends Component {
    render() {
      return (
        <div>
          this is Index
          <p>{Store.id}</p>
          <p>{Store.title}</p>
          <button onClick={Store.cTitle}>测试</button>
        </div>
      );
    }
  }
)

export default Test;