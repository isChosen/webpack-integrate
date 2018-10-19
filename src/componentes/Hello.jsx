import React, { Component } from 'react';

import helloLess from '../less/hello.less';
import dragonCat from '../images/dragonCat.jpg';

class Hello extends Component {
  render() {
    return (
      <div>
        <h3 className={helloLess.title}>Hello world!</h3>
        <div className={helloLess.imgBox}>
          <img src={dragonCat}/>
        </div>
      </div>
    );
  }
}

export default Hello;