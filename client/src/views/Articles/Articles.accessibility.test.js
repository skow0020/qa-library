import Articles from './Articles';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('Articles Accessibility Tests', () => {
  it('Articles is accessible', async () => {
    const wrapper = shallow(<Articles />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
