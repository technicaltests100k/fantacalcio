import React, { Component } from 'react';
import logo from './logo.svg';
import Player from './components/Player';
import './App.css';
import data from './API/match-lineups.json';

class App extends Component {
  getTeam = team => {
    const formation = `1${team.formation}`.split('');

    let begin = 0;
    const readyTeam = formation.map((line, index) => {
      const end = begin + parseInt(line);
      return (
        <div className="section" key={index}>
          {data.lineups[0].players.slice(begin, end).map(player => {
            return <Player key={player.name} />;
          })}
        </div>
      );
      begin = end;
    });

    return readyTeam;
  };

  render() {
    // console.log('data', data);

    console.log('team', this.getTeam(data.lineups[0]));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={'pitch'}>{this.getTeam(data.lineups[0])}</div>
      </div>
    );
  }
}

export default App;
