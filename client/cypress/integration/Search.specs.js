/// <reference types="Cypress" />

import * as header from '../components/header.json';
import * as search from '../pages/Search.json';

import { setViewport, sizes } from '../fixtures/helpers';

context('Search', () => {
  it('Search for something (e2e)', () => {
    setViewport(sizes[2]);
    cy.login();
    cy.get(header.searchButton).click();
    cy.get(search.searchField)
      .type('hippo')
      .type('{enter}')
      .should('have.value', 'hippo');

    cy.get(search.books).should('have.length.greaterThan', 0);
    cy.get(search.articles).should('have.length.greaterThan', 0);

    if (!cy.isFirefox()) {
      cy.get(search.books).first().click();
      cy.url().should('contain', 'dashboard');
    }
  });

  it('Search returns books (ui)', () => {
    setViewport(sizes[2]);
    cy.login();

    cy.intercept('GET', '/api/books*', { fixture: 'books' });

    cy.get(header.searchButton).click();
    cy.get(search.searchField)
      .type('hippo')
      .type('{enter}')
      .should('have.value', 'hippo');

    cy.get(search.books)
      .should('have.length', 2)
      .each(($el) => {
        expect($el.text()).to.contain('hippo');
      });

    if (!cy.isFirefox()) {
      cy.get(search.books).first().click();
      cy.url().should('contain', 'dashboard');
    }
  });

  it('Search returns articles (ui)', () => {
    setViewport(sizes[2]);
    cy.login();

    cy.intercept('GET', '/api/articles*', { fixture: 'articles' });

    cy.get(header.searchButton).click();
    cy.get(search.searchField)
      .type('hippo')
      .type('{enter}')
      .should('have.value', 'hippo');

    cy.get(search.articles).as('articles').should('have.length', 2);
    if (!cy.isFirefox()) {
      cy.get('@articles').first().click();
      cy.url().should('contain', 'dashboard');
    }
  });
});

