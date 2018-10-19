import React, { Component } from 'react';
import Hello from './Hello';
import Greeting from './Greeting';

class ReactContainer extends Component {
  render() {
    return (
      <div>
        <h1>Webpack - React</h1>
        <Hello />
        <Greeting />
      </div>
    );
  }
}

export default ReactContainer;