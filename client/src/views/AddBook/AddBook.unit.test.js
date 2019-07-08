import AddBook from './AddBook';
import React from 'react';
import { shallow } from 'enzyme';

describe('AddBook Unit Tests', () => {
  test('AddBook renders', () => {
    const wrapper = shallow(<AddBook />);
    expect(wrapper.length).toBe(1);
  });
});