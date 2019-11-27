import React from 'react';
import Registration from './Registration';
import { BrowserRouter as Router } from 'react-router-dom';
import { createSerializer } from 'enzyme-to-json';
import { mount } from 'enzyme';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

describe('Registration Snapshot Tests', () => {
  test('Registration snapshot', () => {
    const wrapper = mount(
      <Router>
        <Registration />
      </Router>
    );

    expect(wrapper).toMatchSnapshot();
  });
});