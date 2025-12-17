Feature: testing TODO app

  Scenario: should check if switching from dark to light mode works
    Given TODO app page is open
    When I toggle dark to light mode
    Then the mode should be swtiched

  Scenario: should check if it is possible to add 10 tasks to the list mark 5 as done and delete two
    Given TODO app page is open
    When I add "10" tasks
    And I mark "5" tasks as done
    And I delete "2" tasks
    Then There should be total of "8" tasks remaining "3" active

  Scenario: Should validate that "All", "Active" and "Completed" filters work as expected
    Given TODO app page is open
    When I add "3" tasks
    And I mark "1" tasks as done
    And filter by "completed"
    Then only "completed" tasks should be visible
    And filter by "active"
    Then only "active" tasks should be visible
    And filter by "all"
    Then only "all" tasks should be visible

  Scenario: Clearing completed should remove all completed items from the list
    Given TODO app page is open
    When I add "3" tasks
    And I mark "1" tasks as done
    And I click clear completed btn
    And filter by "all"
    Then There should only be "active" tasks visible in the list

  Scenario: Selecting an active filter and clicking complete on the item should remove the item from the list
    Given TODO app page is open
    When I add "1" tasks
    And filter by "active"
    And I mark "1" tasks as done
    Then There should be no active tasks visible message

  Scenario: Should not allow adding empty tasks or tasks with only whitespace
    Given TODO app page is open
    When I add an empty tasks with just whitespace
    And filter by "active"
    Then There should be no active tasks visible message

  Scenario: Should allow adding tasks using Enter key
    Given TODO app page is open
    When I add "1" task by pressing enter
    Then There should only be "active" tasks visible in the list
#   Scenario: Should display accurate counter for total and active tasks
#     Given TODO app page is open
# TODO THERE IS A KNOWN BUG HERE

  Scenario: Should allow toggling tasks between completed and active states
    Given TODO app page is open

  Scenario: Should handle very long task descriptions
    Given TODO app page is open

  Scenario: Should handle special characters and emojis in task descriptions
    Given TODO app page is open

  Scenario: Should properly escape HTML and prevent XSS in task descriptions
    Given TODO app page is open

  Scenario: Should maintain correct filter state when deleting tasks
    Given TODO app page is open

  Scenario: Should correctly display "All" filter with mixed completed and active tasks
    Given TODO app page is open

  Scenario: Should display empty state message when no tasks exist
    Given TODO app page is open

  Scenario: Should clear input field after adding a task
    Given TODO app page is open
