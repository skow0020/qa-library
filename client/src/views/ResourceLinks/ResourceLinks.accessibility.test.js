import React from 'react';
import ResourceLinks from './ResourceLinks';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';
import { resourceLinks } from './testData';

describe('ResourceLinks Accessibility Tests', () => {
  const state = {
    resourceLinks: resourceLinks,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  it('ResourceLinks is accessible', async () => {
    const wrapper = shallow(<ResourceLinks />);
    wrapper.setState(state);

    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
