import React from 'react';
import Registration from './Registration';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { render } from "react-dom";

describe('Registration Snapshot Tests', () => {
  test('Registration snapshot', async () => {
    let container = global.container;

    await act(async () => render(
      <Router>
        <Registration />
      </Router>, container
    ));

    expect(container).toMatchSnapshot();
  });
});