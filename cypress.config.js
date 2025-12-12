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

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

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
      });

      return config;
    },
  },
});
