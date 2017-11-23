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
    player: PropTypes.object,
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
    const { name, position, type } = player;

    return tshirt ? (
      <div className={'player'}>
        <img src={tshirtImg} alt="player tshirt" />
        <p>{name}</p>
      </div>
    ) : (
      <li className={'playerList'}>
        <p>{`${name} - ${position} - ${type}`}</p>
      </li>
    );
  }
}

export default Player;
