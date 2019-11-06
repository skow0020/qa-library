/// <reference types="Cypress" />

import { sizes, setViewport } from '../fixtures/helpers';

import * as addTutorial from '../pages/AddTutorial.json';
import * as common from '../pages/Common.json';
import * as data from '../fixtures/data.json';
import * as sideBar from '../components/sideBar.json';
import * as tutorials from '../pages/Tutorials.json';

context('Tutorials', () => {
  sizes.forEach((size) => {
    it(`Navigate to Books and add one - ${size}`, () => {
      setViewport(size);
      navigate(size);
      cy.get(tutorials.addTutorial).click();
      cy.get(addTutorial.title).type(data.title).should('have.value', data.title);
      cy.get(addTutorial.url).type(data.url).should('have.value', data.url);
      cy.get(addTutorial.backgroundImage).type(data.backgroundImage).should('have.value', data.backgroundImage);
      cy.get(addTutorial.category).select(data.category).should('have.value', data.category);
      cy.get(addTutorial.description).type(data.description).should('have.value', data.description);
      cy.get(common.submit).click();
      cy.get(common.alertModal).should('have.text', 'Tutorial added successfully');

      cy.wait(2000);
      cy.url().should('contain', 'tutorials');
    });

    it(`Filter by category - ${size}`, () => {
      setViewport(size);
      navigate(size);
      cy.get(tutorials.category).select('API Automation');
      cy.get(tutorials.cardPosts).should('have.length.greaterThan', 0);
      cy.get(tutorials.category).select('Databases');
      cy.get(tutorials.cardPosts).should('have.length', 0);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      navigate(size);
      cy.get(tutorials.language).select('Java');
      cy.get(tutorials.cardPosts).should('have.length.greaterThan', 0);
      cy.get(tutorials.language).select('Cpp');
      cy.get(tutorials.cardPosts).should('have.length', 0);
    });
  });
});

const navigate = (size) => {
  cy.visit('qa-dashboard');
  if (size === 'iphone-6') cy.get(common.navLink).click();
  cy.get(sideBar.tutorials).click();
  cy.get(common.pageTitle).should('have.text', 'Tutorials');
};