import Loading from './Loading';
import React from 'react';
import { mount } from '@cypress/react';

describe('Loading Unit Tests', () => {
  it('Loading renders', () => {
    mount(<Loading />);

    cy.get('#loading').invoke('attr', 'role')
      .should('eq', 'progressbarf');
  });
});