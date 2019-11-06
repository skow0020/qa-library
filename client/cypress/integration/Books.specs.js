/// <reference types="Cypress" />

import { sizes, setViewport } from '../fixtures/helpers';

import * as addBook from '../pages/AddBook.json';
import * as books from '../pages/Books.json';
import * as common from '../pages/Common.json';
import * as data from '../fixtures/data.json';
import * as sideBar from '../components/sideBar.json';

context('Books', () => {
  sizes.forEach((size) => {
    it(`Navigate to Books and add one - ${size}`, () => {
      setViewport(size);
      navigate(size);
      cy.get(books.addBook).click();
      cy.get(common.pageTitle).should('have.text', 'Add a Book');
      cy.get(addBook.title).type(data.title).should('have.value', data.title);
      cy.get(addBook.author).type(data.author).should('have.value', data.author);
      cy.get(addBook.url).type(data.url).should('have.value', data.url);
      cy.get(addBook.backgroundImage).type(data.backgroundImage).should('have.value', data.backgroundImage);
      cy.get(addBook.pdfUrl).type(data.pdfUrl).should('have.value', data.pdfUrl);
      cy.get(addBook.category).select(data.category).should('have.value', data.category);

      cy.get(common.submit).click();
      cy.get(common.alertModal).should('have.text', 'Book added successfully');

      cy.wait(2000);
      cy.url().should('contain', 'books');
    });

    it(`Filter by category - ${size}`, () => {
      setViewport(size);
      navigate(size);
      cy.get(books.category).select('API Automation');
      cy.get(books.cardPosts).should('have.length.greaterThan', 0);
      cy.get(books.category).select('Databases');
      cy.get(books.cardPosts).should('have.length', 0);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      navigate(size);
      cy.get(books.language).select('Java');
      cy.get(books.cardPosts).should('have.length.greaterThan', 0);
      cy.get(books.language).select('Cpp');
      cy.get(books.cardPosts).should('have.length', 0);
    });
  });
});

const navigate = (size) => {
  cy.visit('qa-dashboard');
  if (size === 'iphone-6') cy.get(common.navLink).click();
  cy.get(sideBar.books).click();
  cy.get(common.pageTitle).should('have.text', 'Books');
};