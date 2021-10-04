import { Before, Given } from 'cypress-cucumber-preprocessor/steps';

// this will only get called before scenarios tagged with @foo
Before({ tags: '@foo' }, () => {
    
});

Given('I login', (title) => {
    cy.login();
});