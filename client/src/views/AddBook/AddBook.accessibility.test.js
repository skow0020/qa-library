import AddBook from './AddBook';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('AddBook Accessibility Tests', () => {
  it('AddBook is accessible', async () => {
    const wrapper = shallow(<AddBook />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
