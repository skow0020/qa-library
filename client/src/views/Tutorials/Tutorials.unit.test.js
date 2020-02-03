import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Tutorials from './Tutorials';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import { tutorials } from './testData';

describe('Tutorials Unit Tests', () => {
  test('Tutorials renders', async () => {
    let container = global.container;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(tutorials)
      })
    );

    await act(async () => render(
      <Router>
        <Tutorials />
      </Router>, container));
      
    expect(container.querySelector('.page-title').textContent).toBe('Tutorials');
    expect(container.querySelector('#add-tutorial').textContent).toBe('Add Tutorial');
    expect(container.querySelector('#filtering-form')).not.toBe(null);
    expect(container.querySelector('#category')).not.toBe(null);
    expect(container.querySelector('#language')).not.toBe(null);
    expect(container.querySelector('#tutorial-card-0 a').getAttribute('href')).toBe('https://qa-library-dev.herokuapp.com/qa-dashboard');
    expect(container.querySelector('#tutorial-card-0').textContent).toBe('GeneralHow to sand a hippoUt nihil optio est est vel assumenda cum totam sunt. Mollitia incidunt nulla aperiam et aut nobis.');
    expect(container.querySelector('.MuiChip-root').textContent).toBe('General');
  });
});