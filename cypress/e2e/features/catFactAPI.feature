Feature: CatFactsAPI Testing
###Cat Fact API Scenarios###

  Scenario: Get a single Cat Fact
    Given the fact endpoint
    When a request is made
    Then it should return a single cat fact with valid structure

  Scenario: length property matches fact text length
    Given the fact endpoint
    When a request is made
    Then the length property should match the fact text length

  Scenario: Sanity check the length property is a positive number
    Given the fact endpoint
    When a request is made
    Then the length should be a positive number

  Scenario: The fact endpoint should return different facts on multiple requests
    Given the fact endpoint
    When multiple requests are made
    Then it should return different facts

  Scenario: Validate max_length parameter functionality
    Given the fact endpoint
    When max_length parameter is set to "40"
    Then fact should not exceed max length of "40"

  Scenario: When no parameters are provided results should be paginated
    Given the facts endpoint
    When a request is made without parameters
    Then it should return paginated facts
#   Scenario:
#     Given the facts endpoint
#     When data is retrieved
#     Then it should have proper pagination structure
#   Scenario:
#     Given the facts endpoint
#     When first page is requested
#     Then prev_page_url should be null
#   Scenario:
#     Given the facts endpoint
#     When second page is requested
#     Then it should have both prev and next URLs
#   Scenario:
#     Given the facts endpoint
#     When limit parameter is provided
#     Then it should return specified number of facts
