import InOfficeBook from './InOfficeBook';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';
import { inOfficeBook } from './testData';

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

  it('InOfficeBook is accessible', async () => {
    const state = {
      book: inOfficeBook,
      isLoading: false
    };

    const wrapper = shallow(<InOfficeBook {...props}/>);
    wrapper.setState(state);

    const html = wrapper.html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
