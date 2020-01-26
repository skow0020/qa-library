import Loading from './Loading';
import React from 'react';
import { render } from "react-dom";
import { act } from "react-dom/test-utils";

describe('Loading Unit Tests', () => {
  test('Loading renders', () => {
    let container = global.container;

    act(() => render(<Loading />, container));

    expect(container.querySelector("#loading").getAttribute("role")).toBe("progressbar");
  });
});