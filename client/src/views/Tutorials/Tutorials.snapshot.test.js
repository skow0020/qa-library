import React from 'react';
import Tutorials from './Tutorials';
import { shallow } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { tutorials } from './testData';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('Tutorials Snapshot Tests', () => {
  const state = {
    tutorials: tutorials,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Tutorials loading snapshot', () => {
    const wrapper = shallow(<Tutorials />);

    wrapper.setState({ isLoading: true });

    expect(wrapper).toMatchSnapshot();
  });

  test('Tutorials list snapshot ', () => {
    const wrapper = shallow(<Tutorials />);

    wrapper.setState(state);

    expect(wrapper).toMatchSnapshot();
  });
});