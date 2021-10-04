import { When, Then } from 'cypress-cucumber-preprocessor/steps';
import * as common from '../../pages/Common.json';
import * as sideBar from '../../components/sideBar.json';
import { selectDropdown } from '../../fixtures/helpers';
import * as articles from '../../pages/Articles.json';

When('I access {string}', (section) => {
    cy.get(sideBar['Articles']).click();
    cy.get(common.pageTitle).should('have.text', section);
});

Then('I see articles', () => {
    selectDropdown(articles.category, 'API Automation');
    cy.get(articles.cardPosts).should('have.length.greaterThan', 0);
    selectDropdown(articles.category, 'Databases');
    cy.get(articles.cardPosts).should('have.length', 0);
});