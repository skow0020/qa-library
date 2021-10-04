/// <reference types="Cypress" />

import * as common from '../pages/Common.json';
import * as inOfficeBook from '../pages/InOfficeBook.json';
import * as inOfficeLibrary from '../pages/InOfficeLibrary.json';
import * as sideBar from '../components/sideBar.json';

import { setViewport, sizes } from '../fixtures/helpers';

context('In Office Library', () => {
  beforeEach(() => {
    cy.login();
  });

  sizes.forEach((size) => {
    it(`In office book page check in error - ${size}`, () => {
      setViewport(size);
      navigate(size);
      cy.intercept('PATCH', 'api/officeLibraryBooks/decrementCopiesCheckedOut').as('decrementCall');

      cy.visit('officeBook/1000');
      cy.get(inOfficeBook.cardTitle).should('have.text', 'How to sand a hippo');
      cy.get(inOfficeBook.checkInButton).click();
      cy.wait('@decrementCall');

      cy.get(common.alertModal).should('not.have.text', ''); //Not sure why this works
      cy.get(common.alertModal).should('have.text', 'Unable to check out book: Request must include a user');
    });

    it(`In office book page check out error - ${size}`, () => {
      setViewport(size);
      navigate(size);
      cy.intercept('PATCH', 'api/officeLibraryBooks/incrementCopiesCheckedOut').as('incrementCall');

      cy.visit('officeBook/1000');
      cy.get(inOfficeBook.cardTitle).should('have.text', 'How to sand a hippo');
      cy.get(inOfficeBook.checkoutButton).click();
      cy.wait('@incrementCall');
    });

    it(`In office library login - ${size}`, () => {
      setViewport(size);
      navigate(size);

      cy.get(inOfficeLibrary.githubLogin).click();
    });
  });
});

const navigate = (size) => {
  if (!Cypress._.isArray(size)) {
    cy.get(common.navLink).click();
    cy.get(sideBar.rightInOfficeLibrary).click();
  }
  else cy.get(sideBar.inOfficeLibrary).click();
  cy.get(common.pageTitle).should('have.text', 'In-Office Library');
};