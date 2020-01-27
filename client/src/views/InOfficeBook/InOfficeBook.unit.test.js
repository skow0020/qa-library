import { render, unmountComponentAtNode } from "react-dom";

import InOfficeBook from './InOfficeBook';
import React from 'react';
import { act } from "react-dom/test-utils";
import { inOfficeBook } from './testData';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('InOfficeBook Unit Tests', () => {
  let props;

  beforeEach(() => {
    props = {
      match: {
        params: {
          office_book_id: 12345
        }
      }
    };
  });

  test('InOfficeBook renders', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(inOfficeBook)
      })
    );

    await act(async () => {
      render(<InOfficeBook {...props} />, container);
    });

    expect(container.querySelector('.card-title').title).toBe("How to sand a hippo");
    expect(container.querySelector('.card-details').textContent).toBe("By Nova Goldner | 4 Available | Checked out by: stanislov342, georgio232");
  });
});