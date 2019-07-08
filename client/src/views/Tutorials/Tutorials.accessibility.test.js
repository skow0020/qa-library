import React from 'react';
import Tutorials from './Tutorials';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('Tutorials Accessibility Tests', () => {
  it('Tutorials is accessible', async () => {
    const wrapper = shallow(<Tutorials />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
