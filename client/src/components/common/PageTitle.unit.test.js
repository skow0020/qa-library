import PageTitle from './PageTitle';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('PageTitle Unit Tests', () => {
  test('PageTitle renders', async () => {
    let container = global.container;

    await act(async () => render(<PageTitle title="Add an Article"/>, container));

    expect(container.querySelector('.page-title').textContent).toBe('Add an Article');
  });
});