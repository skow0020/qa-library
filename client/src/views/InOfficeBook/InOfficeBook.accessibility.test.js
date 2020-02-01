import InOfficeBook from './InOfficeBook';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { axe } from 'setupTests';
import { inOfficeBook } from './testData';
import { render } from 'react-dom';

describe('InOfficeBook Accessibility Tests', () => {
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

  test('InOfficeBook is accessible', async () => {
    let container = global.container;

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(inOfficeBook)
      })
    );

    await act(async () => {
      render(<InOfficeBook {...props} />, container);
    });

    const html = container.innerHTML;
    expect(await axe(html)).toHaveNoViolations();
  });
});
