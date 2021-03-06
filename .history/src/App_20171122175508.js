import React, { Component } from 'react';
import logo from './logo.svg';
import Player from './components/Player';
import './App.css';
import data from './API/match-lineups.json';

class App extends Component {
  render() {
    console.log('data', data);
    const sections = ['defence', 'midfield', 'attack'];

    const formation = `1${data.lineups[0].formation}`.split('');

    let begin = 0;
    const team = formation.map(line => {
      const end = line + 1;
      <div className="section">
        {data.lineups[0].players.slice(begin, end).map(player => {
          console.log('player', player.name);
          <Player />;
        })}
      </div>;
      begin = end;
    });

    console.log('team', team);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={'pitch'}>{team}</div>
      </div>
    );
  }
}

export default App;
