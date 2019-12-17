import React from 'react';
import ResourceLinks from './ResourceLinks';
import { resourceLinks } from './testData';
import { shallow } from 'enzyme';

describe('ResourceLinks Unit Tests', () => {
  const state = {
    resourceLinks: resourceLinks,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('ResourceLinks renders', () => {
    const wrapper = shallow(<ResourceLinks />);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('#category').props().value).toBe("UI Automation");
    expect(wrapper.find('#language').props().value).toBe("Python");
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});