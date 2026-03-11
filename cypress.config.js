const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // Base URL for all cy.visit() calls
    baseUrl: 'http://localhost:3000',

    // Folder containing test spec files
    specPattern: 'cypress/e2e/**/*.cy.js',

    // Folder containing fixture files
    fixturesFolder: 'cypress/fixtures',

    // Folder for support files
    supportFile: 'cypress/support/e2e.js',

    // Enable video recording for CI/CD demo (Section 4)
    video: true,

    // Take screenshots on test failure
    screenshotOnRunFailure: true,

    // Screenshots folder
    screenshotsFolder: 'cypress/screenshots',

    // Videos folder
    videosFolder: 'cypress/videos',

    // Viewport settings
    viewportWidth: 1280,
    viewportHeight: 720,

    // Default command timeout
    defaultCommandTimeout: 10000,

    setupNodeEvents(on, config) {
      // Node event listeners can be added here
      // Useful for plugins, reporters, etc.
    },
  },
})
