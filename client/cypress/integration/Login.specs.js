/// <reference types="Cypress" />

import { login, setViewport, sizes } from '../support/helpers';

context('Login scenarios', () => {
  sizes.forEach((size) => {
    it(`Able to log in - ${size}`, () => {
      setViewport(size);
      login();
      
      cy.url().should('contain', 'qa-dashboard');
    });
  });
});
