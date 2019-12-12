/// <reference types="Cypress" />

import * as header from '../components/header.json';
import * as search from '../pages/Search.json';

import { login, setViewport, sizes } from '../fixtures/helpers';

context('Search', () => {
  it(`Search for something`, () => {
    setViewport(sizes[2]);
    login();
    cy.get(header.searchButton).click();
    cy.get(search.searchField).type('hippo').should('have.value', 'hippo');
    cy.get(search.books).click();
  });
});