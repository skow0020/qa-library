/// <reference types="Cypress" />

import { sizes, setViewport } from '../fixtures/helpers';

import * as header from '../components/header.json';
import * as search from '../pages/Search.json';

context('Search', () => {
  sizes.forEach((size) => {
    it(`Search for something - ${size}`, () => {
      setViewport(size);
      cy.visit('qa-dashboard');
      cy.get(header.searchButton).click();
      cy.get(search.searchField).type('hippo').should('have.value', 'hippo');
      cy.get(search.books).click();
    });
  });
});