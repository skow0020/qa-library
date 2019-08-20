import InOfficeBook from './InOfficeBook';
import React from 'react';
import { inOfficeBook } from './testData';
import { shallow } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

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