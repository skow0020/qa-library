import Books from './Books';
import React from 'react';
import { books } from './testData';
import { shallow } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

describe('Books Snapshot Tests', () => {
  const state = {
    books: books,
    isLoading: false,
    category: "UI Automation",
    language: "Python"
  };

  test('Books loading snapshot', () => {
    const wrapper = shallow(<Books />);

    wrapper.setState({isLoading: true});

    expect(wrapper).toMatchSnapshot();
  });

  test('Books list snapshot ', () => {
    const wrapper = shallow(<Books />);
    
    wrapper.setState(state);

    expect(wrapper).toMatchSnapshot();
  });
});