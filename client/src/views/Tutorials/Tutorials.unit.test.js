import React from 'react';
import Tutorials from './Tutorials';
import { shallow } from 'enzyme';

describe('Tutorials Unit Tests', () => {
  test('Tutorials renders', () => {
    const wrapper = shallow(<Tutorials />);
    expect(wrapper.length).toBe(1);
  });
});