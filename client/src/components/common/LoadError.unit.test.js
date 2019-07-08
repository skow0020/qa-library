import LoadError from './LoadError';
import React from 'react';
import { shallow } from 'enzyme';

describe('LoadError Unit Tests', () => {
  test('LoadError renders', () => {
    const wrapper = shallow(<LoadError />);
    expect(wrapper.length).toBe(1);
  });
});