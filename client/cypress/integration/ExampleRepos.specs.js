/// <reference types="Cypress" />

import * as common from '../pages/Common.json';
import * as exampleRepos from '../pages/ExampleRepos.json';

import { selectDropdown, setViewport, sizes } from '../fixtures/helpers';

context('Example Repos', () => {
  sizes.forEach((size) => {
    it(`Repos load successfully - ${size}`, () => {
      setViewport(size);
      cy.login();
      cy.navigate('Example Repos', size);
      cy.get(exampleRepos.firstQARepoTitle);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.login();
      cy.navigate('Example Repos', size);
      selectDropdown(exampleRepos.language, 'Java');
      cy.get(exampleRepos.qaRepos).should('have.length.greaterThan', 0);
      selectDropdown(exampleRepos.language, 'Swift');
      cy.get(exampleRepos.qaRepos).should('have.length', 0);
    });
  });
});