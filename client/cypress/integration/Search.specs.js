/// <reference types="Cypress" />

import * as header from '../components/header.json';
import * as search from '../pages/Search.json';

import { setViewport, sizes } from '../fixtures/helpers';

context('Search', () => {
  it('Search for something', () => {
    setViewport(sizes[2]);
    cy.login();
    cy.get(header.searchButton).click();
    cy.get(search.searchField).type('hippo{enter}').should('have.value', 'hippo');
    cy.get(search.books).click();
  });
});