import LibraryLogin from './LibraryLogin';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createSerializer } from 'enzyme-to-json';
import { mount } from 'enzyme';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('LibraryLogin Snapshot Tests', () => {
  test('LibraryLogin snapshot', () => {
    const wrapper = mount(
      <Router>
        <LibraryLogin />
      </Router>
    );

    expect(wrapper).toMatchSnapshot();
  });
});