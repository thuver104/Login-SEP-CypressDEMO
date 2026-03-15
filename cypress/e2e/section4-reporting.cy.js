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

describe("Section 4 – Test Reporting & CI/CD Demo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // ---- This test PASSES → demonstrates success reporting ----
  it("PASS: should verify login page loads correctly", () => {
    cy.get("h1").should("contain.text", "Welcome Back");
    cy.get('[data-testid="username-input"]').should("be.visible");
    cy.get('[data-testid="password-input"]').should("be.visible");
    cy.get('[data-testid="login-button"]').should("be.visible");
  });

  // ---- This test PASSES → demonstrates form interaction ----
  it("PASS: should complete a full login flow", () => {
    cy.login("testuser", "password123");

    cy.get('[data-testid="success-message"]').should("be.visible");
    cy.get("#dashboard", { timeout: 3000 }).should("be.visible");
    cy.get('[data-testid="welcome-message"]').should(
      "contain.text",
      "Welcome, testuser!",
    );
  });

  // ---- This test PASSES → demonstrates multiple assertions ----
  it("PASS: should verify dashboard elements after login", () => {
    cy.login("admin", "admin@123");

    cy.get("#dashboard", { timeout: 3000 }).should("be.visible");
    cy.get('[data-testid="welcome-message"]').should(
      "contain.text",
      "Welcome, admin!",
    );
    cy.get('[data-testid="logout-button"]').should("be.visible");
  });

  // ---- This test demonstrates error handling ----
  it("PASS: should handle invalid login gracefully", () => {
    cy.login("baduser", "badpass");

    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain.text", "Invalid username or password");

    // Login form should still be visible
    cy.get("#loginForm").should("be.visible");
  });

  // ---- Test with different valid user credentials ----
  it("PASS: should login with demouser credentials", () => {
    cy.login("demouser", "demo2024");

    cy.get('[data-testid="success-message"]')
      .should("be.visible")
      .and("contain.text", "Login successful");
    cy.get("#dashboard", { timeout: 3000 }).should("be.visible");
    cy.get('[data-testid="welcome-message"]').should(
      "contain.text",
      "Welcome, demouser!",
    );
  });

  // ---- Test empty field validation ----
  it("PASS: should show error when username field is empty", () => {
    cy.get('[data-testid="password-input"]').type("password123");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain.text", "Invalid username or password");
  });

  // ---- Test empty password field ----
  it("PASS: should show error when password field is empty", () => {
    cy.get('[data-testid="username-input"]').type("testuser");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  // ---- Test correct username with wrong password ----
  it("PASS: should reject correct username with wrong password", () => {
    cy.get('[data-testid="username-input"]').type("testuser");
    cy.get('[data-testid="password-input"]').type("wrongpassword");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("contain.text", "Invalid username or password");
  });

  // ---- Test logout functionality ----
  it("PASS: should logout and return to login page", () => {
    cy.login("testuser", "password123");
    cy.get("#dashboard", { timeout: 3000 }).should("be.visible");

    cy.get('[data-testid="logout-button"]').click();

    cy.get("#loginForm").should("be.visible");
    cy.get("#dashboard").should("not.be.visible");
  });

  // ---- Test input field clearing after logout ----
  it("PASS: should clear input fields after logout", () => {
    cy.login("admin", "admin@123");
    cy.get("#dashboard", { timeout: 3000 }).should("be.visible");

    cy.get('[data-testid="logout-button"]').click();

    cy.get('[data-testid="username-input"]').should("have.value", "");
    cy.get('[data-testid="password-input"]').should("have.value", "");
  });

  // ---- Test form attributes and structure ----
  it("PASS: should verify input field attributes are correct", () => {
    cy.get('[data-testid="username-input"]')
      .should("have.attr", "type", "text")
      .and("have.attr", "placeholder", "Enter your username")
      .and("have.attr", "name", "username");

    cy.get('[data-testid="password-input"]')
      .should("have.attr", "type", "password")
      .and("have.attr", "placeholder", "Enter your password")
      .and("have.attr", "name", "password");
  });

  // ---- Test form count and structure ----
  it("PASS: should have correct form structure", () => {
    cy.get("form").should("have.length", 1);
    cy.get("#loginFormElement input").should("have.length", 2);
    cy.get('[data-testid="login-button"]').should("match", "button");
  });

  // ---- Test heading and subtitle content ----
  it("PASS: should display correct heading and subtitle", () => {
    cy.get("h1").should("be.visible").and("contain.text", "Welcome Back");

    cy.get("p.subtitle").should("be.visible").and("contain.text", "SEP & QM");
  });

  // ---- Test button text and styling ----
  it("PASS: should verify Sign In button properties", () => {
    cy.get('[data-testid="login-button"]')
      .should("be.visible")
      .and("contain.text", "Sign In")
      .and("have.attr", "type", "submit");
  });

  // ---- Test CSS styling for error message ----
  it("PASS: should display error message with red styling", () => {
    cy.get('[data-testid="username-input"]').type("baduser");
    cy.get('[data-testid="password-input"]').type("badpass");
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="error-message"]')
      .should("be.visible")
      .and("have.css", "color", "rgb(255, 107, 107)");
  });

  // ---- Test CSS styling for success message ----
  it("PASS: should display success message with green styling", () => {
    cy.login("testuser", "password123");

    cy.get('[data-testid="success-message"]')
      .should("be.visible")
      .and("have.css", "color", "rgb(81, 207, 102)");
  });

  // ---- Test heading text alignment ----
  it("PASS: should center-align the login heading", () => {
    cy.get(".login-container h1").should("have.css", "text-align", "center");
  });

  // ---- Test form is initially visible ----
  it("PASS: should display login form on page load", () => {
    cy.get("#loginForm").should("be.visible");
    cy.get("#dashboard").should("not.be.visible");
  });

  // ---- Test messages are hidden initially ----
  it("PASS: should hide error and success messages initially", () => {
    cy.get('[data-testid="error-message"]').should("not.be.visible");
    cy.get('[data-testid="success-message"]').should("not.be.visible");
  });

  // ---- Test input field type reflection ----
  it("PASS: should accept and reflect typed input values", () => {
    cy.get('[data-testid="username-input"]')
      .type("myusername")
      .should("have.value", "myusername");

    cy.get('[data-testid="password-input"]')
      .type("mypassword")
      .should("have.value", "mypassword");
  });

  // ---- Test clearing input fields ----
  it("PASS: should clear input values when .clear() is called", () => {
    cy.get('[data-testid="username-input"]')
      .type("testuser")
      .clear()
      .should("have.value", "");

    cy.get('[data-testid="password-input"]')
      .type("password123")
      .clear()
      .should("be.empty");
  });

  // ---- Test multiple login attempts ----
  it("PASS: should handle multiple failed login attempts", () => {
    // First attempt
    cy.get('[data-testid="username-input"]').type("bad1");
    cy.get('[data-testid="password-input"]').type("bad1");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-message"]').should("be.visible");

    // Clear and second attempt
    cy.get('[data-testid="username-input"]').clear();
    cy.get('[data-testid="password-input"]').clear();
    cy.get('[data-testid="username-input"]').type("bad2");
    cy.get('[data-testid="password-input"]').type("bad2");
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-message"]').should("be.visible");
  });

  // ---- Test BDD style assertions ----
  it("PASS: should verify page elements using BDD expect() style", () => {
    cy.get("h1")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Welcome Back");
        expect(text).to.be.a("string");
        expect(text.length).to.be.greaterThan(0);
      });
  });

  // ---- Test form groups count ----
  it("PASS: should have exactly two form groups", () => {
    cy.get(".form-group").then(($groups) => {
      expect($groups).to.have.length(2);
    });
  });

  // ---- Test element existence in DOM ----
  it("PASS: should verify all key elements exist in DOM", () => {
    cy.get('[data-testid="username-input"]').should("exist");
    cy.get('[data-testid="password-input"]').should("exist");
    cy.get('[data-testid="login-button"]').should("exist");
    cy.get('[data-testid="error-message"]').should("exist");
    cy.get('[data-testid="success-message"]').should("exist");
    cy.get('[data-testid="logout-button"]').should("exist");
  });

  // ---- Test dashboard visibility with timeout ----
  it("PASS: should display dashboard with appropriate timeout", () => {
    cy.login("demouser", "demo2024");
    cy.get("#dashboard", { timeout: 3000 }).should("be.visible");
    cy.get('[data-testid="logout-button"]').should("be.visible");
  });
});
