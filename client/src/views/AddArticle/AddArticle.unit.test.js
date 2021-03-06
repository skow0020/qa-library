import AddArticle from './AddArticle';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('AddArticle Unit Tests', () => {
  test('AddArticle renders', async () => {
    let container = global.container;

    await act(async () => render(<AddArticle />, container));

    expect(container.querySelector('.page-title').textContent).toBe('Add an Article');
    expect(container.querySelector('#title-label').textContent).toContain('Title');
    expect(container.querySelector('#author-label').textContent).toContain('Author');
    expect(container.querySelector('#category').textContent).toBe('General');
    expect(container.querySelector('#language')).not.toBe(null);
    expect(container.querySelector('#url-label').textContent).toContain('URL');
    expect(container.querySelector('#backgroundImage-label').textContent).toContain('Background Image');
    expect(container.querySelector('#body-label').textContent).toBe('Description');
    expect(container.querySelector('#submit-button').textContent).toBe('Submit');
  });
});