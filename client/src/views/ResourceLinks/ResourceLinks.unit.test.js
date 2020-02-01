import React from 'react';
import ResourceLinks from './ResourceLinks';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { resourceLinks } from './testData';

describe('ResourceLinks Unit Tests', () => {
  test('ResourceLinks renders', async () => {
    let container = global.container;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(resourceLinks)
      })
    );

    await act(async () => render(
      <Router>
        <ResourceLinks />
      </Router>, container));
      
    expect(container.querySelector('.page-title').textContent).toBe('ResourceLinks');
    expect(container.querySelector('#add-resourceLink').textContent).toBe('Add Resource Link');
    expect(container.querySelector('#filtering-form')).not.toBe(null);
    expect(container.querySelector('#category')).not.toBe(null);
    expect(container.querySelector('#language')).not.toBe(null);
    expect(container.querySelector('#resourceLink-card-0 a').getAttribute('href')).toBe('https://qa-library-dev.herokuapp.com/qa-dashboard');
    expect(container.querySelector('#resourceLink-card-0').textContent).toBe('GeneralHow to sand a hippoCorporis laborum assumenda non qui. Soluta facilis dolore doloremque enim facere a accusantium.');
    expect(container.querySelector('.MuiChip-root').textContent).toBe('General');
  });
});