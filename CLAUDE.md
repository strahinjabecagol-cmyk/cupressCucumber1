# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cypress test automation project using Cucumber/Gherkin syntax for BDD-style tests. It tests various web applications including calculators, coffee carts, QR code generators, and REST APIs.

## Commands

```bash
# Run all tests headlessly
npx cypress run

# Run a specific feature file
npx cypress run --spec "cypress/e2e/features/calculator.feature"

# Open Cypress Test Runner (interactive mode)
npx cypress open

# Install dependencies
npm install
```

## Architecture

### Cucumber Integration
- Uses `@badeball/cypress-cucumber-preprocessor` with esbuild bundler
- Feature files: `cypress/e2e/features/*.feature`
- Step definitions: `cypress/support/step_definitions/*.js`
- Step definition path configured in `package.json` under `cypress-cucumber-preprocessor.stepDefinitions`

### Custom Cypress Tasks (cypress.config.js)
- `readQRCode(filePath)`: Decodes QR codes from screenshot images using jimp and jsqr
- `getLastScreenshotPath()`: Returns the path of the most recent screenshot captured
- `clearLastScreenshotPath()`: Resets stored screenshot path

### Custom Commands (cypress/support/commands.js)
- `cy.readQRCode(filePath)`: Wrapper for the readQRCode task

### Test Categories
- **UI Tests**: Calculator app, Coffee Cart app
- **API Tests**: Cat Facts API (`catfact.ninja`)
- **QR Code Tests**: QR code generation and scanning via screenshots

### Key Patterns
- Step definitions use `@badeball/cypress-cucumber-preprocessor` imports for Given/When/Then
- Aliases (`cy.wrap().as()`) are used to pass data between steps
- Screenshot-based QR code testing uses the `after:screenshot` event to capture actual file paths
