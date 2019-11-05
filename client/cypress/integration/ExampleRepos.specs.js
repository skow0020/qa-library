/// <reference types="Cypress" />

import { sizes, setViewport } from '../fixtures/helpers';

import * as common from '../pages/Common.json';
import * as exampleRepos from '../pages/ExampleRepos.json';
import * as sideBar from '../components/sideBar.json';

context('Example Repos', () => {
  beforeEach(() => {
    cy.visit('qa-dashboard');
    cy.get(sideBar.exampleRepos).click();
    cy.get(common.pageTitle).should('have.text', 'Example Repos');
  });

  sizes.forEach((size) => {
    it(`Repos load successfully - ${size}`, () => {
      setViewport(size);
      cy.get(exampleRepos.firstQARepoTitle);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.get(exampleRepos.language).select('Java');
      cy.get(exampleRepos.qaRepos).should('have.length.greaterThan', 0);
      cy.get(exampleRepos.language).select('Swift');
      cy.get(exampleRepos.qaRepos).should('have.length', 0);
    });
  });
});