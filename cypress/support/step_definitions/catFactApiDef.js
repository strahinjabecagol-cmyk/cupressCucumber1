import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
let baseUrl = "https://catfact.ninja";

Given("the fact endpoint", () => {
    cy.wrap(`${baseUrl}/fact`).as("endpoint");

});

When('a request is made', () => {
    cy.get("@endpoint").then((endpoint) => {
        cy.request(endpoint).as("apiResponse");
    })

});

Then('it should return a single cat fact with valid structure', () => {
    cy.get("@apiResponse").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('fact');
        expect(response.body).to.have.property('length');
        expect(response.body.fact).to.be.a('string');
        expect(response.body.length).to.be.a('number');
    });
});


Then('the length property should match the fact text length', () => {
    cy.get("@apiResponse").then((response) => {
        const factText = response.body.fact;
        const lengthValue = response.body.length;
        expect(factText.length).to.eq(lengthValue);
    });
});

