import Loading from './Loading';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { axe } from 'setupTests';
import { render } from 'react-dom';

describe('Loading Accessibility Tests', () => {
  test('Loading is accessible', async () => {
    let container = global.container;

    act(() => render(<Loading />, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
