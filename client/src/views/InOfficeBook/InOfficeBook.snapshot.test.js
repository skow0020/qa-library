import InOfficeBook from './InOfficeBook';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { inOfficeBook } from './testData';
import { render } from 'react-dom';

describe('InOfficeBook Snapshot Tests', () => {
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

  test('InOfficeBook list snapshot ', async () => {
    let container = global.container;
    
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(inOfficeBook)
      })
    );

    await act(async () => {
      render(<InOfficeBook {...props} />, container);
    });

    expect(container).toMatchSnapshot();
  });
});