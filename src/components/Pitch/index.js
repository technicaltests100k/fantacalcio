import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    children: PropTypes.arrayOf(PropTypes.object)
  };
  /**
   * Implements defaultProps().
   */
  static defaultProps = {
    type: 'formation'
  };

  getTeam = (players, type) => {
    if (type === 'list') {
      return {
        players: <ol>{players}</ol>,
        style: 'list'
      };
    }
    /* istanbul ignore else */
    if (type === 'formation') {
      return {
        players: players,
        style: ''
      };
    }
  };
  /**
   * Render
   * @return {ReactElement} markup
   */
  render() {
    const { children, type } = this.props;
    const team = this.getTeam(children, type);

    return <div className={`pitch ${team.style}`}>{team.players}</div>;
  }
}

export default Pitch;
