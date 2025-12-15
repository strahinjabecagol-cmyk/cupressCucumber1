const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { Jimp } = require("jimp");
const jsQR = require("jsqr");
const fs = require("fs");
const path = require("path");

// Store the last screenshot path captured by the after:screenshot event
let lastScreenshotPath = null;

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    viewportWidth: 1280,
    viewportHeight: 720,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Capture the actual screenshot path after each screenshot is taken
      on("after:screenshot", (details) => {
        lastScreenshotPath = details.path;
        return details;
      });

      on("task", {
        async readQRCode(filePath) {
          const absolutePath = path.resolve(filePath);
          const buffer = fs.readFileSync(absolutePath);
          const image = await Jimp.read(buffer);
          const { data, width, height } = image.bitmap;
          const code = jsQR(new Uint8ClampedArray(data), width, height);

          if (!code) {
            throw new Error("Failed to decode QR code");
          }

          return code.data;
        },

        // Get the last captured screenshot path
        getLastScreenshotPath() {
          return lastScreenshotPath;
        },

        // Clear the stored screenshot path (useful for test cleanup)
        clearLastScreenshotPath() {
          lastScreenshotPath = null;
          return null;
        },
      });

      return config;
    },
  },
});
