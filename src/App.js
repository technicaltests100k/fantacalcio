import React, { Component } from 'react';
import logo from './logo.svg';
import Pitch from './components/Pitch';
import Pusher from 'pusher-js';
import fetch from 'isomorphic-fetch';
import config from './Config';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    //It connects to Pusher
    this.socket = this.connectToPusher(config.pusher.key, {
      cluster: config.pusher.cluster
    });
    //It set initial state
    this.state = {
      currentTeam: {}
    };
  }

  /**
   * When the components mounts, it fetches the data from the API and it subscribes to the channel
   */
  componentDidMount() {
    this.fetchData(config.endpoint, this.updateTeam);
    this.bindToChannel(
      this.subscribeChannel(this.socket, config.pusher.channel),
      config.pusher.event
    );
  }

  /**
   * When the app unmount, the socket gets disconnected .
   */
  componentWillUnmount() {
    this.socket.disconnect();
  }

  /**
   * Fetch the data from end point url
   * @param {string} url - end point from which you fetch data
   * @param {funcion} updateCallback - callback for updating the state with the new data received
   * @returns {object} fetch response
   */
  fetchData(url, updateCallback) {
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        updateCallback(json);
      });
  }

  /**
   * It updates the the state of the current team
   * @param {object} newTeam - new object to use for updating the state of currentTeam
   * @returns {void}
   */
  updateTeam = newTeam => {
    this.setState({
      currentTeam: {
        objTeam: newTeam,
        mapTeam: this.setTeamMap(newTeam)
      }
    });
  };

  /**
   * It create the map of the team where the key is the player's formation_place
   * @param {Object} team - the team received from the API
   * @returns {map} teamMap - the map created
   */
  setTeamMap = team => {
    let teamMap = new Map();
    team.players.map(player => teamMap.set(player.formation_place, player));
    return teamMap;
  };

  /**
   * It connects to Pusher creating a new socket
   * @param {string} key - secreat key to pass to Pusher.
   * @param {object} config - configuration object to pass to Pusher with different options. Read doc for more info.
   * @returns {object} socket
   */
  connectToPusher(key, config) {
    const socket = new Pusher(key, config);

    socket.connection.bind('connected', () => {});

    return socket;
  }

  /**
   * It subscribes to a Pusher's channel
   * @param {Object} socket - socket object created in connectToPusher
   * @param {string} channelName - channel's name to connect to
   * @returns {object} - channel
   */
  subscribeChannel(socket, channelName) {
    const channel = socket.subscribe(channelName);
    return channel;
  }

  /**
   * It listens to updates on an event in a channel and it updates the state with it
   * @param {object} channel - channel to bind to
   * @param {string} event - event's name to listern to new updates
   */
  bindToChannel(channel, event) {
    channel.bind(event, data => {
      this.updateTeam(data);
    });
  }

  render() {
    if (!this.state.currentTeam || !this.state.currentTeam.mapTeam) {
      return null;
    }
    const { currentTeam } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{currentTeam.team}</h1>
          <h2>{`Formation - ${currentTeam.formation}`}</h2>
        </header>
        <Pitch team={currentTeam} />
        <Pitch type={'list'} team={currentTeam} />
      </div>
    );
  }
}

export default App;
