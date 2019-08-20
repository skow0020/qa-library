import InOfficeBook from './InOfficeBook';
import React from 'react';
import { mount } from 'enzyme';
import { inOfficeBook } from './testData';

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

  test('InOfficeBook renders', () => {
    const state = {
      book: inOfficeBook,
      isLoading: false
    };

    const wrapper = mount(<InOfficeBook {...props}/>);
    wrapper.setState(state);

    expect(wrapper.length).toBe(1);
    expect(wrapper.find('.card-title').text()).toBe("How to sand a hippo");
    expect(wrapper.find('.card-footer .row span').text()).toBe("By Nova Goldner | 4 Available | Checked out by: stanislov342, georgio232");
  });
});