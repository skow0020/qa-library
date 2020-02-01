import Loading from './Loading';
import React from 'react';
import { axe } from 'setupTests';
import { render } from 'react-dom';
import { act } from 'react-dom/test-utils';

describe('Loading Accessibility Tests', () => {
  test('Loading is accessible', async () => {
    let container = global.container;

    act(() => render(<Loading />, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
