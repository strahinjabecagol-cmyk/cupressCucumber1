/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the Coffee menu page', () => {
    cy.visit("https://coffee-cart.app/");
});

When('I click on {string}', (itemName) => {
    // Convert item name to data-test format (spaces become underscores)
    const dataTestValue = itemName.replace(/ /g, '_');
    cy.get(`[data-cy="${dataTestValue}"]`).click();
});

When('I hover over the pay container', () => {
    cy.get('[data-test="checkout"]').trigger('mouseover');
});

Then('the pay container should contain {string}', (expectedText) => {
    // Cart list becomes visible after hover
    cy.get('.pay-container').should('be.visible').and('contain.text', expectedText);
});

When('I click on direct checkout', () => {
    cy.get('[data-test="checkout"]').click();
});

Then('the checkout options should be visible', () => {
    cy.get('[aria-label="Payment form"]').should('be.visible');
});

When('I fill in the name field with {string}', (name) => {
    cy.get('#name').type(name);
});

When('I fill in the email field with {string}', (email) => {
    cy.get('#email').type(email);
});

When('I submit the checkout form', () => {
    cy.get('#submit-payment').click();
});

Then('the snackbar should be visible', () => {
    cy.get('.snackbar').should('be.visible');
});

When('I click the cart link', () => {
    cy.get('[aria-label="Cart page"]').click();
});

When('I click order button', () => {
    cy.get('[data-test="checkout"]').click();
});

Then('Following {string}, {string}, {string} should be visible in the order list', (s, s1, s2) => {
    cy.get('ul').should('contain.text', s)
    cy.get('ul').should('contain.text', s1)
    cy.get('ul').should('contain.text', s2)
});

Then('The cart counter should be {string}', (count) => {
    cy.get('[aria-label="Cart page"]').should('have.text', `cart (${count})`);
});

When('I refresh the page', () => {
    cy.reload();
});

Then('The cart should be empty', () => {
    cy.get('.list').should('contain.text', 'No coffee, go add some.');
});

When('I click on the remove item button', () => {
    cy.get('.delete').click();
});

When('I click plus option {string} times', (s) => {

    for (i = 0; i < s; i++) {
        cy.get('[aria-label="Add one Espresso Macchiato"]').click()
    }
});

When('I click minus option {string} times', (s) => {
    for (i = 0; i < s; i++) {
        cy.get('[aria-label="Remove one Espresso Macchiato"]').click();
    }
});

Then('The special offer baner should be displayed', () => {
    cy.get('.promo').should('contain.text', 'It\'s your lucky day! Get an extra cup of Mocha for $4.');
})

Then('The special Offer coffe should be visible in the cart', () => {
    cy.get('ul').should('contain.text', '(Discounted) Mocha');
})

Then('I accept the special offer', () => {
    cy.get('.promo .yes').click();
})
