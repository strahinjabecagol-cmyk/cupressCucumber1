import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('I open the app in a "Prototype" build', () => {
    cy.visit("https://testsheepnz.github.io/BasicCalculator.html");
    cy.get("#selectBuild").select("Prototype");
});

When('Select {string} operation', (operation) => {
    cy.get("#selectOperationDropdown").select(operation);
    cy.get("#calculateButton").click();
})

When('I add {string} and {string}', (number1, number2) => {
    cy.get("#number1Field").type(number1);
    cy.get("#number2Field").type(number2);
})


Then('The result should be {string}', (result) => {
    cy.get("#numberAnswerField").should("have.value", result);
})

When('I multiply {string} and {string}', (number1, number2) => {
    cy.get("#number1Field").type(number1);
    cy.get("#number2Field").type(number2);
})

When('I divide {string} and {string}', (number1, number2) => {
    cy.get("#number1Field").type(number1);
    cy.get("#number2Field").type(number2);
})


When('I Substract {string} and {string}', (number1, number2) => {
    cy.get("#number1Field").type(number1);
    cy.get("#number2Field").type(number2);
})

When('I concatenate {string} and {string}', (number1, number2) => {
    cy.get("#number1Field").type(number1);
    cy.get("#number2Field").type(number2);
})

Then('I should see an error message {string}', (errorMessage) => {
    cy.get("#errorMsgField").should("have.text", errorMessage);
})

When('I press the Clear button', () => {
    cy.get("#clearButton").click();
})

Then('The result field should be empty', () => {
    cy.get("#numberAnswerField").should("have.value", "");
})


