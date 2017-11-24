import React, { Component } from 'react';
import logo from './logo.svg';
import Player from './components/Player';
import Pitch from './components/Pitch';
import Pusher from 'pusher-js';
import 'whatwg-fetch';
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
    this.socket.connection.bind('disconnected', () => {
      console.log('disconnected from socket');
    });
  }

  /**
   * Fetch the data from end point url
   * @param {string} url - end point from which you fetch data
   * @param {funcion} updateCallback - callback for updating the state with the new data received
   * @returns {object} fetch response
   */
  fetchData(url, updateCallback) {
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
  }

  /**
   * It updates the the state of the current team
   * @param {object} newTeam - new object to use for updating the state of currentTeam
   * @returns {void}
   */
  updateTeam = newTeam => {
    this.setState({
      currentTeam: newTeam
    });
  };

  /**
   * It connects to Pusher creating a new socket
   * @param {string} key - secreat key to pass to Pusher.
   * @param {object} config - configuration object to pass to Pusher with different options. Read doc for more info.
   * @returns {object} socket
   */
  connectToPusher(key, config) {
    const socket = new Pusher(key, config);

    socket.connection.bind('connected', test => {
      console.log('socket CONNECTED', socket);
    });

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

  /**
   * It returns the list of players from an array provided
   * @param {array} players - array of players to loop through
   * @param {boolean} withTshirt - option to pass that determines how to display the player:
   * - false: wrapped in a <li> element. It will be displayed without the tshirt image
   * - true: wrapped in a <div> element. It will be displayed with the tshirt image
   * @return {array} - array of Players components
   */
  getPlayers = (players, withTshirt = false) => {
    return players.map((player, index) => {
      return <Player player={player} key={index} tshirt={withTshirt} />;
    });
  };

  /**
   * It returns the team to show on the pitch according to the provided formation option.
   * @param {object} team - Object got from the API. It has the formation and the players' list in it.
   * @return {array} readyTeam - This is the list of players divided in the correct rows according to the formation provided from the API json.
   * A formation is a string like: "442". Every number of this string determines the number of players component to show in every row, which are 4:
   * - goalkeeper
   * - defence
   * - midfield
   * - attack
   * I.e. if formation is "442", I add the goalkeeper to it first to turn it into "1442" and the result is something like:
   * row 1
   *  1 - Player
   * row 2
   *  4 - Players
   * row 3
   *  4 - Players
   * row 4
   *  2 - Players
   */
  getTeam = team => {
    //Add 1 to formation string to turn it into "1xxx"
    const formation = `1${team.formation}`.split('');

    let begin = 0;
    const readyTeam = formation.map((line, index) => {
      const end = begin + parseInt(line, 10);
      const row = (
        //new row with list of players who belong to it
        <div className="section" key={index}>
          {this.getPlayers(team.players.slice(begin, end), true)}
        </div>
      );

      begin = end;

      return row;
    });

    return readyTeam;
  };

  render() {
    if (!this.state.currentTeam || !this.state.currentTeam.formation) {
      return null;
    }
    const { currentTeam } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            {
              // Welcome to Luca Carangella's Technical Test.
            }
            WHATCAR
          </h1>
        </header>
        <Pitch>{this.getTeam(currentTeam)}</Pitch>
        <Pitch type={'list'}>{this.getPlayers(currentTeam.players)}</Pitch>
      </div>
    );
  }
}

export default App;
