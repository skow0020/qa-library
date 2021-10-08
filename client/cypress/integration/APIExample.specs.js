
import { getArticlesSchema } from './schemas/articles';
const BASE_URL = 'https://qa-library-dev.herokuapp.com/';

describe('Articles API integration tests', function () {
  beforeEach(() => {
    cy.request({
      method: 'GET',
      url: `${BASE_URL}api/articles`
    }).as('articlesResult');
  });

  it('Get articles returns success with status of 200', () => {
    cy.get('@articlesResult').its('status').should('be.equal', 200);
  });

  it('Get articles returns a list of articles in data', () => {
    cy.get('@articlesResult').its('body.data').should('have.length.greaterThan', 1);
  });

  it('Get articles schema is valid', () => {
    cy.get('@articlesResult').its('body').then((body) => {
      cy.validateSchema(getArticlesSchema, body);
    });
  });
});