import AddArticle from './AddArticle';
import React from 'react';
import { act } from "react-dom/test-utils";
import { axe } from 'setupTests';
import { render } from "react-dom";

describe('AddArticle Accessibility Tests', () => {
  test('AddArticle is accessible', async () => {
    let container = global.container;

    await act(async () => render(<AddArticle />, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
