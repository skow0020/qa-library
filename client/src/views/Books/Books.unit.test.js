import Books from './Books';
import React from 'react';
import { shallow } from 'enzyme';

describe('Books Unit Tests', () => {
  test('Books renders', () => {
    const wrapper = shallow(<Books />);
    expect(wrapper.length).toBe(1);
  });
});