import LibraryDash from './LibraryDash';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { axe } from 'setupTests';
import { inOfficeBooks } from './testData';
import { shallow } from 'enzyme';

describe('LibraryDash Accessibility Tests', () => {
  const state = {
    isLoggedIn: false,
    books: inOfficeBooks,
    isLoading: false
  };

  test('LibraryDash is accessible', async () => {
    const wrapper = shallow(
      <Router>
        <LibraryDash />
      </Router>
    );
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
