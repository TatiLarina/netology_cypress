// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => { 
    cy.contains('Log in').click();
    cy.get('[id="mail"]').type(email);
    cy.get('[id="pass"]').type(password);
    cy.contains('Submit').click();
})

Cypress.Commands.add('addBook', (title, description, author) => { 
    cy.contains('Add new').click();
    cy.get('[id="title"]').type(title);
    cy.get('[id="description"]').type(description);
    cy.get('[id="authors"]').type(author);
    cy.contains('Submit').click();
})

// Cypress.Commands.add('getTitle', (title, id) => {
//     cy.get('.card-title')
//     .eq(id)
//     .then(($div) => {
//       title = $div.text();
//     })
// })


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })