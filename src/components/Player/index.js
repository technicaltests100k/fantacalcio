import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './player.css';
import tshirtImg from '../../Assets/player-shirt.png';

/**
 *	Player React Type component.
 */
export class Player extends PureComponent {
  /**
   *	Props implementation.
   */
  static propTypes = {
    player: PropTypes.shape({
      name: PropTypes.string,
      position: PropTypes.string,
      type: PropTypes.string
    }),
    tshirt: PropTypes.bool
  };
  /**
   * Implements defaultProps().
   */
  static defaultProps = {
    tshirt: false
  };

  /**
   * Render
   * @return {ReactElement} markup
   */
  render() {
    const { tshirt, player } = this.props;
    const { name, position, type, formation_place } = player;

    return tshirt ? (
      <div className={'player'}>
        <img src={tshirtImg} alt="player tshirt" />
        <span className={'role'}>{position}</span>
        <p>{name}</p>
        <p>{formation_place}</p>
      </div>
    ) : (
      <li className={'playerList'}>
        <p>{`${name} - ${position} - ${type}`}</p>
      </li>
    );
  }
}

export default Player;
