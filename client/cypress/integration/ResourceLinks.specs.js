/// <reference types="Cypress" />

import * as addResourceLink from '../pages/AddResourceLink.json';
import * as common from '../pages/Common.json';
import * as data from '../fixtures/data.json';
import * as resourceLinks from '../pages/ResourceLinks.json';
import * as sideBar from '../components/sideBar.json';

context('Resource Links', () => {
  beforeEach(() => {
    cy.visit('qa-dashboard');
    cy.get(sideBar.resourceLinks).click();
    cy.get(common.pageTitle).should('have.text', 'Resource Links');
  });

  it('Navigate to Resource Links and add one', () => {
    cy.get(resourceLinks.addResourceLink).click();
    cy.get(addResourceLink.title).type(data.title).should('have.value', data.title);
    cy.get(addResourceLink.url).type(data.url).should('have.value', data.url);
    cy.get(addResourceLink.backgroundImage).type(data.backgroundImage).should('have.value', data.backgroundImage);
    cy.get(addResourceLink.category).select(data.category).should('have.value', data.category);
    cy.get(addResourceLink.description).type(data.description).should('have.value', data.description);
  });

  it('Filter by category', () => {
    cy.get(resourceLinks.category).select('API Automation');
    cy.get(resourceLinks.cardPosts).should('have.length.greaterThan', 0);
    cy.get(resourceLinks.category).select('Databases');
    cy.get(resourceLinks.cardPosts).should('have.length', 0);
  });

  it('Filter by language', () => {
    cy.get(resourceLinks.language).select('Java');
    cy.get(resourceLinks.cardPosts).should('have.length.greaterThan', 0);
    cy.get(resourceLinks.language).select('Cpp');
    cy.get(resourceLinks.cardPosts).should('have.length', 0);
  });
});