import QADashboard from './QADashboard';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('QADashboard Unit Tests', () => {
  test('QADashboard renders', async () => {
    let container = global.container;

    await act(async () => render(<QADashboard />, container));

    expect(container.querySelector('#welcomeDash img').getAttribute('src')).toBe('lib1.jpg');
    expect(container.querySelector('#welcomeDash').textContent).toBe('Behold! A library in which you can find everything you have ever wanted to search for!But not really...');
  });
});