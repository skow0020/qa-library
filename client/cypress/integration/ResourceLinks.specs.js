/// <reference types="Cypress" />

import * as addResourceLink from '../pages/AddResourceLink.json';
import * as common from '../pages/Common.json';
import * as data from '../fixtures/data.json';
import * as resourceLinks from '../pages/ResourceLinks.json';
import * as sideBar from '../components/sideBar.json';

import { selectDropdown, setViewport, sizes } from '../support/helpers';

context('Resource Links', () => {
  beforeEach(() => {
    cy.login();
  });

  sizes.forEach((size) => {
    it(`Navigate to Resource Links and add one - ${size}`, () => {
      setViewport(size);
      navigate(size);

      cy.get(resourceLinks.cardPosts).its('length').then(resourceLinksLength => {
        cy.get(resourceLinks.addResourceLink).click();
        cy.get(addResourceLink.title).type(data.title).should('have.value', data.title);
        cy.get(addResourceLink.url).type(data.url).should('have.value', data.url);
        cy.get(addResourceLink.backgroundImage).type(data.backgroundImage).should('have.value', data.backgroundImage);
        selectDropdown(addResourceLink.category, data.category);
        cy.get(addResourceLink.category).should('have.text', data.category);
        cy.get(addResourceLink.description).type(data.description).should('have.value', data.description);

        cy.get(common.submit).click();
        cy.get(common.alertModal).should('have.text', 'ResourceLink added successfully');

        cy.url().should('contain', 'resource-links');
        cy.get(resourceLinks.cardPosts).should('have.length', resourceLinksLength + 1);
      });
    });

    it(`Filter by category - ${size}`, () => {
      setViewport(size);
      navigate(size);

      selectDropdown(resourceLinks.category, 'API Automation');
      cy.get(resourceLinks.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(resourceLinks.category, 'Databases');
      cy.get(resourceLinks.cardPosts).should('have.length', 0);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      navigate(size);

      selectDropdown(resourceLinks.language, 'Java');
      cy.get(resourceLinks.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(resourceLinks.language, 'Cpp');
      cy.get(resourceLinks.cardPosts).should('have.length', 0);
    });
  });
});

const navigate = (size) => {
  if (!Cypress._.isArray(size)) {
    cy.get(common.navLink).click();
    cy.get(sideBar.rightResourceLinks).click();
  }
  else cy.get(sideBar.resourceLinks).click();
  cy.get(common.pageTitle).should('have.text', 'ResourceLinks');
};