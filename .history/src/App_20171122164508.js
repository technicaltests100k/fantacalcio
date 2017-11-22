import React, { Component } from 'react';
import logo from './logo.svg';
import Player from './components/Player';
import './App.css';
import data from './API/match-lineups.json';

class App extends Component {
  console.log('data',data );
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={'pitch'}>
          <div className="keeper">
            <Player />
          </div>
          <div className="defence">
            <Player />
          </div>
          <div className="midfield">
            <Player />
          </div>
          <div className="attack">
            <Player />
            <Player />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
