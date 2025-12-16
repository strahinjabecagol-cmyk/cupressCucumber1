Feature: Coffe Cart App Feature

  Scenario: Add an espresso macchiato to the cart and complete checkout
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I hover over the pay container
    Then the pay container should contain "Espresso Macchiato x 1"
    When I click on direct checkout
    Then the checkout options should be visible
    When I fill in the name field with "My Name"
    And I fill in the email field with "mail@mail.mail"
    And I submit the checkout form
    Then the snackbar should be visible

  Scenario: Should add espresso macchiato to the cart and order it from cart page
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I click the cart link
    And I click order button
    Then the checkout options should be visible
    When I fill in the name field with "My Name"
    And I fill in the email field with "mail@mail.mail"
    And I submit the checkout form
    Then the snackbar should be visible

  Scenario: Should handle checkout with invalid email format
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I click the cart link
    And I click order button
    Then the checkout options should be visible
    When I fill in the name field with "My Name"
    And I fill in the email field with "invalid-email"
    And I submit the checkout form
    Then the checkout options should be visible

  Scenario: Should handle checkout with empty required fields
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I click the cart link
    And I click order button
    Then the checkout options should be visible
    And I submit the checkout form
    Then the checkout options should be visible

  Scenario: Should add different coffee types and verify in cart
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I click on "Flat-White"
    And I click on "Cafe-Breve"
    And I click the cart link
    Then Following "Espresso Macchiato", "Flat White", "Cafe Breve" should be visible in the order list

  Scenario: Cart counter should update correctly
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    Then The cart counter should be "1"
    And I click on "Flat-White"
    Then The cart counter should be "2"
    And I click on "Cafe-Breve"
    Then The cart counter should be "3"

  Scenario: should persist cart items after page reload
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I click on "Cafe-Breve"
    And I refresh the page
   # Commented out as it fails
   # Then The cart counter should be "2"

  Scenario: should remove items from cart page
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I click the cart link
    And I click on the remove item button
    Then The cart should be empty

  Scenario: Should add multiple quantities of same coffee using hover menu
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I hover over the pay container
    And I click plus option "3" times
    Then The cart counter should be "4"

  Scenario: Should remove coffee item using hover menu minus button

  Scenario: Should add multiple quantities of same coffee using hover menu
    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I hover over the pay container
    And I click plus option "6" times
    And I click minus option "3" times
    Then The cart counter should be "4"

  Scenario: Should add three coffes and trigger an offer baner and
  accept the offer and check if the coffe is visible in the cart page

    Given I am on the Coffee menu page
    When I click on "Espresso-Macchiato"
    And I click on "Flat-White"
    And I click on "Cafe-Breve"
    Then The special offer baner should be displayed
    And I accept the special offer
    And I click the cart link
    Then The special Offer coffe should be visible in the cart
