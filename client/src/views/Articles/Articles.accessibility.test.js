import Articles from './Articles';
import React from 'react';
import { articles } from './testData';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('Articles Accessibility Tests', () => {
  const state = {
    articles: articles,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Articles is accessible', async () => {
    const wrapper = shallow(<Articles />);
    wrapper.setState(state);

    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
