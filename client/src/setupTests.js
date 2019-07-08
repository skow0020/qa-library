import { configureAxe, toHaveNoViolations } from 'jest-axe';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });

// jest-axe setup
expect.extend(toHaveNoViolations);
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa']
  }
});