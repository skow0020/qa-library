import InOfficeBook from './InOfficeBook';
import React from 'react';
import { createSerializer } from 'enzyme-to-json';
import { inOfficeBook } from './testData';
import { shallow } from 'enzyme';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

describe('InOfficeBook Snapshot Tests', () => {
  let props;
  const state = {
    book: inOfficeBook,
    isLoading: false
  };

  beforeEach(() => {
    props = {
      match: {
        params: {
          office_book_id: 12345
        }
      }
    };
  });

  test('InOfficeBook loading snapshot', () => {
    const wrapper = shallow(<InOfficeBook {...props}/>);

    wrapper.setState({isLoading: true});

    expect(wrapper).toMatchSnapshot();
  });

  test('InOfficeBook list snapshot ', () => {
    const wrapper = shallow(<InOfficeBook {...props}/>);
    
    wrapper.setState(state);

    expect(wrapper).toMatchSnapshot();
  });
});