import React from 'react';
import ResourceLinks from './ResourceLinks';
import { resourceLinks } from './testData';
import { shallow } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

describe('ResourceLinks Snapshot Tests', () => {
  const state = {
    resourceLinks: resourceLinks,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('ResourceLinks loading snapshot', () => {
    const wrapper = shallow(<ResourceLinks />);

    wrapper.setState({isLoading: true});

    expect(wrapper).toMatchSnapshot();
  });

  test('ResourceLinks list snapshot ', () => {
    const wrapper = shallow(<ResourceLinks />);
    
    wrapper.setState(state);

    expect(wrapper).toMatchSnapshot();
  });
});