import Articles from './Articles';
import React from 'react';
import { shallow } from 'enzyme';

describe('Articles Unit Tests', () => {
  test('Articles renders', () => {
    const wrapper = shallow(<Articles />);
    expect(wrapper.length).toBe(1);
  });
});