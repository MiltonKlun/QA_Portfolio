Feature: Mobile Navigation

  As a mobile user
  I want to have a sticky bottom navigation bar
  So that I can easily switch between sections without scrolling back to the top

  Background:
    Given I am on the "Untested" page
    And I am viewing on a mobile device

  Scenario: Bottom navigation visibility
    Then the bottom navigation bar should be visible
    And the bottom navigation should contain "About", "Skills", and "Experience" links
    And the sidebar navigation should be hidden

  Scenario: Navigate to Skills section
    When I tap on "Skills" in the bottom navigation
    Then I should be scrolled to the "skills" section

  Scenario: Navigate to Experience section
    When I tap on "Experience" in the bottom navigation
    Then I should be scrolled to the "experience" section
