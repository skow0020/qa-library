import AddBook from './AddBook';
import React from 'react';
import { act } from "react-dom/test-utils";
import { render } from "react-dom";

describe('AddBook Unit Tests', () => {
  test('AddBook renders', async () => {
    let container = global.container;

    await act(async () => render(<AddBook />, container));

    expect(container.querySelector('.page-title').textContent).toBe("Add a Book");
    expect(container.querySelector('#title-label').textContent).toContain("Title");
    expect(container.querySelector('#author-label').textContent).toContain("Author");
    expect(container.querySelector('#category').textContent).toBe("General");
    expect(container.querySelector('#url-label').textContent).toContain("URL");
    expect(container.querySelector('#backgroundImage-label').textContent).toContain("Background Image");
    expect(container.querySelector('#body-label').textContent).toBe("Description");
    expect(container.querySelector('#pdf-label').textContent).toBe("Pdf Url");
    expect(container.querySelector('#submit-button').textContent).toBe("Submit");
  });
});