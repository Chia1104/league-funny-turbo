const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "zk31to",
  e2e: {
    baseUrl: "http://localhost:3000",
  },
});
