import LibraryLogin from './LibraryLogin';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('LibraryDash Unit Tests', () => {
  test('Successful Login', async() => {
    let container = global.container;

    await act(async () => render(
      <Router>
        <LibraryLogin />
      </Router>, container
    ));
    
    container.querySelector('#email').value = 'cskow@tapqa.com';
    expect(container.querySelector('#email').value).toBe('cskow@tapqa.com');

    container.querySelector('#password').value = 'password';
    expect(container.querySelector('#password').value).toBe('password');

    expect(container.querySelector('#registration-link').textContent).toBe('Don\'t have an account? Sign Up');

    act(() => {
      container.querySelector('#submit-button').dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
  });
});