import Loading from './Loading';
import React from 'react';
import { shallow } from 'enzyme';

describe('Loading Unit Tests', () => {
  test('Loading renders', () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper.length).toBe(1);
  });
});