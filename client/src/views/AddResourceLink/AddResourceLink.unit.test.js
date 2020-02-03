import AddResourceLink from './AddResourceLink';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('AddResourceLink Unit Tests', () => {
  test('AddResourceLink renders', async () => {
    let container = global.container;

    await act(async () => render(<AddResourceLink />, container));

    expect(container.querySelector('.page-title').textContent).toBe('Add a Resource Link');
    expect(container.querySelector('#title-label').textContent).toContain('Title');
    expect(container.querySelector('#category').textContent).toBe('General');
    expect(container.querySelector('#language')).not.toBe(null);
    expect(container.querySelector('#url-label').textContent).toContain('URL');
    expect(container.querySelector('#backgroundImage-label').textContent).toContain('Background Image');
    expect(container.querySelector('#body-label').textContent).toBe('Description');
    expect(container.querySelector('#submit-button').textContent).toBe('Submit');
  });
});