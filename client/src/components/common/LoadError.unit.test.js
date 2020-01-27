import LoadError from './LoadError';
import React from 'react';
import { shallow } from 'enzyme';

describe('LoadError Unit Tests', () => {
  test('LoadError renders', () => {
    const wrapper = shallow(<LoadError error="Articles failed to load" />);
    expect(wrapper.length).toBe(1);

    expect(wrapper.find('h3').text()).toBe("Something went wrong!");
    expect(wrapper.find('p').text()).toBe("Articles failed to load");
  });

  test('LoadError renders with no props', () => {
    const wrapper = shallow(<LoadError />);
    expect(wrapper.length).toBe(1);

    expect(wrapper.find('h3').text()).toBe("Something went wrong!");
    expect(wrapper.find('p').text()).toBe("Try refreshing maybe?");
  });
});