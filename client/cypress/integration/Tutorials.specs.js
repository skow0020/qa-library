/// <reference types="Cypress" />

import * as addTutorial from '../pages/AddTutorial.json';
import * as common from '../pages/Common.json';
import * as data from '../fixtures/data.json';
import * as tutorials from '../pages/Tutorials.json';

import { selectDropdown, setViewport, sizes } from '../fixtures/helpers';

context('Tutorials', () => {
  sizes.forEach((size) => {
    it(`Navigate to Books and add one - ${size}`, () => {
      setViewport(size);
      cy.login();
      cy.navigate('Tutorials', size);
      cy.get(tutorials.addTutorial).click();
      cy.get(addTutorial.title).type(data.title).should('have.value', data.title);
      cy.get(addTutorial.url).type(data.url).should('have.value', data.url);
      cy.get(addTutorial.backgroundImage).type(data.backgroundImage).should('have.value', data.backgroundImage);
      selectDropdown(addTutorial.category, data.category);
      cy.get(addTutorial.category).should('have.text', data.category);
      cy.get(addTutorial.description).type(data.description).should('have.value', data.description);
      cy.get(common.submit).click();
      cy.get(common.alertModal).should('have.text', 'Tutorial added successfully');

      cy.wait(2000);
      cy.url().should('contain', 'tutorials');
    });

    it(`Filter by category - ${size}`, () => {
      setViewport(size);
      cy.login();
      cy.navigate('Tutorials', size);
      selectDropdown(tutorials.category, 'API Automation');
      cy.get(tutorials.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(tutorials.category, 'Databases');
      cy.get(tutorials.cardPosts).should('have.length', 0);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.login();
      cy.navigate('Tutorials', size);
      selectDropdown(tutorials.language, 'Java');
      cy.get(tutorials.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(tutorials.language, 'Cpp');
      cy.get(tutorials.cardPosts).should('have.length', 0);
    });
  });
});