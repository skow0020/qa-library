import Info from './Info';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('Info Accessibility Tests', () => {
  it('Info is accessible', async () => {
    const wrapper = shallow(<Info />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
