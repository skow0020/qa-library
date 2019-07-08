import AddArticle from './AddArticle';
import React from 'react';
import { shallow } from 'enzyme';

describe('AddArticle Unit Tests', () => {
  test('AddArticle renders', () => {
    const wrapper = shallow(<AddArticle />);
    expect(wrapper.length).toBe(1);
  });
});