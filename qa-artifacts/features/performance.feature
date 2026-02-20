Feature: Performance and Network Testing
  As a QA Engineer
  I want to ensure the application performs well and handles network issues
  So that users have a smooth experience even under adverse conditions

  @perf @perf-load
  Scenario: Tested Mode Page Load Performance
    Given I start monitoring console errors
    And I perform a strict navigation to the "Tested" portfolio page
    Then the page "LCP" should be less than 2500 ms
    And there should be no console errors

  @perf @perf-network
  Scenario: Network Failure Simulation (Image Load)
    Given I start monitoring console errors
    And I intercept and fail image requests for "jira.png"
    When I perform a strict navigation to the "Tested" portfolio page
    Then I should see a fallback placeholder for the failed image
