import Articles from './Articles';
import React from 'react';
import { articles } from './testData';
import { shallow } from 'enzyme';

describe('Articles Unit Tests', () => {
  const state = {
    articles: articles,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Articles renders', () => {
    const wrapper = shallow(<Articles />);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#category').props().value).toBe("UI Automation");
    expect(wrapper.find('#language').props().value).toBe("Python");
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});