Feature: Bug Reporting UI
  As a Candidate
  I want to display professional bug reports when bugs are found
  So that I can demonstrate my ability to document severity and impact

  Background:
    Given I am on the "Untested" page

  Scenario Outline: Clicking a bug opens the detailed Report Modal
    When I click on the <Element>
    Then the "Bug Report" modal should open
    And the modal title should be "<Title>"
    And the severity badge should display "<Severity>"

    Examples:
      | Element             | Title                                             | Severity |
      | [Missing Name] Text | NullReferenceException: Portfolio Owner Name      | CRITICAL |
      | Broken Tech Icon    | Resource Load Error: Tech Stack Icons             | HIGH     |
      | [object Object]     | Type Coercion Error: Object Object                | HIGH     |

  Scenario: Unlocking the Job Done modal
    Given I have already found 4 bugs
    When I click the last remaining bug
    And I close the Bug Report modal
    Then the "Job Done" completion modal should appear
    And I should see a "Green Bug" icon
