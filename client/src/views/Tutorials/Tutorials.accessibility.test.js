import React from 'react';
import Tutorials from './Tutorials';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';
import { tutorials } from './testData';

describe('Tutorials Accessibility Tests', () => {
  const state = {
    tutorials: tutorials,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Tutorials is accessible', async () => {
    const wrapper = shallow(<Tutorials />);
    wrapper.setState(state);

    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
