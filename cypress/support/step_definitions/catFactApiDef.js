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

Then('the length should be a positive number', () => {
    cy.get("@apiResponse").then((response) => {
        const lengthValue = response.body.length;
        expect(lengthValue).to.be.greaterThan(0);
    });
})

Then('it should return different facts', () => {
    Then('it should return different facts', () => {
        const facts = [];

        cy.get("@apiResponse1").then(r => facts.push(r.body.fact));
        cy.get("@apiResponse2").then(r => facts.push(r.body.fact));
        cy.get("@apiResponse3").then(r => facts.push(r.body.fact));

        cy.then(() => {
            expect(facts[0]).to.not.eq(facts[1]);
            expect(facts[0]).to.not.eq(facts[2]);
            expect(facts[1]).to.not.eq(facts[2]);
        });
    });
});

When('multiple requests are made', () => {
    cy.get("@endpoint").then((endpoint) => {
        cy.request(endpoint).as("apiResponse1");
        cy.request(endpoint).as("apiResponse2");
        cy.request(endpoint).as("apiResponse3");
    })
})

Then('fact should not exceed max length of {string}', (max_length) => {
    cy.get("@apiResponse").then((response) => {
        const factText = response.body.fact;
        expect(factText.length).to.be.at.most(Number(max_length));
    });
})

When('max_length parameter is set to {string}', (max_length) => {
    cy.get("@endpoint").then((endpoint) => {
        cy.request(`${baseUrl}/fact?max_length=${max_length}`).as("apiResponse");
    })
})

Given('the facts endpoint', () => {
    cy.wrap(`${baseUrl}/facts`).as("endpoint");
})

When('a request is made without parameters', () => {
    cy.get("@endpoint").then((endpoint) => {
        cy.request(endpoint).as("apiResponse");
    })
})

Then('it should return paginated facts', () => {
    cy.get("@apiResponse").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('data');
        expect(response.body).to.have.property('current_page');
        expect(response.body).to.have.property('last_page');
        expect(response.body.data).to.be.an('array');
        expect(response.body.current_page).to.be.a('number');
        expect(response.body.last_page).to.be.a('number');
    });
})

When('page {string} is requested', (pageNumber) => {
    cy.get("@endpoint").then((endpoint) => {
        cy.request(`${endpoint}?page=${pageNumber}`).as("apiResponse");
    });
})

Then('prev_page_url should be null', () => {
    cy.get("@apiResponse").then((response) => {
        expect(response.body).to.have.property('prev_page_url', null);
    });
})

Then('it should have both prev and next URLs', () => {
    cy.get("@apiResponse").then((response) => {
        expect(response.body).to.have.property('prev_page_url').that.is.not.null;
        expect(response.body).to.have.property('next_page_url').that.is.not.null;
    });
})

Then('it should return specified number of facts', () => {
    cy.get("@apiResponse").then((response) => {
        expect(response.body.data.length).to.eq(5);
    });
});

When('limit parameter is provided', () => {
    cy.get("@endpoint").then((endpoint) => {
        cy.request(`${endpoint}?limit=5`).as("apiResponse");
    });
});


