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
  cy.readQRCode('./cypress/screenshots/qr-code.png').then((text) => {
    cy.log(text);

  });
});

When('I scan the QR code', () => {
  cy.get(".qr-code")
    .should("be.visible")
    .screenshot("qr-code", { overwrite: true });
});


When('I Generate a qrcode for an url {string}', (s) => {
  cy.get("input[type=text]").type(s);
  cy.get("button").click();
})


Then('I should see the correct string returned', () => {
  cy.readQRCode('./cypress/screenshots/qr-code.png').then((text) => {
    cy.wrap(text).should("equal", "https://qaplayground.dev/apps/qr-code-generator/");
  });
});


