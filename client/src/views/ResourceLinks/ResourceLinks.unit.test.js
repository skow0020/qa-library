import React from 'react';
import ResourceLinks from './ResourceLinks';
import { mount } from 'enzyme';
import { resourceLinks } from './testData';

describe('ResourceLinks Unit Tests', () => {
  const state = {
    resourceLinks: resourceLinks,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('ResourceLinks renders', () => {
    const wrapper = mount(<ResourceLinks />);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('select#category').props().value).toBe("UI Automation");
    expect(wrapper.find('select#language').props().value).toBe("Python");
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});