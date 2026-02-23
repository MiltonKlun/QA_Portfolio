Feature: Visual Regression
  As a QA Engineer
  I want to verify the visual appearance of the portfolio
  So that I can detect unintended UI changes

  @visual @visual-tested
  @visual @visual-tested
  Scenario Outline: Tested Mode Visual Check in <Theme>
    Given I navigate to the "Tested" portfolio page
    And I toggle the application theme to "<Theme>"
    Then the page should match the "tested-mode-<Theme>" snapshot

    Examples:
      | Theme |
      | Light |
      | Dark  |

  @visual @visual-untested
  Scenario Outline: Untested Mode Visual Check in <Theme>
    Given I navigate to the "Untested" portfolio page
    And I toggle the application theme to "<Theme>"
    When I wait for 3 seconds
    Then the page should match the "untested-mode-<Theme>" snapshot with masking

    Examples:
      | Theme |
      | Light |
      | Dark  |
