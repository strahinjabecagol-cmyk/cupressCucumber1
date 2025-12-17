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
        cy.get('li.todo:visible').should('have.length.at.least', 1);
        cy.get('li.todo:visible').each((element) => {
            cy.wrap(element).find('.chk').should('have.attr', 'aria-pressed', 'true');
        });
    }
    else if (s == "active") {
        cy.get('li.todo:visible').should('have.length.at.least', 1);
        cy.get('li.todo:visible').each((element) => {
            cy.wrap(element).find('.chk').should('have.attr', 'aria-pressed', 'false');
        });
    }
    else if (s == "all") {
        cy.get('li.todo:visible').should('have.length.at.least', 1);
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

When('I toggle task {string} back to active', (s) => {
    cy.get('.chk').eq(s - 1).click();
})

When('I add a task with {string} characters', (s) => {
    const longText = 'a'.repeat(parseInt(s));
    cy.get('#newTodo').type(longText);
    cy.get('#addTodo').click();
    cy.wrap(longText).as('longTaskText');
})

Then('the task should be displayed correctly', () => {
    cy.get('@longTaskText').then((longText) => {
        cy.get('li.todo').first().should('contain.text', longText);
    });
})

When('I add a task with text {string}', (s) => {
    cy.get('#newTodo').type(s);
    cy.get('#addTodo').click();
})

Then('the task with text {string} should be visible', (s) => {
    cy.get('li.todo').should('contain.text', s);
})

Then('the task should display as plain text {string}', (s) => {
    cy.get('li.todo').should('contain.text', s);
})

Then('no script should be executed', () => {
    cy.get('li.todo').first().find('script').should('not.exist');
})

Then('there should be {string} tasks in the list', (s) => {
    cy.get('li.todo:visible').should('have.length', parseInt(s));
})

Then('there should be {string} completed tasks visible', (s) => {
    cy.get('li.todo:visible .chk[aria-pressed="true"]').should('have.length', parseInt(s));
})

Then('there should be {string} active tasks visible', (s) => {
    cy.get('li.todo:visible .chk[aria-pressed="false"]').should('have.length', parseInt(s));
})

Then('the input field should be empty', () => {
    cy.get('#newTodo').should('have.value', '');
})

Then('the task should be in {string} state', (s) => {
    if (s == "completed") {
        cy.get('li.todo:visible .chk').should('have.attr', 'aria-pressed', 'true');
    }
    else if (s == "active") {
        cy.get('li.todo:visible .chk').should('have.attr', 'aria-pressed', 'false');
    }
})
