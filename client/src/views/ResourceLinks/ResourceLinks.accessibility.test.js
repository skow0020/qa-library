import React from 'react';
import ResourceLinks from './ResourceLinks';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('ResourceLinks Accessibility Tests', () => {
  it('ResourceLinks is accessible', async () => {
    const wrapper = shallow(<ResourceLinks />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
