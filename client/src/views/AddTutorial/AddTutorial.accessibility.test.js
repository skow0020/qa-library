import AddTutorial from './AddTutorial';
import React from 'react';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('AddTutorial Accessibility Tests', () => {
  test('AddTutorial is accessible', async () => {
    const wrapper = shallow(<AddTutorial />);
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
