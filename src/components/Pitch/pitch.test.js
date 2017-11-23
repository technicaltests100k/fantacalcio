import React from 'react';
import Pitch from './';
/**
 * Test for <Pitch /> component.
 * @test {Pitch}
 */
const props = {
  type: 'formation'
};
describe('<Pitch />', () => {
  it('should render Pitch with the team and theirs tshirst', () => {
    const wrapper = render(<Pitch {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Pitch with the team as a list', () => {
    const wrapper = render(<Pitch {...props} type={'list'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
