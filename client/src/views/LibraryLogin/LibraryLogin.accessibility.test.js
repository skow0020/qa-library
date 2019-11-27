import LibraryLogin from './LibraryLogin';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { axe } from '../../setupTests';
import { shallow } from 'enzyme';

describe('LibraryLogin Accessibility Tests', () => {
  it('LibraryLogin is accessible', async () => {
    const wrapper = shallow(
      <Router>
        <LibraryLogin />
      </Router>
    );
    
    expect(wrapper.length).toBe(1);
    const html = wrapper.html();

    expect(await axe(html)).toHaveNoViolations();
  });
});
