import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './player.css';

/**
 *	Player React Type component.
 */
export class Player extends Component {
  /**
   *	Props implementation.
   */
  static propTypes = {};
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
    return <div className={'player'} />;
  }
}

export default Player;
