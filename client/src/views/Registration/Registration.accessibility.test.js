import React from 'react';
import Registration from './Registration';
import { BrowserRouter as Router } from 'react-router-dom';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('Registration Accessibility Tests', () => {
  test('Registration is accessible', async () => {
    const wrapper = shallow(
      <Router>
        <Registration />
      </Router>
    );
    
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
