import AddResourceLink from './AddResourceLink';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('AddResourceLink Accessibility Tests', () => {
  test('AddResourceLink is accessible', async () => {
    const wrapper = shallow(<AddResourceLink />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
