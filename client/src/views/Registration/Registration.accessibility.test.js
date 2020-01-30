import React from 'react';
import Registration from './Registration';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { axe } from 'setupTests';
import { render } from "react-dom";

describe('Registration Accessibility Tests', () => {
  test('Registration is accessible', async () => {
    let container = global.container;

    await act(async () => render(
      <Router>
        <Registration />
      </Router>, container
    ));
    
    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
