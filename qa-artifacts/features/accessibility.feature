Feature: Accessibility Testing
  As a QA Engineer
  I want to verify the accessibility of the portfolio
  So that it is usable by everyone and meets WCAG standards

  @a11y @a11y-tested
  Scenario: Verified Mode Accessibility Check
    Given I navigate to the "Tested" portfolio page
    Then the page should have no significant accessibility violations

  @a11y @a11y-untested
  Scenario: Untested Mode Accessibility Check (Audit)
    Given I navigate to the "Untested" portfolio page
    Then the page should have known accessibility violations
