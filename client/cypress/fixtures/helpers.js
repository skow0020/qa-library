export const sizes = ['iphone-6', 'ipad-2', [1024, 768]];

export const setViewport = (size) => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1]);
  } else {
    cy.viewport(size);
  }
};