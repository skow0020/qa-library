import React from 'react';
import ResourceLinks from './ResourceLinks';
import { axe } from 'setupTests';
import { resourceLinks } from './testData';
import { shallow } from 'enzyme';

describe('ResourceLinks Accessibility Tests', () => {
  const state = {
    resourceLinks: resourceLinks,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('ResourceLinks is accessible', async () => {
    const wrapper = shallow(<ResourceLinks />);
    wrapper.setState(state);

    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
