import AddTutorial from './AddTutorial';
import React from 'react';
import { shallow } from 'enzyme';

describe('AddTutorial Unit Tests', () => {
  test('AddTutorial renders', () => {
    const wrapper = shallow(<AddTutorial />);
    expect(wrapper.length).toBe(1);
  });
});