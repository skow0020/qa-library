import AddResourceLink from './AddResourceLink';
import React from 'react';
import { shallow } from 'enzyme';

describe('AddResourceLink Unit Tests', () => {
  test('AddResourceLink renders', () => {
    const wrapper = shallow(<AddResourceLink />);
    expect(wrapper.length).toBe(1);
  });
});