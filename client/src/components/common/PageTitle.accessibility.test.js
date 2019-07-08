import PageTitle from './PageTitle';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('PageTitle Accessibility Tests', () => {
  it('PageTitle is accessible', async () => {
    const wrapper = shallow(<PageTitle title="Add an Article"/>);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
