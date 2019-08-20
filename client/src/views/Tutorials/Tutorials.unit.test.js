import React from 'react';
import Tutorials from './Tutorials';
import { mount } from 'enzyme';
import { tutorials } from './testData';

describe('Tutorials Unit Tests', () => {
  const state = {
    tutorials: tutorials,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Tutorials renders', () => {
    const wrapper = mount(<Tutorials />);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('select#category').props().value).toBe("UI Automation");
    expect(wrapper.find('select#language').props().value).toBe("Python");
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});