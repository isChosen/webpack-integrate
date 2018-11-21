import React, { Component } from 'react';
import girl from '../images/girl.png';
import avator from '../images/avatar.jpg';
import greetingLess from '../less/greeting.less';
import 'weui'; // vendor 样式

class Greeting extends Component {
  handleBtnClick(ev) {
    console.log(ev);
    console.log(ev.target.classList.value);
    ev.target.classList.toggle(greetingLess.on);
  }
  render() {
    return (
      <div>
        <h3 className={greetingLess.title}>Hello React!</h3>
        <a className='weui-btn weui-btn_primary' style={{maxWidth: '300px'}}>页面主操作 Normal</a>
        <div className={greetingLess.girlBox}>
          <img src={girl}/>
        </div>
        <img src={avator} />
        <br />
        <div className={greetingLess.btnBoxOne}>
          <button onClick={(ev) => this.handleBtnClick(ev)}>点击</button>
        </div>
        <div className={greetingLess.btnBoxTwo}>
          <button onClick={(ev) => this.handleBtnClick(ev)}>点击</button>
        </div>
      </div>
    );
  }
}

export default Greeting;