Feature: Bug Hint System

    Background:
        Given I am on the "Untested" page

    Scenario: Bug Hints Toggle Visibility
        Then I should see the "Hints" toggle button in the header
        And the "Hints" toggle should be "OFF" by default

    Scenario: Enabling Bug Hints
        When I toggle the "Hints" switch to "ON"
        Then I should see pulsing red dots near the bugs
        And the "Hints" toggle should indicate "ON"

    Scenario: Hints Disappear When Bug Found
        Given I have toggled the "Hints" switch to "ON"
        When I click the "Missing Name" bug
        And I close the Bug Report modal
        Then the hint for "Missing Name" should disappear
        And the hint for "Social Links" should still be visible
