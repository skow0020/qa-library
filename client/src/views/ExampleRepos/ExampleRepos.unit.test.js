import ExampleRepos from './ExampleRepos';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { repos } from './testData';

describe('ExampleRepos Unit Tests', () => {
  test('ExampleRepos renders', async () => {
    let container = global.container;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(repos)
      })
    );

    await act(async () => render( <ExampleRepos />, container));

    expect(container.querySelector('.page-title').textContent).toBe('Example Repos');
    expect(container.querySelector('#github-account-text').textContent).toBe('skow0020 Repos');
    expect(container.querySelector('#filter-form')).not.toBe(null);
    expect(container.querySelector('#github-account').getAttribute('value')).toBe('skow0020');
    expect(container.querySelector('#language')).not.toBe(null);
    expect(container.querySelector('#repo-card-0').textContent).toBe('JavaScriptacme-outreach');
  });
});