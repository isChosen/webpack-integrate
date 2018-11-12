import React, { Component } from 'react';
import Axios from 'axios';
import helloLess from '../less/hello.less';
import dragonCat from '../images/dragonCat.jpg';

class Hello extends Component {
  componentDidMount() {
    // 测试 webpack-dev-middleware
    // get
    Axios.get('/webpackMiddleware/abc')
    .then((res) => {
      console.log('Hello.jsx -> get -> success: ', res);
    })
    .catch((err) => {
      console.log('Hello.jsx -> get -> fail: ', err);
    });

    // post
    Axios.post('/webpackMiddleware/bcd', {code: 3})
    .then((res) => {
      console.log('Hello.jsx -> post -> success: ', res);
    })
    .catch((err) => {
      console.log('Hello.jsx -> post -> fail: ', err);
    });
  }
  render() {
    return (
      <div>
        <h3 className={helloLess.title}>Hello webpack!</h3>
        <div className={helloLess.imgBox}>
          <img src={dragonCat}/>
        </div>
      </div>
    );
  }
}

export default Hello;