import Articles from './Articles';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';
import { articles } from './testData';

describe('Articles Accessibility Tests', () => {
  const state = {
    articles: articles,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  it('Articles is accessible', async () => {
    const wrapper = shallow(<Articles />);
    wrapper.setState(state);

    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
