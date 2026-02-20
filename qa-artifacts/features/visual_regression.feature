Feature: Visual Regression
  As a QA Engineer
  I want to verify the visual appearance of the portfolio
  So that I can detect unintended UI changes

  @visual @visual-tested
  Scenario: Tested Mode Visual Check
    Given I navigate to the "Tested" portfolio page
    Then the page should match the "tested-mode" snapshot

  @visual @visual-untested
  Scenario: Untested Mode Visual Check
    Given I navigate to the "Untested" portfolio page
    When I wait for 3 seconds
    Then the page should match the "untested-mode" snapshot with masking
