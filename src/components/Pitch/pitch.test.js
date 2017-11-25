import React from 'react';
import Pitch from './';
import team from '../../API/match-lineups.json';

/**
 * Test for <Pitch /> component.
 * @test {Pitch}
 */
const props = {
  team: team.lineups[0]
};
describe('<Pitch />', () => {
  it('should render Pitch with the team and theirs tshirst', () => {
    const wrapper = render(<Pitch {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Pitch with the team as a list and no tshirst', () => {
    const wrapper = render(<Pitch {...props} type={'list'} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Pitch with the team and theirs tshirst as default if type is not recognised', () => {
    console.error = jest.fn();
    const wrapper = render(<Pitch {...props} type={'aTypeNotRecognised'} />);
    expect(console.error).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
