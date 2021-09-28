/// <reference types="Cypress" />

import * as addArticle from '../pages/AddArticle.json';
import * as articles from '../pages/Articles.json';
import * as common from '../pages/Common.json';
import * as data from '../fixtures/data.json';
import * as sideBar from '../components/sideBar.json';

import { selectDropdown, setViewport, sizes } from '../fixtures/helpers';

context('Articles', () => {
  sizes.forEach((size) => {
    it(`Navigate to Articles and add one - ${size}`, () => {
      setViewport(size);
      cy.login();
      navigate(size);
      cy.get(articles.addArticle).click();
      cy.get(common.pageTitle).should('have.text', 'Add an Article');
      cy.get(addArticle.title).type(data.title).should('have.value', data.title);
      cy.get(addArticle.author).type(data.author).should('have.value', data.author);
      cy.get(addArticle.url).type(data.url).should('have.value', data.url);
      cy.get(addArticle.backgroundImage).type(data.backgroundImage).should('have.value', data.backgroundImage);
      cy.get(addArticle.description).type(data.description).should('have.value', data.description);
      selectDropdown(addArticle.category, data.category);
      cy.get(addArticle.category).should('have.text', data.category);

      cy.get(common.submit).click();
      cy.get(common.alertModal).should('have.text', 'Article added successfully');

      cy.wait(2000);
      cy.url().should('contain', 'articles');
    });

    it(`Filter by category - ${size}`, () => {
      setViewport(size);
      cy.login();
      navigate(size);

      selectDropdown(articles.category, 'API Automation');
      cy.get(articles.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(articles.category, 'Databases');
      cy.get(articles.cardPosts).should('have.length', 0);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.login();
      navigate(size);
      selectDropdown(articles.language, 'Java');
      cy.get(articles.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(articles.language, 'Cpp');
      cy.get(articles.cardPosts).should('have.length', 0);
    });
  });
});

const navigate = (size) => {
  if (!Cypress._.isArray(size)) {
    cy.get(common.navLink).click();
    cy.get(sideBar.rightArticles).click();
  }
  else cy.get(sideBar.articles).click();
  cy.get(common.pageTitle).should('have.text', 'Articles');
};
