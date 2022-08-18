const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "fmqvfa",
  viewportWidth: 1440,
  viewportHeigth: 900,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
