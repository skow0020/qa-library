import LibraryDash from './LibraryDash';
import React from 'react';
import { inOfficeBooks } from './testData';
import { shallow, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import { BrowserRouter as Router } from 'react-router-dom';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('LibraryDash Snapshot Tests', () => {
  const state = {
    isLoggedIn: true,
    books: inOfficeBooks,
    isLoading: false
  };

  test('LibraryDash loading snapshot', () => {
    const wrapper = shallow(<LibraryDash />);

    wrapper.setState({ isLoading: true });

    expect(wrapper).toMatchSnapshot();
  });

  test('LibraryDash snapshot', () => {

    const wrapper = mount(
      <Router>
        <LibraryDash />
      </Router>
    );

    wrapper.setState(state);

    expect(wrapper).toMatchSnapshot();
  });
});