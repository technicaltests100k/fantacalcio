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
   *	Player contructor.
   * @param {object} props to constructor.
   *	@constructor
   */
  constructor(props) {
    super(props);
  }

  /**
   * Render
   * @return {ReactElement} markup
   */
  render() {
    const { tshirt, player } = this.props;
    const { name, position, type } = player;

    return tshirt ? (
      <div className={'player'}>
        <img src={tshirtImg} />
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
