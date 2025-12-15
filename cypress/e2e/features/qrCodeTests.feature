Feature: tetingQR code with cypress and cucumber
###QR Code Scenarios###

  Scenario: Generate and scan QR code
    Given A page with a QR code
    When I generate the text in the QR code field
    And I scan the QR code
    Then I should see the correct number returned

  Scenario: check if this pages url is converted to proper qr code
    Given A page with a QR code
    When I Generate a qrcode for text "https://qaplayground.dev/apps/qr-code-generator/"
    And I scan the QR code
    Then I should see the correct string returned

  Scenario: Verify QR code is generated with special characters
    Given A page with a QR code
    When I Generate a qrcode for text "<>Ć"
    And I scan the QR code
    Then I should see the correct string returned

  Scenario: Verify QR code is generated with very long text (500 chars)
    Given A page with a QR code
    When I Generate a qrcode for "500" characters
    And I scan the QR code
    Then I should see the correct string returned

  Scenario: verify QR code handles empty input
    Given A page with a QR code
    When I click generate without input
    Then the QR code should not be displayed

  Scenario: verify QR code regeneration with different value
# Generate first QR code
    Given A page with a QR code
    When I Generate a qrcode for text "FirstOne"
    And I scan the QR code
    Then I should see the correct string returned
# Clear and generate second QR code with different value
    And I clear the input field
    And I Generate a qrcode for text "SecondOne"
    And I scan the QR code
    Then I should see the correct string returned

  Scenario: verify QR code with email address
    Given A page with a QR code
    When I Generate a qrcode for text "myEmail@email.mail"
    And I scan the QR code
    Then I should see the correct string returned

  Scenario: verify QR code with unicode characters Hello 世界 🌍
    Given A page with a QR code
    When I Generate a qrcode for text "Hello 世界 🌍"
    And I scan the QR code
    Then I should see the correct string returned
   
 Scenario: Verify QR code with phone number format
    Given A page with a QR code
    When I Generate a qrcode for text "234-555-666-23"
    And I scan the QR code
    Then I should see the correct string returned