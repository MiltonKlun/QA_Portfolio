Feature: Enhanced Bugs
  As a user in Untested Mode
  I want to see animated/interactive bug states
  So that I can identify complex rendering and data issues

  @enhanced @bug-1-enhanced
  Scenario: Missing Name Flicker
    Given I am on the "Untested Mode" page
    When I look at the Portfolio Owner Name
    Then the name should flicker through garbage values
    And eventually settle on "[Missing Name]"

  @enhanced @bug-4-enhanced
  Scenario: Project Description Corruption Cascade
    Given I am on the "Untested Mode" page
    When I scroll to the "Experience" section
    And I wait for 2 seconds
    Then the second project description should corrupt to "[object Object]"
    And the corrupted text should have the "text-danger" class
