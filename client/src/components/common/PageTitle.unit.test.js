import PageTitle from './PageTitle';
import React from 'react';
import { shallow } from 'enzyme';

describe('PageTitle Unit Tests', () => {
  test('PageTitle renders', () => {
    const wrapper = shallow(<PageTitle title="Add an Article"/>);
    expect(wrapper.length).toBe(1);
  });
});