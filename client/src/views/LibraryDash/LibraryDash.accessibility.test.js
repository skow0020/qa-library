import LibraryDash from './LibraryDash';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('LibraryDash Accessibility Tests', () => {
  it('LibraryDash is accessible', async () => {
    const wrapper = shallow(<LibraryDash />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
