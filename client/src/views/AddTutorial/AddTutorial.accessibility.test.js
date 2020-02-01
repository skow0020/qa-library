import AddTutorial from './AddTutorial';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { axe } from 'setupTests';
import { render } from 'react-dom';

describe('AddTutorial Accessibility Tests', () => {
  test('AddTutorial is accessible', async () => {
    let container = global.container;

    await act(async () => render(<AddTutorial />, container));

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
