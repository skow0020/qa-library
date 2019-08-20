import Books from './Books';
import React from 'react';
import { mount } from 'enzyme';
import { books } from './testData';

describe('Books Unit Tests', () => {
  const state = {
    books: books,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Books renders', () => {
    const wrapper = mount(<Books />);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('select#category').props().value).toBe("UI Automation");
    expect(wrapper.find('select#language').props().value).toBe("Python");
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});