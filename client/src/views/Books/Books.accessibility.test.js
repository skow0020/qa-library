import Books from './Books';
import React from 'react';
import { axe } from 'setupTests';
import { books } from './testData';
import { shallow } from 'enzyme';

describe('Books Accessibility Tests', () => {
  const state = {
    books: books,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Books is accessible', async () => {
    const wrapper = shallow(<Books />);
    wrapper.setState(state);

    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
