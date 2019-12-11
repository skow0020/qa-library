import AddArticle from './AddArticle';
import React from 'react';
import { axe } from 'setupTests';
import { shallow } from 'enzyme';

describe('AddArticle Accessibility Tests', () => {
  test('AddArticle is accessible', async () => {
    const wrapper = shallow(<AddArticle />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
