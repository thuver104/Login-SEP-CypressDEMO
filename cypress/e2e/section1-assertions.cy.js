/// ============================================================
/// SECTION 1 – ASSERTIONS (Member 1)
/// ============================================================
///
/// This test demonstrates Cypress ASSERTIONS using should(),
/// and(), expect(), and various Chai assertion styles.
///
/// WHAT ARE ASSERTIONS?
/// Assertions validate that the application is behaving as
/// expected. They check conditions like visibility, text
/// content, URL changes, element states, attributes, and CSS.
///
/// WHY ARE ASSERTIONS IMPORTANT IN QE?
/// - They are the core of any test — without assertions,
///   a test cannot verify correctness.
/// - They catch regressions early in the SDLC.
/// - They provide clear pass/fail results for CI/CD pipelines.
///
/// KEY CYPRESS ASSERTIONS USED:
/// - should('be.visible')     → checks element is visible
/// - should('not.be.visible') → checks element is hidden
/// - should('have.value')     → checks input field value
/// - should('contain.text')   → checks element contains text
/// - should('have.attr')      → checks HTML attribute value
/// - should('have.length')    → checks number of matched elements
/// - should('have.css')       → checks computed CSS property
/// - should('exist')          → checks element is in the DOM
/// - should('not.exist')      → checks element is not in DOM
/// - should('be.empty')       → checks input is empty
/// - should('match')          → checks element matches selector
/// - expect() / BDD assert    → explicit BDD-style assertions
/// ============================================================

