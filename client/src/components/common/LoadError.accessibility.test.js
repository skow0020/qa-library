import LoadError from './LoadError';
import React from 'react';
import { axe } from 'setupTests';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('LoadError Accessibility Tests', () => {
  test('LoadError is accessible', async () => {
    let container = global.container;

    act(() => render(<LoadError error="Oopsy doopsy" />, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
