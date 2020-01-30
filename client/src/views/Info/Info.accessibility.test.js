import Info from './Info';
import React from 'react';
import { act } from "react-dom/test-utils";
import { axe } from 'setupTests';
import { render } from "react-dom";

describe('Info Accessibility Tests', () => {
  test('Info is accessible', async () => {
    let container = global.container;
    
    await act(async () => render( <Info />, container));
    const html = container.innerHTML;

    expect(await axe(html)).toHaveNoViolations();
  });
});
