declare namespace Cypress {
  interface Chainable {
    /**
     * Shortcut login without the login pg
     */
    login();

    /**
     * Navigate to a specific page by name
     * @example
     * navigate('Articles', <size>)
     */
    navigate();

    /**
     * Check if browser is firefox
     */
    isFirefox();

    /**
     * Validate schema
     * @example
     * validateSchema(getArticlesSchema, body)
     */
     validateSchema();
  }
}