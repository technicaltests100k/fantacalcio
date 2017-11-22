import React, { Component } from 'react';
import logo from './logo.svg';
import Player from './components/Player';
import './App.css';
import data from './API/match-lineups.json';

import Pusher from 'pusher-js';
import 'whatwg-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = this.connectToPusher('6a3acdaba86ad858948b', {
      cluster: 'eu'
    });
    this.state = {
      currentTeam: {}
    };
  }

  componentDidMount() {
    this.bindToChannel(this.subscribeChannel(this.socket), 'lineup-updated');
    this.fetchData('http://lineups.dev.fantech.io/', this.updateTeam);
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket.connection.bind('disconnected', () => {
      console.log('disconnected from socket');
    });
  }

  fetchData = (url, updateCallback) => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log('parsed json', json);
        updateCallback(json);
      })
      .catch(ex => {
        console.log('parsing failed', ex);
      });
  };

  updateTeam = newTeam => {
    this.setState({
      currentTeam: newTeam
    });
  };

  connectToPusher = (key, config) => {
    const socket = new Pusher(key, config);

    socket.connection.bind('connected', () => {
      console.log('socket CONNECTED');
    });

    return socket;
  };

  subscribeChannel = socket => {
    const channel = socket.subscribe('lineups');
    return channel;
  };

  bindToChannel = (channel, event) => {
    channel.bind(event, data => {
      this.updateTeam(data);
      console.log('new update', data);
    });
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
    if (!this.state.currentTeam && !this.state.currentTeam.formation) {
      return null;
    }
    const { currentTeam } = this.state;

    console.log('Team: ', this.state.currentTeam);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to Luca Carangella's Technical test.
          </h1>
        </header>

        <div className={'pitch'}>{this.getTeam(currentTeam)}</div>
      </div>
    );
  }
}

export default App;
