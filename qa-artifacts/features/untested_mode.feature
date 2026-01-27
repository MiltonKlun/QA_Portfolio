Feature: Untested Portfolio Experience
  As a Recruiter
  I want to see specific intentional bugs
  So that I can evaluate the QA Engineer's ability to identify and document defects

  Background:
    Given I navigate to the "Untested" portfolio page

  @severity=critical
  Scenario: Hero section displays a Null Reference error
    When I view the Hero Headline
    Then I should see the text "[Missing Name]"
    And the text color should be "red"

  @severity=high
  Scenario: Social Media links are broken
    When I click the "Connect" button in the sidebar
    And I click the "LinkedIn" icon
    Then the browser should fail to navigate to a valid URL
    And I should remain on the same page or see an error

  @severity=high
  Scenario: Mobile layout overflows on small screens
    Given I set the viewport width to "375px"
    When I scroll to the "About Me" section
    Then the text paragraph should overflow the container
    And a horizontal scrollbar should be visible
