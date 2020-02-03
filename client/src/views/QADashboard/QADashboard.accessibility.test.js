import QADashboard from './QADashboard';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { axe } from 'setupTests';
import { render } from 'react-dom';

describe('QADashboard Accessibility Tests', () => {
  test('QADashboard is accessible', async () => {
    let container = global.container;

    await act(async () => render(<QADashboard />, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
