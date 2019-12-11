import Loading from './Loading';
import React from 'react';
import { axe } from 'setupTests';
import { shallow } from 'enzyme';

describe('Loading Accessibility Tests', () => {
  test('Loading is accessible', async () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
