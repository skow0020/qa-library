import { configureAxe, toHaveNoViolations } from 'jest-axe';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import React from "react";
import { createSerializer } from 'enzyme-to-json';

//Suppressing useLayoutEffect errors
React.useLayoutEffect = React.useEffect;

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// jest-axe setup
expect.extend(toHaveNoViolations);
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa']
  }
});