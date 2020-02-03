import LibraryLogin from './LibraryLogin';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('LibraryLogin Snapshot Tests', () => {
  test('LibraryLogin snapshot', async () => {
    let container = global.container;

    await act(async () => render(
      <Router>
        <LibraryLogin />
      </Router>, container
    ));

    expect(container).toMatchSnapshot();
  });
});