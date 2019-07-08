import MainNavbar from './MainNavbar';
import React from 'react';
import { shallow } from 'enzyme';

describe('MainNavbar Unit Tests', () => {
  test('MainNavbar renders', () => {
    const wrapper = shallow(<MainNavbar />);
    expect(wrapper.length).toBe(1);
  });
});