import LibraryDash from './LibraryDash';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';
import { inOfficeBooks } from './testData';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LibraryDash Accessibility Tests', () => {
  const state = {
    isLoggedIn: false,
    books: inOfficeBooks,
    isLoading: false
  };

  it('LibraryDash is accessible', async () => {
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
