# 🧪 Cypress Testing Demo – SEP & Quality Engineering

> **SLIIT Y3S2** | Software Engineering Process & Quality Management  
> A live demonstration of Cypress testing features for Quality Engineering.

---

## 📁 Project Structure

```
Login-SEP-CypressDEMO/
├── app/
│   └── index.html              # Sample login page (test target)
├── cypress/
│   ├── e2e/
│   │   ├── section1-assertions.cy.js    # Member 1 – Assertions
│   │   ├── section2-fixtures.cy.js      # Member 2 – Fixtures
│   │   ├── section3-api-mocking.cy.js   # Member 3 – API Mocking
│   │   └── section4-reporting.cy.js     # Member 4 – Reporting & CI/CD
│   ├── fixtures/
│   │   ├── users.json                   # Test user credentials
│   │   └── loginResponse.json           # Mock API response data
│   └── support/
│       └── e2e.js                       # Custom commands & config
├── .github/
│   └── workflows/
│       └── cypress-tests.yml            # GitHub Actions CI/CD pipeline
├── cypress.config.js                    # Cypress configuration
├── package.json                         # Project dependencies & scripts
└── README.md                            # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or later)
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Login-SEP-CypressDEMO

# Install dependencies
npm install
```

### Running the Application

```bash
# Start the local web server (serves the login page)
npm run serve
```

The login page will be available at **http://localhost:3000**

### Valid Test Credentials

| Username   | Password      |
| ---------- | ------------- |
| `testuser` | `password123` |
| `admin`    | `admin@123`   |
| `demouser` | `demo2024`    |

---

## 🧑‍💻 Running Cypress Tests

### Interactive Mode (GUI) — for live demo

```bash
# Start the server first, then open Cypress
npm run serve

# In a separate terminal:
npx cypress open
```

### Headless Mode (CLI) — for CI/CD

```bash
# Run all tests in headless mode
npx cypress run

# Run a specific section
npx cypress run --spec "cypress/e2e/section1-assertions.cy.js"
npx cypress run --spec "cypress/e2e/section2-fixtures.cy.js"
npx cypress run --spec "cypress/e2e/section3-api-mocking.cy.js"
npx cypress run --spec "cypress/e2e/section4-reporting.cy.js"
```

### Using npm scripts

```bash
npm run cypress:open              # Open Cypress GUI
npm run cypress:run               # Run all tests (headless)
npm run cypress:run:section1      # Run Section 1 only
npm run cypress:run:section2      # Run Section 2 only
npm run cypress:run:section3      # Run Section 3 only
npm run cypress:run:section4      # Run Section 4 only
```

---

## 📋 Demo Sections

### Section 1 – Assertions (Member 1)

**File:** `cypress/e2e/section1-assertions.cy.js`

Demonstrates how Cypress **assertions** validate application behavior:

- `should('be.visible')` – checks element visibility
- `should('have.value')` – checks input field values
- `should('contain.text')` – checks text content
- `should('not.be.visible')` – checks element is hidden

**QE Contribution:** Assertions are the foundation of automated testing. They ensure that the system behaves as expected, catching defects early in the SDLC.

---

### Section 2 – Fixtures (Member 2)

**File:** `cypress/e2e/section2-fixtures.cy.js`  
**Fixture Files:** `cypress/fixtures/users.json`, `cypress/fixtures/loginResponse.json`

Demonstrates how **fixtures** separate test data from test logic:

- `cy.fixture('users')` – loads JSON test data
- Alias method using `@userData`
- Using multiple fixture files together

**QE Contribution:** Fixtures improve test **maintainability** and **reusability**. When test data changes, only the fixture file needs updating — not every test.

---

### Section 3 – API Mocking / Network Stubbing (Member 3)

**File:** `cypress/e2e/section3-api-mocking.cy.js`

Demonstrates **cy.intercept()** for mocking API requests:

- Stubbing success responses (200)
- Stubbing error responses (401, 500)
- Using fixture files as mock responses
- Simulating network delays
- Asserting on request/response data

**QE Contribution:** API mocking removes **dependency on real backend services**, enabling isolated frontend testing. It eliminates flaky tests caused by network issues and allows testing edge cases.

---

### Section 4 – Test Reporting & CI/CD (Member 4)

**File:** `cypress/e2e/section4-reporting.cy.js`  
**CI/CD Config:** `.github/workflows/cypress-tests.yml`

Demonstrates **reporting** and **CI/CD integration**:

- Running tests via CLI (`npx cypress run`)
- Automatic screenshot capture on failures
- Video recording of test runs
- GitHub Actions pipeline for automated testing

**QE Contribution:** CI/CD ensures that **every code change is automatically tested**, supporting continuous quality throughout the SDLC. Reporting provides visibility into test results for the entire team.

---

## 🔄 CI/CD Pipeline (GitHub Actions)

The `.github/workflows/cypress-tests.yml` workflow:

1. **Triggers** on push to `main`/`develop` or pull requests
2. **Installs** Node.js and project dependencies
3. **Starts** the local web server
4. **Runs** all Cypress tests in headless Chrome
5. **Uploads** screenshots (on failure) and videos (always) as artifacts

To view results: Go to your repo → **Actions** tab → click on the workflow run.

---

## 📊 How Cypress Supports Quality Engineering Across the SDLC

| SDLC Phase         | Cypress Feature | Contribution                                        |
| ------------------ | --------------- | --------------------------------------------------- |
| **Requirements**   | Assertions      | Define expected behaviors as executable tests       |
| **Design**         | Fixtures        | Plan test data structures early                     |
| **Implementation** | API Mocking     | Test frontend independently from backend            |
| **Testing**        | All features    | Automate regression, integration, and E2E testing   |
| **Deployment**     | CI/CD Pipeline  | Run tests automatically before every deployment     |
| **Maintenance**    | Reporting       | Track test results, debug failures with screenshots |

---

## � Contributors

**Group ID:** Y3S2-SE-80

| Name          | Student ID |
| ------------- | ---------- |
| K. Vanayalini | IT23193840 |
| T. Thuverakan | IT23281332 |
| B. Clerin     | IT23402584 |
| G. Shajana    | IT23164208 |

---

## �📝 License

This project is for educational purposes – SLIIT Y3S2 SEP & QM Assignment.
