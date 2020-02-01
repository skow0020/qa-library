import Info from './Info';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';

describe('Info Unit Tests', () => {
  test('Info renders', async () => {
    let container = global.container;

    await act(async () => render( <Info />, container));

    expect(container.querySelector('#info-container img').getAttribute('src')).toBe('code1.jpg');
    expect(container.querySelector('#info-container').textContent).toBe('This site is a hub of resources for learning programming languages, tools, testing, and best practices across the industryFor more information, google it');
  });
});