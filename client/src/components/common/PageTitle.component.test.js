import PageTitle from './PageTitle';
import React from 'react';
import { mount } from '@cypress/react';

describe('PageTitle Unit Tests', () => {
  it('PageTitle renders', () => {
    mount(<PageTitle title="Add an Article"/>);

    cy.get('.page-title').contains('Add an Article');
  });
});