import Books from './Books';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { books } from './testData';
import { render } from 'react-dom';

describe('Books Unit Tests', () => {
  test('Books renders', async () => {
    let container = global.container;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(books)
      })
    );

    await act(async () => render(
      <Router>
        <Books />
      </Router>, container));
      
    expect(container.querySelector('.page-title').textContent).toBe('Books');
    expect(container.querySelector('#add-book').textContent).toBe('Add Book');
    expect(container.querySelector('#filtering-form')).not.toBe(null);
    expect(container.querySelector('#category')).not.toBe(null);
    expect(container.querySelector('#language')).not.toBe(null);
    expect(container.querySelector('#book-card-0 a').getAttribute('href')).toBe('https://qa-library-dev.herokuapp.com/qa-dashboard');
    expect(container.querySelector('#book-card-0').textContent).toBe('GeneralHow to sand a hippoBy Jackeline Runolfsson PhDOfficia numquam perferendis. Laudantium aut id ut animi.PDF Version');
    expect(container.querySelector('.MuiChip-root').textContent).toBe('General');
  });
});