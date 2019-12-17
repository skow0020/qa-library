import React from 'react';
import Tutorials from './Tutorials';
import { shallow } from 'enzyme';
import { tutorials } from './testData';

describe('Tutorials Unit Tests', () => {
  const state = {
    tutorials: tutorials,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Tutorials renders', () => {
    const wrapper = shallow(<Tutorials />);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#category').props().value).toBe("UI Automation");
    expect(wrapper.find('#language').props().value).toBe("Python");
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});