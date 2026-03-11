/// ============================================================
/// SECTION 3 – API MOCKING / NETWORK STUBBING (Member 3)
/// ============================================================
///
/// This test demonstrates cy.intercept() for API MOCKING.
///
/// WHAT IS API MOCKING?
/// API mocking (or network stubbing) allows you to intercept
/// HTTP requests made by the application and return fake
/// (stubbed) responses — without hitting a real backend.
///
/// WHY USE cy.intercept()?
/// - Removes dependency on real backend servers.
/// - Tests run faster because no real API calls are made.
/// - Eliminates flaky tests caused by network issues.
/// - Allows testing edge cases (e.g., server errors, slow
///   responses) that are hard to reproduce with real servers.
/// - Enables frontend testing before the backend is ready.
///
/// HOW IT WORKS:
/// 1. cy.intercept(method, url, response) → defines the stub
/// 2. .as('alias') → gives the intercept a name
/// 3. cy.wait('@alias') → waits for the request to be caught
/// ============================================================

describe('Section 3 – API Mocking / Network Stubbing Demo', () => {

    // ---- Test 1: Mock a successful login API response ----
    it('should intercept login API and return a mocked success response', () => {
        // Set up the intercept BEFORE visiting the page
        cy.intercept('POST', '/api/login', {
            statusCode: 200,
            body: {
                status: 200,
                message: 'Login successful',
                token: 'fake-jwt-token-abc123',
                user: {
                    id: 1,
                    username: 'testuser',
                    role: 'student'
                }
            }
        }).as('loginRequest')  // Give it an alias

        cy.visit('/')

        // Fill in the login form
        cy.get('[data-testid="username-input"]').type('testuser')
        cy.get('[data-testid="password-input"]').type('password123')
        cy.get('[data-testid="login-button"]').click()

        // Wait for the intercepted request
        cy.wait('@loginRequest').then((interception) => {
            // Assert on the REQUEST that was sent
            expect(interception.request.body).to.have.property('username', 'testuser')
            expect(interception.request.body).to.have.property('password', 'password123')

            // Assert on the RESPONSE that was returned (our mock)
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.token).to.equal('fake-jwt-token-abc123')
        })

        // Verify the UI responds correctly
        cy.get('[data-testid="success-message"]').should('be.visible')
        cy.get('#dashboard', { timeout: 3000 }).should('be.visible')
    })

    // ---- Test 2: Mock a failed login API response ----
    it('should intercept login API and return a mocked error response', () => {
        // Mock a 401 Unauthorized response
        cy.intercept('POST', '/api/login', {
            statusCode: 401,
            body: {
                status: 401,
                message: 'Invalid credentials',
                token: null,
                user: null
            }
        }).as('loginFailure')

        cy.visit('/')

        // Attempt login with invalid credentials
        cy.get('[data-testid="username-input"]').type('wronguser')
        cy.get('[data-testid="password-input"]').type('wrongpass')
        cy.get('[data-testid="login-button"]').click()

        // Wait for the intercepted request
        cy.wait('@loginFailure').then((interception) => {
            // Verify the mocked response
            expect(interception.response.statusCode).to.equal(401)
            expect(interception.response.body.message).to.equal('Invalid credentials')
        })
    })

    // ---- Test 3: Use fixture file as mocked response ----
    it('should use a fixture file as the mocked API response', () => {
        // Load the fixture file directly as the response body
        cy.intercept('POST', '/api/login', {
            statusCode: 200,
            fixture: 'loginResponse.json'  // Uses cypress/fixtures/loginResponse.json
        }).as('loginFromFixture')

        cy.visit('/')

        cy.get('[data-testid="username-input"]').type('testuser')
        cy.get('[data-testid="password-input"]').type('password123')
        cy.get('[data-testid="login-button"]').click()

        // Verify the request was intercepted
        cy.wait('@loginFromFixture').its('response.statusCode').should('eq', 200)

        cy.get('[data-testid="success-message"]').should('be.visible')
    })

    // ---- Test 4: Use cy.intercept() as a spy (no stubbing) ----
    it('should spy on API requests without modifying them', () => {
        // Intercept WITHOUT providing a response = spy mode
        // The real request goes through, but we can still inspect it
        cy.intercept('POST', '/api/login').as('spyLogin')

        cy.visit('/')

        cy.get('[data-testid="username-input"]').type('testuser')
        cy.get('[data-testid="password-input"]').type('password123')
        cy.get('[data-testid="login-button"]').click()

        // Wait and inspect the request that was made
        cy.wait('@spyLogin').then((interception) => {
            // Verify the request body was sent correctly
            expect(interception.request.body).to.have.property('username', 'testuser')
            expect(interception.request.body).to.have.property('password', 'password123')
            expect(interception.request.method).to.equal('POST')
        })

        cy.get('[data-testid="success-message"]').should('be.visible')
    })

    // ---- Test 5: Simulate a server error (500) ----
    it('should handle a simulated server error', () => {
        // Mock a 500 Internal Server Error
        cy.intercept('POST', '/api/login', {
            statusCode: 500,
            body: {
                status: 500,
                message: 'Internal Server Error'
            }
        }).as('serverError')

        cy.visit('/')

        cy.get('[data-testid="username-input"]').type('testuser')
        cy.get('[data-testid="password-input"]').type('password123')
        cy.get('[data-testid="login-button"]').click()

        // Verify the 500 error was returned
        cy.wait('@serverError').its('response.statusCode').should('eq', 500)
    })

})
