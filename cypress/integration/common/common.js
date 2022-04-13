/* eslint-disable import/no-extraneous-dependencies */
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

// const localhost = 'http://localhost:3900/app/tax-withholding-estimator/'
// const tweDev = 'http://twe-frontend-bucket-dev.s3-website-us-east-1.amazonaws.com/app/tax-withholding-estimator/'
// const url = localhost

// Click
When('I click on {string} for {string} radio question', (value, field) => {
  cy.get(`[data-testid=${field}-${value}]`).click()
})
Then('I click the {string} button', (buttonId) => {
  cy.get(`[data-testid=${buttonId}Button]`).click()
})

// Select checkbox
Then('I select the {string} checkbox', (value) => {
  cy.get(`[data-testid=${value}]`).click()
})
Then('I open the {string} checkbox', (value) => {
  cy.get(`[data-testid=${value}]`).click({ force: true })
})

// Type
Then('I type {string} in the {string} currency field', (value, field) => {
  cy.get(`[data-testid=${field}-input]`).type(value)
})
Then('I type {string} in currency field {string} of {string}', (value, nth, field) => {
  cy.get(`[data-testid=${field}${nth}-input]`).type(value)
})
// Data-test id  with ""
Then('I type {string} in data field {string} of {string}', (value, nth, field) => {
  cy.get(`[data-testid="jobs[${nth}].${field}"`).type(value)
})

Then('The {string} field should display as {string}', (field, text) => {
  cy.get(`[data-testid=${field}]`).should('have.text', text)
})

Then('I open the {string} accordion', (field) => {
  cy.get(`[data-testid=${field}Accordion-trigger]`).click()
})

Then('The {string} field should be visible', (field) => {
  cy.get(`[data-testid=${field}]`).should('be.visible')
})

// extra from here down
// Given('I am on the {string} page', (page) => {
//   cy.visit(`${url}${page}/`)
// })

// Then('The radio question {string} should be {string}', (field, value) => {
//   cy.get(`[data-testid=${field}-input-${value}]`).should('be.checked')
// })

// Then('I should see {string} warning', (alertId) => {
//   cy.get(`#${alertId}`).should('exist')
// })

// Then('The {string} button should be disabled', (buttonId) => {
//   cy.get(`[data-testid=${buttonId}]`).should('have.attr', 'disabled')
// })

// Then('The {string} value should be {string}', (field, value) => {
//   cy.get(`[data-testid=${field}]`).should('have.text', value)
// })

// Then('The {string} field should be hidden', (field) => {
//   cy.get(`[data-testid=${field}]`).should('not.be.visible')
// })

// Then('The {string} currency field should have {string} value', (field, value) => {
//   cy.get(`[data-testid=${field}-input]`).should('have.value', value)
// })
