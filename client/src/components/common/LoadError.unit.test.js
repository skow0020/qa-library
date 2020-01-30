import LoadError from './LoadError';
import React from 'react';
import { act } from "react-dom/test-utils";
import { render } from "react-dom";

describe('LoadError Unit Tests', () => {
  test('LoadError renders', async () => {
    let container = global.container;

    await act(async () => render(<LoadError error="Articles failed to load" />, container));

    expect(container.querySelector("h3").textContent).toBe("Something went wrong!");
    expect(container.querySelector("p").textContent).toBe("Articles failed to load");
  });

  test('LoadError renders with no props', async () => {
    let container = global.container;

    await act(async () => render(<LoadError />, container));

    expect(container.querySelector("h3").textContent).toBe("Something went wrong!");
    expect(container.querySelector("p").textContent).toBe("Try refreshing maybe?");
  });
});