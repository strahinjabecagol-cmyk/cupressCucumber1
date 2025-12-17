/// <reference types="cypress" /> 
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('TODO app page is open', () => {
    cy.visit('https://sbecagol.com/test-apps/todo-list/');
});


When('I toggle dark to light mode', () => {
    cy.get('#themeToggle').as('themeToggle');
    cy.get('@themeToggle').click();
    cy.get('@themeToggle').invoke('text').then(text => {
        cy.wrap(text.trim()).as('originalToggleText')
    });
});

Then('the mode should be swtiched', () => {
    cy.get('@themeToggle').should('not.have.text', '☀');
    cy.get('@themeToggle').invoke('text').then(text => {
        cy.wrap(text.trim()).as('newToggleText')
    });
    cy.get('@originalToggleText').should('not.equal', cy.get('@newToggleText'));
});

When('I add {string} tasks', (s) => {

    for (let i = 0; i < s; i++) {
        cy.get('#newTodo').type(`task number ${i}`);
        cy.get('#addTodo').click();
    }
});

When('I mark {string} tasks as done', (s) => {
    for (let i = 0; i < s; i++) {
        cy.get('.chk').eq(i).click();
    }
});

When('I delete {string} tasks', (s) => {
    for (let i = 0; i < s; i++) {
        cy.get('[title="Delete"]').eq(i).click();
    }
});

Then('There should be total of {string} tasks remaining {string} active', (int, s) => {
    cy.get('li.todo').should('have.length', 8)
    cy.get('li.todo .chk[aria-pressed="true"]').should('have.length', 3)
});


Then('only {string} tasks should be visible', (s) => {
    if (s == "completed") {
        // All visible tasks should have completed state
        cy.get('li.todo:visible').each((element) => {
            cy.wrap(element).find('.chk').should('have.attr', 'aria-pressed', 'true');
        });
        cy.get('li.todo:visible').should('have.length', 1);
    }
    else if (s == "active") {
        // All visible tasks should NOT have completed state
        cy.get('li.todo:visible').each((element) => {
            cy.wrap(element).find('.chk').should('have.attr', 'aria-pressed', 'false');
        });
        cy.get('li.todo:visible').should('have.length', 2);
    }
    else if (s == "all") {
        // Should show all tasks (both completed and active)
        cy.get('li.todo:visible').should('have.length', 3);
    }
});

When('filter by {string}', (s) => {
    cy.get(`[data-filter="${s}"]`).click();
});

When('I click clear completed btn', () => {
    cy.get('#clearCompleted').click();
});

Then('There should only be {string} tasks visible in the list', (s) => {
    cy.get('li.todo .chk[aria-pressed="true"]').should('not.exist');
});

Then('There should be no active tasks visible message', () => {
    cy.get('#empty').should('have.text', 'No tasks yet. Add one above!');
});

When('I add an empty tasks with just whitespace', () => {
    cy.get('#newTodo').type('    ');
    cy.get('#addTodo').click();
})

When('I add {string} task by pressing enter', (s) => {
    for (let i = 0; i < s; i++) {
        cy.get('#newTodo').type(`task number ${i}`);
        cy.get('#addTodo').type('{enter}');
    }
})


