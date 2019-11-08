import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

interface HomeProps {
  userName: string,
  handleClick: () => void
  handleSave: (userName: string) => void
}

interface HomeState {
  num: number
}

export default class extends Component <HomeProps, HomeState>{

  state: HomeState = {
    num: 1
  }

  render() {
    const {userName, handleClick, handleSave} = this.props;
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          num: <code>{this.state.num}（state中取）</code>
          <Button onClick={this.handleAdd}>+</Button>
        </p>
        <p>
          username: <code>{userName}（store中取）</code>
          <Button onClick={ e => handleSave('')}>清除username值</Button>
        </p>
        <Link to="page1" className="App-link">进入page1</Link>
        <Link to="page2" className="App-link">进入page2</Link>
        <span onClick={handleClick} style={{textDecoration: 'underline', 'cursor': 'pointer'}}>点我发送一个http请求</span>
      </header>
    </div>
  } 

  handleAdd = () => {
    let {num} = this.state;
    this.setState({
      num: ++num
    })
  }
}
