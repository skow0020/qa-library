import Articles from './Articles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { articles } from './testData';
import { render } from 'react-dom';

describe('Articles Unit Tests', () => {
  test('Articles renders', async () => {
    let container = global.container;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(articles)
      })
    );

    await act(async () => render(
      <Router>
        <Articles />
      </Router>, container));
      
    expect(container.querySelector('.page-title').textContent).toBe('Articles');
    expect(container.querySelector('#add-article').textContent).toBe('Add Article');
    expect(container.querySelector('#filtering-form')).not.toBe(null);
    expect(container.querySelector('#category')).not.toBe(null);
    expect(container.querySelector('#language')).not.toBe(null);
    expect(container.querySelector('#article-card-0 a').getAttribute('href')).toBe('https://qa-library-dev.herokuapp.com/qa-dashboard');
    expect(container.querySelector('#article-card-0').textContent).toBe('GeneralHow to sand a hippoBy Benny Schaden Jr.Est quibusdam laboriosam ipsum cum est sunt numquam voluptas. Quas cupiditate facere vero.');
    expect(container.querySelector('.MuiChip-root').textContent).toBe('General');
  });
});