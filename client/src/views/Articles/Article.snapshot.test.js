import Articles from './Articles';
import React from 'react';
import { articles } from './testData';
import { shallow } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

describe('Articles Snapshot Tests', () => {
  const state = {
    articles: articles,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };
  
  test('Articles loading snapshot', () => {
    const wrapper = shallow(<Articles />);

    wrapper.setState({isLoading: true})

    expect(wrapper).toMatchSnapshot();
  });

  test('Articles list snapshot ', () => {
    const wrapper = shallow(<Articles />);
    
    wrapper.setState(state)

    expect(wrapper).toMatchSnapshot();
  });
});