describe("Section 1 – Assertions Demo", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // ── Visibility & Text Assertions ──────────────────────────
  context("Visibility & Text Assertions", () => {
    it("should display the login heading with correct text", () => {
      cy.get("h1").should("be.visible").and("contain.text", "Welcome Back");
    });

    it("should display the subtitle text", () => {
      cy.get("p.subtitle").should("be.visible").and("contain.text", "SEP & QM");
    });

    it("should display username and password input fields", () => {
      cy.get('[data-testid="username-input"]').should("be.visible");
      cy.get('[data-testid="password-input"]').should("be.visible");
    });

    it("should display the Sign In button", () => {
      cy.get('[data-testid="login-button"]')
        .should("be.visible")
        .and("contain.text", "Sign In");
    });

    it("should hide error and success messages initially", () => {
      // Messages exist in the DOM but are hidden via display:none
      cy.get('[data-testid="error-message"]').should("not.be.visible");
      cy.get('[data-testid="success-message"]').should("not.be.visible");
    });
  });

  // ── Attribute Assertions ──────────────────────────────────
  context("Attribute Assertions (have.attr)", () => {
    it("should have correct placeholder text on inputs", () => {
      cy.get('[data-testid="username-input"]').should(
        "have.attr",
        "placeholder",
        "Enter your username",
      );

      cy.get('[data-testid="password-input"]').should(
        "have.attr",
        "placeholder",
        "Enter your password",
      );
    });

    it("should have correct input types", () => {
      cy.get('[data-testid="username-input"]').should(
        "have.attr",
        "type",
        "text",
      );

      cy.get('[data-testid="password-input"]').should(
        "have.attr",
        "type",
        "password",
      );
    });

    it("should have data-testid attributes for all key elements", () => {
      cy.get('[data-testid="username-input"]').should("exist");
      cy.get('[data-testid="password-input"]').should("exist");
      cy.get('[data-testid="login-button"]').should("exist");
      cy.get('[data-testid="error-message"]').should("exist");
      cy.get('[data-testid="success-message"]').should("exist");
    });

    it("should have a submit button type on Sign In", () => {
      cy.get('[data-testid="login-button"]').should(
        "have.attr",
        "type",
        "submit",
      );
    });
  });

  // ── Length & Selector Assertions ──────────────────────────
  context("Length & Selector Assertions (have.length, match)", () => {
    it("should have exactly two input fields in the form", () => {
      cy.get("#loginFormElement input").should("have.length", 2);
    });

    it("should have exactly one form element on the page", () => {
      cy.get("form").should("have.length", 1);
    });

    it("should have the login button matching a button selector", () => {
      cy.get('[data-testid="login-button"]').should("match", "button");
    });
  });

  // ── Value & Input Assertions ─────────────────────────────
  context("Value & Input Assertions (have.value, be.empty)", () => {
    it("should start with empty input fields", () => {
      cy.get('[data-testid="username-input"]').should("have.value", "");
      cy.get('[data-testid="password-input"]').should("be.empty");
    });

    it("should reflect typed username and password values", () => {
      cy.get('[data-testid="username-input"]')
        .type("testuser")
        .should("have.value", "testuser");

      cy.get('[data-testid="password-input"]')
        .type("password123")
        .should("have.value", "password123");
    });

    it("should clear input values after clear()", () => {
      cy.get('[data-testid="username-input"]')
        .type("testuser")
        .clear()
        .should("have.value", "");

      cy.get('[data-testid="password-input"]')
        .type("password123")
        .clear()
        .should("be.empty");
    });
  });

  // ── CSS Assertions ───────────────────────────────────────
  context("CSS Assertions (have.css)", () => {
    it("should style the error message with a red colour", () => {
      // Trigger the error message so it becomes visible
      cy.get('[data-testid="username-input"]').type("bad");
      cy.get('[data-testid="password-input"]').type("bad");
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="error-message"]')
        .should("be.visible")
        .and("have.css", "color", "rgb(255, 107, 107)");
    });

    it("should style the success message with a green colour", () => {
      cy.login("testuser", "password123");

      cy.get('[data-testid="success-message"]')
        .should("be.visible")
        .and("have.css", "color", "rgb(81, 207, 102)");
    });

    it("should centre-align the heading text", () => {
      cy.get(".login-container h1").should("have.css", "text-align", "center");
    });
  });

  // ── Negative / Boundary Test Assertions ──────────────────
  context("Negative & Boundary Assertions", () => {
    it("should show error when both fields are empty", () => {
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="error-message"]')
        .should("be.visible")
        .and("contain.text", "Invalid username or password");
    });

    it("should show error when only username is provided", () => {
      cy.get('[data-testid="username-input"]').type("testuser");
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should show error when only password is provided", () => {
      cy.get('[data-testid="password-input"]').type("password123");
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="error-message"]').should("be.visible");
    });

    it("should show error for correct username but wrong password", () => {
      cy.get('[data-testid="username-input"]').type("testuser");
      cy.get('[data-testid="password-input"]').type("wrongpass");
      cy.get('[data-testid="login-button"]').click();

      cy.get('[data-testid="error-message"]')
        .should("be.visible")
        .and("contain.text", "Invalid username or password");
    });
  });

  // ── Successful Login Assertions ──────────────────────────
  context("Successful Login Assertions", () => {
    it("should login and display the dashboard", () => {
      cy.get('[data-testid="username-input"]').type("testuser");
      cy.get('[data-testid="password-input"]').type("password123");
      cy.get('[data-testid="login-button"]').click();

      // Success message appears
      cy.get('[data-testid="success-message"]')
        .should("be.visible")
        .and("contain.text", "Login successful");

      // Dashboard becomes visible
      cy.get("#dashboard", { timeout: 3000 }).should("be.visible");

      // Welcome message contains the username
      cy.get('[data-testid="welcome-message"]').should(
        "contain.text",
        "Welcome, testuser!",
      );

      // Login form is hidden
      cy.get("#loginForm").should("not.be.visible");
    });

    it("should login with admin credentials", () => {
      cy.login("admin", "admin@123");

      cy.get("#dashboard", { timeout: 3000 }).should("be.visible");
      cy.get('[data-testid="welcome-message"]').should(
        "contain.text",
        "Welcome, admin!",
      );
    });

    it("should login with demouser credentials", () => {
      cy.login("demouser", "demo2024");

      cy.get("#dashboard", { timeout: 3000 }).should("be.visible");
      cy.get('[data-testid="welcome-message"]').should(
        "contain.text",
        "Welcome, demouser!",
      );
    });
  });

  // ── BDD expect() Style Assertions ────────────────────────
  context("BDD expect() Style Assertions", () => {
    it("should verify heading text using expect()", () => {
      cy.get("h1")
        .invoke("text")
        .then((text) => {
          expect(text).to.include("Welcome Back");
          expect(text).to.be.a("string");
          expect(text.length).to.be.greaterThan(0);
        });
    });

    it("should verify the number of form groups using expect()", () => {
      cy.get(".form-group").then(($groups) => {
        expect($groups).to.have.length(2);
      });
    });

    it("should verify input field name attributes using expect()", () => {
      cy.get('[data-testid="username-input"]').then(($el) => {
        expect($el).to.have.attr("name", "username");
      });
      cy.get('[data-testid="password-input"]').then(($el) => {
        expect($el).to.have.attr("name", "password");
      });
    });
  });

  // ── Logout Flow Assertions ───────────────────────────────
  context("Logout Flow Assertions", () => {
    it("should logout and return to the login form", () => {
      cy.login("testuser", "password123");
      cy.get("#dashboard", { timeout: 3000 }).should("be.visible");

      cy.get('[data-testid="logout-button"]').click();

      // Login form is visible again
      cy.get("#loginForm").should("be.visible");

      // Dashboard is hidden
      cy.get("#dashboard").should("not.be.visible");
    });

    it("should clear input fields after logout", () => {
      cy.login("testuser", "password123");
      cy.get("#dashboard", { timeout: 3000 }).should("be.visible");

      cy.get('[data-testid="logout-button"]').click();

      // Inputs are cleared after logout
      cy.get('[data-testid="username-input"]').should("have.value", "");
      cy.get('[data-testid="password-input"]').should("have.value", "");
    });
  });
});
