// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
import * as common from '../pages/Common.json';
import * as sideBar from '../components/sideBar.json';
import { login } from '../fixtures/helpers';

// -- This is a parent command --
Cypress.Commands.add('login', () => {
  if (Cypress.config().baseUrl.includes('localhost')) {
    cy.intercept(
      {
        method: 'GET',
        url: '/checkToken'
      },
      {
        statusCode: 200
      }

    ).as('checkToken');

    cy.visit('qa-dashboard');
  } else { login(); }
});

Cypress.Commands.add('navigate', (page, size) => {
  if (!Cypress._.isArray(size)) {
    cy.get(common.navLink).click();
    cy.get(`#right-sidebar ${sideBar[page]}`).click();
  }
  else cy.get(sideBar[page]).click();
  cy.get(common.pageTitle).should('have.text', page);
});
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
