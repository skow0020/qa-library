import React from 'react';
import ResourceLinks from './ResourceLinks';
import { shallow } from 'enzyme';

describe('ResourceLinks Unit Tests', () => {
  test('ResourceLinks renders', () => {
    const wrapper = shallow(<ResourceLinks />);
    expect(wrapper.length).toBe(1);
  });
});