import LibraryLogin from './LibraryLogin';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';

describe('LibraryDash Unit Tests', () => {
  test('LibraryDash renders', () => {
    const wrapper = mount(
      <Router>
        <LibraryLogin />
      </Router>
    );

    expect(wrapper.length).toBe(1);
  });

  it('Can login', function () {
    const wrapper = mount(
      <Router>
        <LibraryLogin />
      </Router>
    );

    const input = wrapper.find('input#email');
    input.instance().value = 'cskow@tapqa.com';

    wrapper.find('button#submit-button').simulate('click');
  });
});