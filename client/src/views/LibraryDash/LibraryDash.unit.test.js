import LibraryDash from './LibraryDash';
import React from 'react';
import { shallow } from 'enzyme';

describe('LibraryDash Unit Tests', () => {
  test('LibraryDash renders', () => {
    const wrapper = shallow(<LibraryDash />);
    expect(wrapper.length).toBe(1);
  });
});