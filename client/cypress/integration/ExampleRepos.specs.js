/// <reference types="Cypress" />

import * as exampleRepos from '../pages/ExampleRepos.json';

import { selectDropdown, setViewport, sizes } from '../support/helpers';

context('Example Repos', () => {
  beforeEach(() => {
    cy.login();
  });

  sizes.forEach((size) => {
    it(`Repos load successfully - ${size}`, () => {
      setViewport(size);
      cy.navigate('Example Repos', size);
      
      cy.get(exampleRepos.firstQARepoTitle);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.navigate('Example Repos', size);

      selectDropdown(exampleRepos.language, 'Java');
      cy.get(exampleRepos.qaRepos).should('have.length.greaterThan', 0);
      selectDropdown(exampleRepos.language, 'Swift');
      cy.get(exampleRepos.qaRepos).should('have.length', 0);
    });
  });
});