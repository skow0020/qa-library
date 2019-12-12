import QADashboard from './QADashboard';
import React from 'react';
import { axe } from 'setupTests';
import { shallow } from 'enzyme';

describe('QADashboard Accessibility Tests', () => {
  test('QADashboard is accessible', async () => {
    const wrapper = shallow(<QADashboard />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
