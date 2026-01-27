Feature: Tested Portfolio Experience
  As a Hiring Manager
  I want to see the fixed version of the portfolio
  So that I can see the "Green Tick" verifications and clean UI

  Scenario: Toggling to Tested Mode repairs the application
    Given I am on the "Untested" page
    When I click the "Switch to Tested Version" toggle
    Then I should be redirected to the "Tested" page
    And the URL should contain "/tested"
    And the Hero Headline should display "QA Automation Engineer"
    And the Tech Stack images should load correctly

  Scenario: Verified Badges link to Code
    Given I am on the "Tested" page
    When I hover over the "Green Tick" badge in the About section
    Then I should see a tooltip with "Responsive text verified"
