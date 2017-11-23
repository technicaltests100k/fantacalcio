import React from 'react';
import Player from './';
/**
 * Test for <Player /> component.
 * @test {Player}
 */
const props = {
  player: {
    name: 'Estebian Cambiasso',
    position: 'Midfielder',
    type: 'CM'
  },
  tshirt: true
};
describe('<Player />', () => {
  it('should render Player with its tshirt img', () => {
    const wrapper = render(<Player {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Player as an li element', () => {
    const wrapper = render(<Player {...props} tshirt={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
