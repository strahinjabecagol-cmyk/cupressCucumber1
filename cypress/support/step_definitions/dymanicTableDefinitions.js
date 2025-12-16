/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I go to the Dynamic Table page', () => {
    cy.visit('https://qaplayground.dev/apps/dynamic-table/');
});

Then('there should be a table with {string}', (heroName) => {
    cy.contains('tbody tr', heroName).should('exist');
});