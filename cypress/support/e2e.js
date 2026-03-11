// ***********************************************************
// This file is loaded automatically before every test file.
// You can add custom commands and global configurations here.
//
// Read more: https://on.cypress.io/configuration
// ***********************************************************

// Custom command to perform login
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-testid="username-input"]').clear().type(username)
    cy.get('[data-testid="password-input"]').clear().type(password)
    cy.get('[data-testid="login-button"]').click()
})

// Custom command to visit the login page
Cypress.Commands.add('visitLoginPage', () => {
    cy.visit('/')
})
