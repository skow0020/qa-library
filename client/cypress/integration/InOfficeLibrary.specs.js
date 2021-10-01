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
    it(`In office book page check in - ${size}`, () => {
      setViewport(size);
      navigate(size);

      cy.visit('officeBook/1000');
      cy.get(inOfficeBook.cardTitle).should('have.text', 'How to sand a hippo');
      cy.get(inOfficeBook.checkInButton).click();
      cy.get(inOfficeBook.checkInButton).click();

      cy.on('window:confirm', (str) => {
        expect(str).to.equal('Unable to check in book: Request must include a user');
      });
    });

    it(`In office book page check out - ${size}`, () => {
      setViewport(size);
      navigate(size);

      cy.visit('officeBook/1000');
      cy.get(inOfficeBook.cardTitle).should('have.text', 'How to sand a hippo');
      cy.get(inOfficeBook.checkoutButton).click();

      cy.on('window:confirm', (str) => {
        expect(str).to.equal('Unable to check out book: Request must include a user');
      });
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