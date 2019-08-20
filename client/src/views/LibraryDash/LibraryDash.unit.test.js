import LibraryDash from './LibraryDash';
import React from 'react';
import { shallow } from 'enzyme';
import { inOfficeBooks } from './testData';
import { BrowserRouter as Router } from 'react-router-dom';

describe('LibraryDash Unit Tests', () => {
  const state = {
    isLoggedIn: false,
    books: inOfficeBooks,
    isLoading: false
  };

  test('LibraryDash renders', () => {
    const wrapper = shallow(
      <Router>
        <LibraryDash />
      </Router>
    );
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    console.log(wrapper.html())
    expect(wrapper.find('.card-title').length).toBe(2);
  });
});