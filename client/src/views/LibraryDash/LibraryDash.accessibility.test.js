import LibraryDash from './LibraryDash';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from "react-dom/test-utils";
import { axe } from 'setupTests';
import { inOfficeBooks } from './testData';
import { render } from "react-dom";

describe('LibraryDash Accessibility Tests', () => {
  test('LibraryDash is accessible', async () => {
    let container = global.container;

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(inOfficeBooks)
      })
    );

    const search = { search: "?user=skow0020&avatar_url=purple" };

    await act(async () => render(
      <Router>
        <LibraryDash location={search} />
      </Router>, container
    ));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
