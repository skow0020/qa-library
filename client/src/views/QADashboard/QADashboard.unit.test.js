import QADashboard from './QADashboard';
import React from 'react';
import { shallow } from 'enzyme';

describe('QADashboard Unit Tests', () => {
  test('QADashboard renders', () => {
    const wrapper = shallow(<QADashboard />);
    expect(wrapper.length).toBe(1);
  });
});