/// <reference types="Cypress" />

import * as common from '../pages/Common.json';
import * as exampleRepos from '../pages/ExampleRepos.json';
import * as sideBar from '../components/sideBar.json';

import { login, setViewport, sizes } from '../fixtures/helpers';

context('Example Repos', () => {
  sizes.forEach((size) => {
    it(`Repos load successfully - ${size}`, () => {
      setViewport(size);
      login();
      navigate(size);
      cy.get(exampleRepos.firstQARepoTitle);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      login();
      navigate(size);
      cy.get(exampleRepos.language).select('Java');
      cy.get(exampleRepos.qaRepos).should('have.length.greaterThan', 0);
      cy.get(exampleRepos.language).select('Swift');
      cy.get(exampleRepos.qaRepos).should('have.length', 0);
    });
  });
});

const navigate = (size) => {
  if (size === 'iphone-6') cy.get(common.navLink).click();
  cy.get(sideBar.exampleRepos).click();
  cy.get(common.pageTitle).should('have.text', 'Example Repos');
};