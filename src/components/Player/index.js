import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './player.css';
import tshirt from '../../Assets/player-shirt.png';

/**
 *	Player React Type component.
 */
export class Player extends PureComponent {
  /**
   *	Props implementation.
   */
  static propTypes = {
    player: PropTypes.object
  };
  /**
   * Implements defaultProps().
   */
  static defaultProps = {};
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
    return (
      <div className={'player'}>
        <img src={tshirt} />
        <p>{this.props.player.name}</p>
      </div>
    );
  }
}

export default Player;
