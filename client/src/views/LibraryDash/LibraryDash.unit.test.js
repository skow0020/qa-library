import LibraryDash from './LibraryDash';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { inOfficeBooks } from './testData';
import { render } from 'react-dom';

describe('LibraryDash Unit Tests', () => {
  test('LibraryDash renders github login', async () => {
    let container = global.container;

    await act(async () => render(
      <Router>
        <LibraryDash location="" />
      </Router>, container
    ));

    expect(container.querySelector('.page-title').textContent).toBe('In-Office Library');
    expect(container.querySelector('#login-button').textContent).toBe('Log In with Github');
  });

  test('LibraryDash renders', async () => {
    let container = global.container;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(inOfficeBooks)
      })
    );

    const search = { search: '?user=skow0020&avatar_url=purple' };

    await act(async () => render(
      <Router>
        <LibraryDash location={search} />
      </Router>, container
    ));

    expect(container.querySelector('.page-title').textContent).toBe('In-Office Library');
    expect(container.querySelector('#category')).not.toBe(null);
    expect(container.querySelector('#book-card-0').textContent).toBe('API AutomationHow to sand a hippoBy Nova Goldner | 4 AvailableCheck outCheck in');
  });
});