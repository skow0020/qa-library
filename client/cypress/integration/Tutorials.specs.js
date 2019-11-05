/// <reference types="Cypress" />

import { sizes, setViewport } from '../fixtures/helpers';

import * as addTutorial from '../pages/AddTutorial.json';
import * as common from '../pages/Common.json';
import * as data from '../fixtures/data.json';
import * as sideBar from '../components/sideBar.json';
import * as tutorials from '../pages/Tutorials.json';

context('Tutorials', () => {
  beforeEach(() => {
    cy.visit('qa-dashboard');
    cy.get(sideBar.tutorials).click();
    cy.get(common.pageTitle).should('have.text', 'Tutorials');
  });

  sizes.forEach((size) => {
    it(`Navigate to Books and add one - ${size}`, () => {
      setViewport(size);
      cy.get(tutorials.addTutorial).click();
      cy.get(addTutorial.title).type(data.title).should('have.value', data.title);
      cy.get(addTutorial.url).type(data.url).should('have.value', data.url);
      cy.get(addTutorial.backgroundImage).type(data.backgroundImage).should('have.value', data.backgroundImage);
      cy.get(addTutorial.category).select(data.category).should('have.value', data.category);
      cy.get(addTutorial.description).type(data.description).should('have.value', data.description);
    });

    it(`Filter by category - ${size}`, () => {
      setViewport(size);
      cy.get(tutorials.category).select('API Automation');
      cy.get(tutorials.cardPosts).should('have.length.greaterThan', 0);
      cy.get(tutorials.category).select('Databases');
      cy.get(tutorials.cardPosts).should('have.length', 0);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.get(tutorials.language).select('Java');
      cy.get(tutorials.cardPosts).should('have.length.greaterThan', 0);
      cy.get(tutorials.language).select('Cpp');
      cy.get(tutorials.cardPosts).should('have.length', 0);
    });
  });
});