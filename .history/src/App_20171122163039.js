import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={'pitch'}>
          <div className="keeper">
            <div className={'player'} />
          </div>
          <div className="defence">
            <div className={'player'} />
            <div className={'player'} />
            <div className={'player'} />
            <div className={'player'} />
            <div className={'player'} />
            <div className={'player'} />
            <div className={'player'} />
            <div className={'player'} />
          </div>
          <div className="midfield">
            <div className={'player'} />
            <div className={'player'} />
            <div className={'player'} />
            <div className={'player'} />
          </div>
          <div className="attack">
            <div className={'player'} />
            <div className={'player'} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
