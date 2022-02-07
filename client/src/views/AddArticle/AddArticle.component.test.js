import AddArticle from './AddArticle';
import React from 'react';
import { mount } from '@cypress/react';

it('AddArticle renders', () => {
  mount(<AddArticle />);
  cy.get('.page-title').contains('Add an Article');
  cy.get('#title').type('titlee')
  cy.get('#author').type('titlee')
  cy.get('#url').type('titlee')
  cy.get('#backgroundImage').type('titlee')
  cy.get('#title').type('titlee')

  cy.intercept('POST', '**/api/articles', { statusCode: 201, fixture: 'article.json' });

  cy.get('#submit-button').contains('Submit').click()
  cy.contains('Article added successfully')
});

