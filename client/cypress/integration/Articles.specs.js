/// <reference types="Cypress" />

import * as addArticle from '../pages/AddArticle.json';
import * as articles from '../pages/Articles.json';
import * as common from '../pages/Common.json';

import { selectDropdown, setViewport, sizes } from '../support/helpers';

context('Articles', () => {
  beforeEach(() => {
    cy.login();
  });

  sizes.forEach((size) => {
    it(`Navigate to Articles and add one - ${size}`, () => {
      setViewport(size);
      cy.navigate('Articles', size);


      cy.get(articles.cardPosts).as('cardPosts').its('length').then(articlesLength => {
        cy.get(articles.addArticle).click();
        cy.get(common.pageTitle).should('have.text', 'Add an Article');
        cy.fixture('articles').then((article) => {
          const { title, author, url, backgroundImage, body, category } = article.data[0];
          cy.get(addArticle.title).type(title).should('have.value', title);
          cy.get(addArticle.author).type(author).should('have.value', author);
          cy.get(addArticle.url).type(url).should('have.value', url);
          cy.get(addArticle.backgroundImage).type(backgroundImage).should('have.value', backgroundImage);
          cy.get(addArticle.description).type(body).should('have.value', body);
          selectDropdown(addArticle.category, category);
          cy.get(addArticle.category).should('have.text', category);
        });

        cy.get(common.submit).click();
        cy.get(common.alertModal).should('have.text', 'Article added successfully error!');

        cy.url().should('contain', 'articles');
        cy.get('@cardPosts').should('have.length', articlesLength + 1);
      });
    });

    it(`Filter by category - ${size}`, () => {
      setViewport(size);
      cy.navigate('Articles', size);

      selectDropdown(articles.category, 'API Automation');
      cy.get(articles.cardPosts).as('cardPosts').should('have.length.greaterThan', 0);
      selectDropdown(articles.category, 'Databases');
      cy.get(common.loadingSpinner).should('not.exist');
      cy.get('@cardPosts').should('have.length', 0);
    });

    it(`Filter by language - ${size}`, () => {
      setViewport(size);
      cy.navigate('Articles', size);
      selectDropdown(articles.language, 'Java');
      cy.get(articles.cardPosts).should('have.length.greaterThan', 0);
      selectDropdown(articles.language, 'Cpp');
      cy.get(articles.cardPosts).should('have.length', 0);
    });
  });
});
