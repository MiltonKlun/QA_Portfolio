Feature: Verified Checks Toggle
  As a user viewing the Verified version
  I want to toggle the visibility of green checkmarks
  So that I can see what has been verified without visual clutter

  Background:
    Given I am on the "Tested" page

  Scenario: Default state of checks
    Then I should see the "CHECKS" toggle button
    And the "CHECKS" toggle should be OFF
    And the verified checkmarks should be hidden

  Scenario: Toggling checks on
    When I click the "CHECKS" toggle button
    Then the "CHECKS" toggle should be ON
    And the verified checkmarks should be visible

  Scenario: Toggling checks off
    Given the "CHECKS" toggle is ON
    When I click the "CHECKS" toggle button
    Then the "CHECKS" toggle should be OFF
    And the verified checkmarks should be hidden

  Scenario: Top Bar UI Text
    Then I should see "VERIFIED" in the header
    And I should not see "Back to Lobby" in the header
    And I should not see "QA VERIFIED" in the header
