/// ============================================================
/// SECTION 2 – FIXTURES (Member 2)
/// ============================================================
///
/// This test demonstrates Cypress FIXTURES using cy.fixture().
///
/// WHAT ARE FIXTURES?
/// Fixtures are external JSON files that store test data
/// (e.g., usernames, passwords, API responses). They live in
/// the cypress/fixtures folder.
///
/// WHY USE FIXTURES?
/// - Separation of Concerns: Test data is kept separate
///   from test logic, making tests cleaner.
/// - Reusability: The same data can be used across multiple
///   test files.
/// - Maintainability: When credentials or data change, you
///   only update the fixture file – not every test.
/// - Readability: Tests focus on WHAT is being tested,
///   not WHAT data is being used.
///
/// FIXTURE FILE USED: cypress/fixtures/users.json
/// ============================================================

describe('Section 2 – Fixtures Demo', () => {

    // ---- Method 1: Load fixture in beforeEach using .then() ----
    describe('Loading fixtures with cy.fixture().then()', () => {

        beforeEach(() => {
            cy.visit('/')
        })

        it('should login with valid credentials from fixture file', () => {
            // Load the fixture file and use the data
            cy.fixture('users').then((users) => {
                // Type the username from fixture data
                cy.get('[data-testid="username-input"]')
                    .type(users.validUser.username)
                    .should('have.value', users.validUser.username)

                // Type the password from fixture data
                cy.get('[data-testid="password-input"]')
                    .type(users.validUser.password)
                    .should('have.value', users.validUser.password)

                // Submit the form
                cy.get('[data-testid="login-button"]').click()

                // Verify successful login
                cy.get('[data-testid="success-message"]').should('be.visible')
                cy.get('#dashboard', { timeout: 3000 }).should('be.visible')
                cy.get('[data-testid="welcome-message"]')
                    .should('contain.text', `Welcome, ${users.validUser.username}!`)
            })
        })

        it('should show error for invalid credentials from fixture file', () => {
            cy.fixture('users').then((users) => {
                // Use invalid user data from fixture
                cy.get('[data-testid="username-input"]').type(users.invalidUser.username)
                cy.get('[data-testid="password-input"]').type(users.invalidUser.password)
                cy.get('[data-testid="login-button"]').click()

                // Verify error message appears
                cy.get('[data-testid="error-message"]')
                    .should('be.visible')
                    .and('contain.text', 'Invalid username or password')
            })
        })
    })

    // ---- Method 2: Load fixture using an alias ----
    describe('Loading fixtures with aliases (@)', () => {

        beforeEach(() => {
            // Load fixture and create an alias
            cy.fixture('users').as('userData')
            cy.visit('/')
        })

        it('should login as admin using aliased fixture data', function () {
            // Access fixture data via the alias (must use function() not arrow =>)
            const { username, password } = this.userData.adminUser

            cy.get('[data-testid="username-input"]').type(username)
            cy.get('[data-testid="password-input"]').type(password)
            cy.get('[data-testid="login-button"]').click()

            // Verify dashboard loads with admin username
            cy.get('#dashboard', { timeout: 3000 }).should('be.visible')
            cy.get('[data-testid="welcome-message"]')
                .should('contain.text', `Welcome, ${username}!`)
        })
    })

    // ---- Method 3: Demonstrate multiple fixture files ----
    describe('Using multiple fixture files', () => {

        beforeEach(() => {
            cy.visit('/')
        })

        it('should load user credentials and API response fixtures', () => {
            // Load both fixture files
            cy.fixture('users').then((users) => {
                cy.fixture('loginResponse').then((response) => {
                    // Use user data for login
                    cy.get('[data-testid="username-input"]').type(users.validUser.username)
                    cy.get('[data-testid="password-input"]').type(users.validUser.password)
                    cy.get('[data-testid="login-button"]').click()

                    // Verify the expected success response structure
                    expect(response.success).to.have.property('status', 200)
                    expect(response.success).to.have.property('message', 'Login successful')
                    expect(response.success).to.have.property('token')
                    expect(response.success.user).to.have.property('username', 'testuser')
                })
            })
        })
    })

})
