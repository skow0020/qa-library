import ExampleRepos from './ExampleRepos';
import React from 'react';
import { shallow } from 'enzyme';

describe('ExampleRepos Unit Tests', () => {
  test('ExampleRepos renders', () => {
    const wrapper = shallow(<ExampleRepos />);
    expect(wrapper.length).toBe(1);
  });
});