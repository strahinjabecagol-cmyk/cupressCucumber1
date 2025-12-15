/// <reference types="cypress" /> 
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('A page with a QR code', () => {
  cy.visit("https://qaplayground.dev/apps/qr-code-generator/");
});

When('I generate the text in the QR code field', () => {

  cy.get("input[type=text]").type("1234567890");
  cy.get("button").click();

});

Then('I should see the correct number returned', () => {
  cy.get("@screenshotPath").then((screenshotPath) => {
    cy.task("readQRCode", screenshotPath).then((text) => {
      cy.log(text);
    });
  });
});

When('I scan the QR code', () => {
  const screenshotName = `qr-code-${Date.now()}`;
  cy.get(".qr-code")
    .should("be.visible")
    .screenshot(screenshotName, { overwrite: true });
  // Retrieve the actual screenshot path from the after:screenshot event
  cy.task("getLastScreenshotPath").then((screenshotPath) => {
    cy.wrap(screenshotPath).as("screenshotPath");
  });
});


When('I Generate a qrcode for text {string}', (s) => {
  cy.get("input[type=text]").type(s);
  cy.get("button").click();
  cy.wrap(s).as("inputValue")
})


Then('I should see the correct string returned', () => {
  cy.get("@inputValue").then((inputValue) => {
    cy.get("@screenshotPath").then((screenshotPath) => {
      cy.task("readQRCode", screenshotPath).then((actualQRcodeValue) => {
        cy.wrap(actualQRcodeValue).should("equal", inputValue);
      });
    });
  });
});

When('I Generate a qrcode for {string} characters', (s) => {
  const longText = 'A'.repeat(s);
  cy.get("input[type=text]").type(longText);
  cy.get("button").click();
  cy.wrap(longText).as("inputValue");
});

Then('The QR code container should be not visible', () => {
  cy.get(".qr-code").should('not.be.visible')
});

When('I click generate without input', () => {
  cy.get('button').click();
});

Then('the QR code should not be displayed', () => {
  cy.get('.qr-code').should('not.be.visible');
});

Then('I clear the input field', () => {
   cy.get("input[type=text]").clear();
})




