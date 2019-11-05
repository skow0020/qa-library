/// <reference types="Cypress" />

import { sizes, setViewport } from '../fixtures/helpers';

import * as header from '../components/header.json';
import * as search from '../pages/Search.json';

context('Search', () => {
  beforeEach(() => {
    cy.visit('qa-dashboard');
  });

  sizes.forEach((size) => {
    it(`Search for something - ${size}`, () => {
      setViewport(size);
      cy.get(header.searchButton).click();
      cy.get(search.searchField).type('hippo').should('have.value', 'hippo');
      cy.get(search.books).click();
    });
  });
});