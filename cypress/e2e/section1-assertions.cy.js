/// ============================================================
/// SECTION 1 – ASSERTIONS (Member 1)
/// ============================================================
///
/// This test demonstrates Cypress ASSERTIONS using should().
///
/// WHAT ARE ASSERTIONS?
/// Assertions validate that the application is behaving as
/// expected. They check conditions like visibility, text
/// content, URL changes, and element states.
///
/// WHY ARE ASSERTIONS IMPORTANT IN QE?
/// - They are the core of any test — without assertions,
///   a test cannot verify correctness.
/// - They catch regressions early in the SDLC.
/// - They provide clear pass/fail results for CI/CD pipelines.
///
/// KEY CYPRESS ASSERTIONS USED:
/// - should('be.visible')    → checks element is visible
/// - should('have.value')    → checks input field value
/// - should('contain.text')  → checks element contains text
/// - should('include')       → checks URL contains string
/// - should('not.exist')     → checks element is not in DOM
/// ============================================================

describe('Section 1 – Assertions Demo', () => {

    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('/')
    })

    it('should display the login form correctly', () => {
        // Assert that the login heading is visible
        cy.get('h1').should('be.visible').and('contain.text', 'Welcome Back')

        // Assert that input fields exist and are visible
        cy.get('[data-testid="username-input"]').should('be.visible')
        cy.get('[data-testid="password-input"]').should('be.visible')

        // Assert that the login button is visible
        cy.get('[data-testid="login-button"]').should('be.visible').and('contain.text', 'Sign In')
    })

    it('should type credentials and verify input values', () => {
        // Type username and assert the value
        cy.get('[data-testid="username-input"]')
            .type('testuser')
            .should('have.value', 'testuser')

        // Type password and assert the value
        cy.get('[data-testid="password-input"]')
            .type('password123')
            .should('have.value', 'password123')
    })

    it('should show error message for invalid credentials', () => {
        // Enter wrong credentials
        cy.get('[data-testid="username-input"]').type('wronguser')
        cy.get('[data-testid="password-input"]').type('wrongpass')
        cy.get('[data-testid="login-button"]').click()

        // Assert that the error message is displayed
        cy.get('[data-testid="error-message"]')
            .should('be.visible')
            .and('contain.text', 'Invalid username or password')
    })

    it('should login successfully and show the dashboard', () => {
        // Enter valid credentials
        cy.get('[data-testid="username-input"]').type('testuser')
        cy.get('[data-testid="password-input"]').type('password123')
        cy.get('[data-testid="login-button"]').click()

        // Assert that the success message appears
        cy.get('[data-testid="success-message"]')
            .should('be.visible')
            .and('contain.text', 'Login successful')

        // Assert that the dashboard appears after login
        cy.get('#dashboard', { timeout: 3000 }).should('be.visible')

        // Assert the welcome message contains the username
        cy.get('[data-testid="welcome-message"]')
            .should('contain.text', 'Welcome, testuser!')

        // Assert the login form is no longer visible
        cy.get('#loginForm').should('not.be.visible')
    })

    it('should allow logout and return to login form', () => {
        // Login first
        cy.login('testuser', 'password123')

        // Wait for dashboard to appear
        cy.get('#dashboard', { timeout: 3000 }).should('be.visible')

        // Click logout
        cy.get('[data-testid="logout-button"]').click()

        // Assert that login form is visible again
        cy.get('#loginForm').should('be.visible')

        // Assert dashboard is hidden
        cy.get('#dashboard').should('not.be.visible')
    })

})
