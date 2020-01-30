import AddBook from './AddBook';
import React from 'react';
import { act } from "react-dom/test-utils";
import { axe } from 'setupTests';
import { render } from "react-dom";

describe('AddBook Accessibility Tests', () => {
  test('AddBook is accessible', async () => {
    let container = global.container;

    await act(async () => render(<AddBook />, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
