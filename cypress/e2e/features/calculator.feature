Feature: Calculator app with multiple builds
###Prototype Build Scenarios###

  Scenario: Adding two numbers in a prototype Build
    Given I open the app in a "Prototype" build
    When I add "5" and "5"
    And Select "Add" operation
    Then The result should be "10"

  Scenario: Substractiong two numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I Substract "10" and "4"
    And Select "Subtract" operation
    Then The result should be "6"

  Scenario: Multuplying two numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I multiply "5" and "5"
    And Select "Multiply" operation
    Then The result should be "25"

  Scenario: Dividing two numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I divide "20" and "4"
    And Select "Divide" operation
    Then The result should be "5"

  Scenario: Concatinating two numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I concatenate "10" and "2"
    And Select "Concatenate" operation
    Then The result should be "102"

  Scenario: Displaying error for non-numeric input on field 1 in a prototype build
    Given I open the app in a "Prototype" build
    When I add "five" and "5"
    And Select "Add" operation
    Then I should see an error message "Number 1 is not a number"

  Scenario: Displaying error for non-numeric input on field 2 in a prototype build
    Given I open the app in a "Prototype" build
    When I add "5" and "five"
    And Select "Add" operation
    Then I should see an error message "Number 2 is not a number"

  Scenario: Displaying error when trying to divide by 0 in a prototype build
    Given I open the app in a "Prototype" build
    When I divide "5" and "0"
    And Select "Divide" operation
    Then I should see an error message "Divide by zero error!"

  Scenario: Add zero to zero in a prototype build
    Given I open the app in a "Prototype" build
    When I add "0" and "0"
    And Select "Add" operation
    Then The result should be "0"

  Scenario: Subtract zero from zero in a prototype build
    Given I open the app in a "Prototype" build
    When I Substract "0" and "0"
    And Select "Subtract" operation
    Then The result should be "0"

  Scenario: Multiply zero with a number in a prototype build
    Given I open the app in a "Prototype" build
    When I multiply "0" and "5"
    And Select "Multiply" operation
    Then The result should be "0"

  Scenario: Divide zero by a number in a prototype build
    Given I open the app in a "Prototype" build
    When I divide "0" and "5"
    And Select "Divide" operation
    Then The result should be "0"

Scenario: Add negative numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I add "-5" and "-5"
    And Select "Add" operation
    Then The result should be "-10" 
    
Scenario: multiply negative numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I multiply "-5" and "5"
    And Select "Multiply" operation
    Then The result should be "-25"    

Scenario: Divide negative numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I divide "-20" and "-4"
    And Select "Divide" operation
    Then The result should be "5"

Scenario: Add negative numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I add "-10" and "-5"
    And Select "Add" operation
    Then The result should be "-15"

Scenario: Add two decimal numbers in a prototype Build
    Given I open the app in a "Prototype" build
    When I add "5.55" and "4.55"
    And Select "Add" operation
    Then The result should be "10.1"

Scenario: Divide two decimal numbers in a prototype build
    Given I open the app in a "Prototype" build
    When I divide "5.5" and "2.2"
    And Select "Divide" operation
    Then The result should be "2.5"        

 Scenario: Clear button should clear result field on build
    Given I open the app in a "Prototype" build
    When I add "5" and "5"
    And Select "Add" operation
    And I press the Clear button
    Then The result field should be empty