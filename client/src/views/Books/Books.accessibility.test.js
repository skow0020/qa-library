import Books from './Books';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('Books Accessibility Tests', () => {
  it('Books is accessible', async () => {
    const wrapper = shallow(<Books />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
