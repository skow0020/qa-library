/// <reference types="Cypress" />

import * as common from '../pages/Common.json';
import * as exampleRepos from '../pages/ExampleRepos.json';
import * as sideBar from '../components/sideBar.json';

import { selectDropdown, setViewport, sizes } from '../fixtures/helpers';

context('Example Repos', () => {
  sizes.forEach((size) => {
    it(`Repos load successfully - ${size}`, () => {
      setViewport(size);
      cy.login();
      navigate(size);
      cy.get(exampleRepos.firstQARepoTitle);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.login();
      navigate(size);
      selectDropdown(exampleRepos.language, 'Java');
      cy.get(exampleRepos.qaRepos).should('have.length.greaterThan', 0);
      selectDropdown(exampleRepos.language, 'Swift');
      cy.get(exampleRepos.qaRepos).should('have.length', 0);
    });
  });
});

const navigate = (size) => {
  if (!Cypress._.isArray(size)) {
    cy.get(common.navLink).click();
    cy.get(sideBar.rightExampleRepos).click();
  }
  else cy.get(sideBar.exampleRepos).click();
  cy.get(common.pageTitle).should('have.text', 'Example Repos');
};