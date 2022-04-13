/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// Import commands.js using ES2015 syntax:
import './commands'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@cypress/code-coverage/support'

// Cypress.on('uncaught:exception', () =>
  // returning false here prevents Cypress from failing the test
  // false
// )

const mobileDevice = 'iphone-x'

const localhost = 'http://localhost:3900/app/tax-withholding-estimator/'
const tweDev = 'https://twe-frontend-bucket-dev.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
const actcSit = 'https://twe-frontend-bucket-sit.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
const actcEITE = 'https://twe-frontend-bucket-eite.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
const actcPete = 'https://twe-frontend-bucket-pete.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
const actcPerf = 'https://cloudapps.perf.irs.gov/app/tax-withholding-estimator'
const actcProd = 'https://twe-frontend-bucket-prod.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
const actcLive = 'https://apps.irs.gov/app/tax-withholding-estimator'

beforeEach('Run Before Each Script', () => {
  cy.visit(localhost)
  // cy.viewport(mobileDevice)
  cy.fixture('content.json').as('contentJSON')
 })
