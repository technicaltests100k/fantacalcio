import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Player from '../Player';
import './pitch.css';

/**
 *	Pitch React Type component.
 */
export class Pitch extends PureComponent {
  /**
   *	Props implementation.
   */
  static propTypes = {
    type: PropTypes.oneOf(['list', 'formation']),
    team: PropTypes.shape({
      team: PropTypes.string,
      formation: PropTypes.string,
      players: PropTypes.array
    })
  };
  /**
   * Implements defaultProps().
   */
  static defaultProps = {
    type: 'formation'
  };

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
    // Add 1 to formation string to turn it into "1xxx"
    const formation = `1${team.formation}`.split('');
    // Initial index for calculating the length of the row
    let begin = 0;
    // Loop through the current formation
    const readyTeam = formation.map((line, index) => {
      // end index for the row. i.e. if [1,2,3,4,5,6,...] and begin=1 and end=5 it returns [2,3,4,5]
      const end = begin + parseInt(line, 10);
      const row = (
        //new row with list of players who belong to it
        <div className="section" key={index}>
          {this.getPlayers(team.players.slice(begin, end), true)}
        </div>
      );
      // update begin index for next row
      begin = end;

      return row;
    });

    return readyTeam;
  };

  /**
   * It returns the team object with the players list and eventual style
   * @param {array} players - list of players components
   * @param {string} type - this is used in order to establish how to show the team on the pitch:
   * - list
   * - formation
   */
  getTeamType = (team, type) => {
    // default obj
    let result;

    switch (type) {
      case 'list':
        result = {
          players: <ol>{this.getPlayers(team.players)}</ol>,
          style: 'list'
        };
        break;
      case 'formation':
        result = {
          players: this.getTeam(team),
          style: ''
        };
        break;
      default:
        result = {
          players: this.getTeam(team),
          style: ''
        };
    }

    return result;
  };
  /**
   * Render
   * @return {ReactElement} markup
   */
  render() {
    const { team, type } = this.props;
    const currentTeam = this.getTeamType(team, type);

    return (
      <div className={`pitch ${currentTeam.style}`}>{currentTeam.players}</div>
    );
  }
}

export default Pitch;
