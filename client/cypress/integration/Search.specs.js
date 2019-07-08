/// <reference types="Cypress" />

import * as header from '../components/header.json';
import * as search from '../pages/Search.json';

context('Search', () => {
  beforeEach(() => {
    cy.visit('qa-dashboard');
  });

  it('Search for something', () => {
    cy.get(header.searchButton).click();
    cy.get(search.searchField).type('hippo').should('have.value', 'hippo');
    cy.get(search.books).click();
  });
});