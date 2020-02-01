import Loading from './Loading';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('Loading Unit Tests', () => {
  test('Loading renders', async () => {
    let container = global.container;

    await act(async () => render(<Loading />, container));

    expect(container.querySelector('#loading').getAttribute('role')).toBe('progressbar');
  });
});