import React, { Component } from 'react';
import logo from './logo.svg';
import Player from './components/Player';
import './App.css';
import data from './API/match-lineups.json';

getTeam = team => {
  const formation = `1${team.formation}`.split('');

  let begin = 0;
  const team = formation.map(line => {
    const end = line + 1;
    return (
      <div className="section">
        {data.lineups[0].players.slice(begin, end).map(player => {
          // console.log('player', player.name);
          return <Player key={player.name} />;
        })}
      </div>
    );
    begin = end;
  });

  return team;
};

class App extends Component {
  render() {
    // console.log('data', data);

    // console.log('team', team);

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
