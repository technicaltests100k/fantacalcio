import React, { Component } from 'react';
import logo from './logo.svg';
import Player from './components/Player';
import './App.css';
import data from './API/match-lineups.json';

import Pusher from 'pusher-js';

// APP_KEY = 6a3acdaba86ad858948b APP_CLUSTER = eu
// Channel = lineups
// Event = lineup-updated

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
  }

  componentDidMount() {
    this.pusher();
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket.connection.bind('disconnected', () => {
      console.log('disconnected from socket');
    });
  }

  pusher = () => {
    this.socket = new Pusher('6a3acdaba86ad858948b', {
      cluster: 'eu'
    });

    this.socket.connection.bind('connected', () => {
      console.log('CONNECTED');
    });

    const channel = this.socket.subscribe('lineups');

    channel.bind(
      'lineup-updated',
      function() {
        console.log(`hi ${this.name}`);
      },
      { name: 'Pusher' }
    );

    Pusher.log = msg => {
      console.log('Pusher log', msg);
    };
  };

  getTeam = team => {
    const formation = `1${team.formation}`.split('');

    let begin = 0;
    const readyTeam = formation.map((line, index) => {
      const end = begin + parseInt(line, 10);
      const row = (
        <div className="section" key={index}>
          {data.lineups[0].players.slice(begin, end).map((player, index) => {
            return <Player player={player} key={index} />;
          })}
        </div>
      );

      begin = end;

      return row;
    });

    return readyTeam;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={'pitch'}>{this.getTeam(data.lineups[2])}</div>
      </div>
    );
  }
}

export default App;
