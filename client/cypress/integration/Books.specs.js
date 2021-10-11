/// <reference types="Cypress" />

import * as addBook from '../pages/AddBook.json';
import * as books from '../pages/Books.json';
import * as common from '../pages/Common.json';
import * as data from '../fixtures/data.json';

import { selectDropdown, setViewport, sizes } from '../support/helpers';

context('Books', () => {
  beforeEach(() => {
    cy.login();
  });

  sizes.forEach((size) => {
    it(`Navigate to Books and add one - ${size}`, () => {
      setViewport(size);
      cy.navigate('Books', size);

      cy.get(books.cardPosts).its('length').then(booksLength => {
        cy.get(books.addBook).click();
        cy.get(common.pageTitle).should('have.text', 'Add a Book');
        cy.get(addBook.title).type(data.title).should('have.value', data.title);
        cy.get(addBook.author).type(data.author).should('have.value', data.author);
        cy.get(addBook.url).type(data.url).should('have.value', data.url);
        cy.get(addBook.backgroundImage).type(data.backgroundImage).should('have.value', data.backgroundImage);
        cy.get(addBook.pdfUrl).type(data.pdfUrl).should('have.value', data.pdfUrl);
        cy.get(addBook.description).type(data.description).should('have.value', data.description);
        selectDropdown(addBook.category, data.category);
        cy.get(addBook.category).should('have.text', data.category);

        cy.get(common.submit).click();
        cy.get(common.alertModal).should('have.text', 'Book added successfully');

        cy.url().should('contain', 'books');
        cy.get(books.cardPosts).should('have.length', booksLength + 1);
      });
    });

    it(`Filter by category - ${size}`, () => {
      setViewport(size);
      cy.navigate('Books', size);

      selectDropdown(books.category, 'API Automation');
      cy.get(books.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(books.category, 'Databases');
      cy.get(books.cardPosts).should('have.length', 0);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.navigate('Books', size);

      selectDropdown(books.language, 'CSharp');
      cy.get(books.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(books.language, 'Cpp');
      cy.get(books.cardPosts).should('have.length', 0);
    });
  });
});