/// ============================================================
/// SECTION 4 – TEST REPORTING & CI/CD (Member 4)
/// ============================================================
///
/// This test file supports the reporting and CI/CD demo.
///
/// HOW TO RUN CYPRESS TESTS:
///
/// 1. Interactive Mode (opens the Cypress GUI):
///    npx cypress open
///
/// 2. Headless Mode (runs in terminal, ideal for CI/CD):
///    npx cypress run
///
/// 3. Run a specific test file:
///    npx cypress run --spec "cypress/e2e/section4-reporting.cy.js"
///
/// REPORTING FEATURES:
/// - Screenshots: Automatically captured on test failure
///   → saved in cypress/screenshots/
/// - Videos: Recorded for every test run (headless mode)
///   → saved in cypress/videos/
/// - Console output: pass/fail summary in terminal
///
/// CI/CD WITH GITHUB ACTIONS:
/// - See .github/workflows/cypress-tests.yml
/// - Runs tests automatically on every push/PR
/// - Uses the official Cypress GitHub Action
/// - Uploads test artifacts (screenshots, videos)
///
/// WHY CI/CD MATTERS IN QE:
/// - Automated testing catches bugs before deployment
/// - Every code change is validated automatically
/// - Test results are visible to the entire team
/// - Supports continuous quality throughout the SDLC
/// ============================================================

describe('Section 4 – Test Reporting & CI/CD Demo', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    // ---- This test PASSES → demonstrates success reporting ----
    it('PASS: should verify login page loads correctly', () => {
        cy.get('h1').should('contain.text', 'Welcome Back')
        cy.get('[data-testid="username-input"]').should('be.visible')
        cy.get('[data-testid="password-input"]').should('be.visible')
        cy.get('[data-testid="login-button"]').should('be.visible')
    })

    // ---- This test PASSES → demonstrates form interaction ----
    it('PASS: should complete a full login flow', () => {
        cy.login('testuser', 'password123')

        cy.get('[data-testid="success-message"]').should('be.visible')
        cy.get('#dashboard', { timeout: 3000 }).should('be.visible')
        cy.get('[data-testid="welcome-message"]')
            .should('contain.text', 'Welcome, testuser!')
    })

    // ---- This test PASSES → demonstrates multiple assertions ----
    it('PASS: should verify dashboard elements after login', () => {
        cy.login('admin', 'admin@123')

        cy.get('#dashboard', { timeout: 3000 }).should('be.visible')
        cy.get('[data-testid="welcome-message"]')
            .should('contain.text', 'Welcome, admin!')
        cy.get('[data-testid="logout-button"]').should('be.visible')
    })

    // ---- This test demonstrates error handling ----
    it('PASS: should handle invalid login gracefully', () => {
        cy.login('baduser', 'badpass')

        cy.get('[data-testid="error-message"]')
            .should('be.visible')
            .and('contain.text', 'Invalid username or password')

        // Login form should still be visible
        cy.get('#loginForm').should('be.visible')
    })

})
