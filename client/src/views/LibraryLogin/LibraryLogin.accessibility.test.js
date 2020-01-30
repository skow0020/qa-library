import LibraryLogin from './LibraryLogin';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { axe } from 'setupTests';
import { render } from "react-dom";

describe('LibraryLogin Accessibility Tests', () => {
  test('LibraryLogin is accessible', async () => {
    let container = global.container;

    await act(async () => render(
      <Router>
        <LibraryLogin />
      </Router>, container
    ));
    
    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
