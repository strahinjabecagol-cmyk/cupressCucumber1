Feature: tetingQR code with cypress and cucumber
###QR Code Scenarios###

  Scenario: Generate and scan QR code
    Given A page with a QR code
    When I generate the text in the QR code field
    And I scan the QR code
    Then I should see the correct number returned

  Scenario: check if this pages url is converted to proper qr code
    Given A page with a QR code
    When I Generate a qrcode for an url "https://qaplayground.dev/apps/qr-code-generator/"
    And I scan the QR code
    Then I should see the correct string returned

  Scenario: Verify QR code is generated for simple text
    Given A page with a QR code

  Scenario: Verify QR code is generated for simple text (Hello World)
    Given A page with a QR code

  Scenario: Verify QR code is generated with special characters
    Given A page with a QR code

  Scenario: Verify QR code is generated with very long text (500 chars)
    Given A page with a QR code

  Scenario: verify QR code handles empty input

  Scenario: verify QR code regeneration with different value
# Generate first QR code
# Clear and generate second QR code with different value
# Wait a bit for the QR code to update

  Scenario: verify QR code with email address

  Scenario: verify QR code with unicode characters Hello 世界 🌍

  Scenario: Verify QR code with phone number format
