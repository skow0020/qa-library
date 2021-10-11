import LoadError from './LoadError';
import React from 'react';
import { mount } from '@cypress/react';

it('LoadError renders with error message', () => {
  mount(<LoadError error="Articles failed to load" />);
  cy.get('h3').contains('Something went wrong!');
  cy.get('p').contains('Articles failed to load');
});

it('LoadError renders with no props', () => {
  mount(<LoadError />);

  cy.get('h3').contains('Something went wrong!');
  cy.get('p').contains('Try refreshing maybe?');
});