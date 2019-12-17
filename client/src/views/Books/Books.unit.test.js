import Books from './Books';
import React from 'react';
import { books } from './testData';
import { shallow } from 'enzyme';

describe('Books Unit Tests', () => {
  const state = {
    books: books,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Books renders', () => {
    const wrapper = shallow(<Books />);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#category').props().value).toBe("UI Automation");
    expect(wrapper.find('#language').props().value).toBe("Python");
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});