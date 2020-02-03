import ExampleRepos from './ExampleRepos';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { axe } from 'setupTests';
import { render } from 'react-dom';
import { repos } from './testData';

describe('ExampleRepos Accessibility Tests', () => {
  test('ExampleRepos is accessible', async () => {
    let container = global.container;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(repos)
      })
    );

    await act(async () => render( <ExampleRepos />, container));
    const html = container.innerHTML;

    expect(await axe(html)).toHaveNoViolations();
  });
});
