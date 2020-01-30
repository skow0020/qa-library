import PageTitle from './PageTitle';
import React from 'react';
import { act } from "react-dom/test-utils";
import { axe } from 'setupTests';
import { render } from "react-dom";

describe('PageTitle Accessibility Tests', () => {
  test('PageTitle is accessible', async () => {
    let container = global.container;

    await act(async () => render(<PageTitle title="Add an Article"/>, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
