import React from 'react';
import Registration from './Registration';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';

describe('LibraryDash Unit Tests', () => {
  test('LibraryDash renders', () => {
    const wrapper = mount(
      <Router>
        <Registration />
      </Router>
    );

    expect(wrapper.length).toBe(1);
  });

  it('Can register', () => {
    const wrapper = mount(
      <Router>
        <Registration />
      </Router>
    );
    const input = wrapper.find('input#email');
    input.instance().value = 'cskow@tapqa.com';
  });
});