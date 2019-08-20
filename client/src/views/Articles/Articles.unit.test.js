import Articles from './Articles';
import React from 'react';
import { mount } from 'enzyme';
import { articles } from './testData';

describe('Articles Unit Tests', () => {
  const state = {
    articles: articles,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Articles renders', () => {
    const wrapper = mount(<Articles />);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('select#category').props().value).toBe("UI Automation");
    expect(wrapper.find('select#language').props().value).toBe("Python");
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});