import React from 'react';
import Registration from './Registration';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('LibraryDash Unit Tests', () => {
  test('LibraryDash renders', async () => {
    let container = global.container;

    await act(async () => render(
      <Router>
        <Registration />
      </Router>, container
    ));

    container.querySelector('#email').value = 'cskow@tapqa.com';
    expect(container.querySelector('#email').value).toBe('cskow@tapqa.com');

    container.querySelector('#password').value = 'password';
    expect(container.querySelector('#password').value).toBe('password');

    expect(container.querySelector('#login-link').textContent).toBe('Go Log in');

    act(() => {
      container.querySelector('#registration-button').dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
  });
});