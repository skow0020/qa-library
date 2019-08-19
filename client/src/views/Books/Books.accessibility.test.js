import Books from './Books';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';
import { books } from './testData';

describe('Books Accessibility Tests', () => {
  const state = {
    books: books,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  it('Books is accessible', async () => {
    const wrapper = shallow(<Books />);
    wrapper.setState(state)

    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
