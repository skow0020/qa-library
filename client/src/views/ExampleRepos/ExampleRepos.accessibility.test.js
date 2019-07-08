import ExampleRepos from './ExampleRepos';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('ExampleRepos Accessibility Tests', () => {
  it('ExampleRepos is accessible', async () => {
    const wrapper = shallow(<ExampleRepos />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
