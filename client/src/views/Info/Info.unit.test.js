import Info from './Info';
import React from 'react';
import { shallow } from 'enzyme';

describe('Info Unit Tests', () => {
  test('Info renders', () => {
    const wrapper = shallow(<Info />);
    expect(wrapper.length).toBe(1);
  });
});