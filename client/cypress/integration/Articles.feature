Feature: Articles feature
  
  Scenario: Verify Articles
    Given I login
    When I access 'Articles'
    Then I see articles