import {getCurrentDateForCalendar} from '../fixtures/testsHelper'

/* eslint-disable max-len */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// const compareSnapshotCommand = require('cypress-visual-regression/dist/command');

// compareSnapshotCommand();
Cypress.Commands.add('aboutYouPage', (filingStatus) => {
  cy.get(`[data-testid="filingStatus-${filingStatus}"]`).click()
  cy.get('[data-testid="jobOrPension-yes"]').click()
  cy.get('[data-testid="nextButton"]').click()
  cy.get('[data-testid="incomeWithholdingTitle"]').should('be.visible')
})
Cypress.Commands.add('incomePage', (IncomeSource, currentSituation, howFrequently, wagesLastPeriod, wagesYTD, taxesLastPeriod, TaxesYTD) => {
  cy.get(`[data-testid="incomeType0-input-${IncomeSource}"]`).click()
  cy.get(`[data-testid="timePeriodOfJob0-input-${currentSituation}"]`).click()
  cy.get('[data-testid=payFrequency0-label]').should('be.visible').click()
  cy.get(`[data-testid="payFrequency0-input-${howFrequently}"]`).click()
  cy.get('[data-testid="jobs.0.dateLastPayPeriod"]').type(getCurrentDateForCalendar())
  cy.get('[data-testid=wagesPerPayPeriod0-input]').type(`${wagesLastPeriod}`)
  cy.get('[data-testid=wagesYTD0-input]').type(`${wagesYTD}`)
  cy.get('[data-testid=isIncomeAmountCorrect0-input-yes]').click()
  cy.get('[data-testid=isIncomeAmountCorrect0-input-yes]').click()
  cy.get('[data-testid=taxesPerPayPeriod0-input]').type(`${taxesLastPeriod}`)
  cy.get('[data-testid=taxesYTD0-input]').type(`${TaxesYTD}`)
  cy.get('[data-testid="nextButton"]').click()
  cy.get('[data-testid="adjustmentsTitle"]').should('be.visible')
})
Cypress.Commands.add('adjustmentsPage', () => {
  // cy.get('[data-testid="studentLoanHelpTip"]').click()
  cy.get('[data-testid="nextButton"]').click()
  cy.get('[data-testid="deductionsTitle"]').should('be.visible')
})
Cypress.Commands.add('deductionsPage', () => {
  cy.get('[data-testid="deductions-standardDeduction"]').click()
  cy.get('[data-testid="nextButton"]').click()
  cy.get('[data-testid="taxCreditsTitle"]').should('be.visible')
})
Cypress.Commands.add('taxCreditsPage', () => {
  cy.get('[data-testid="childCreditsAccordion-trigger"]').click()
  cy.get('[data-testid="nextButton"]').click()
  cy.get('[data-testid=yourResultsTitle]').should('be.visible')
})

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

function antTaxFuntion(agi) {
  const level1 = 995
  const level2 = 3668
  const level3Amount = ((`${agi}`) - (9951 + 30574))
  const level3 = (level3Amount * (0.22))
  const antTax = (level1 + level2 + level3 + 6).toFixed(0)
  cy.log(`antTaxFuntion funtcion log: ${antTax}`)
        return cy.wrap(antTax);
}

Cypress.Commands.add('antTaxFuntion', (antTaxFuntion))

const jsonAssertion = require('soft-assert')

Cypress.Commands.add('softAssert', (actual, expected, message) => {
  jsonAssertion.softAssert(actual, expected, message)
  if (jsonAssertion.jsonDiffArray.length) {
    jsonAssertion.jsonDiffArray.forEach((diff) => {
      const log = Cypress.log({
        name: 'Soft assertion error',
        displayName: 'softAssert error',
        message: diff.error.message,
         })
    })
  }
})
  Cypress.Commands.add('softAssertAll', () => jsonAssertion.softAssertAll())

  Cypress.Commands.add('parseXlsx', (inputFile) => {
   cy.task('parseXlsx', { filePath: inputFile })
})

Cypress.Commands.add('clickVisibleButton', () => {
  cy.get('[data-testid=underShutDownWithholdingIntro]').then(($mainContainer) => {
      const isVisible = $mainContainer.find('[data-testid=salaryIntroParagraph20]').not(':visible');
      if (isVisible) {
        cy.get('.MuiSlider-thumb').type('{leftarrow}')
          this.clickVisibleButton();
      }
  })
})

Cypress.Commands.add('MoveSlider', (value) => {
const moveToTheRight = () => {
  cy.get('.MuiSlider-thumb')
  .should('not.be.empty')
  .invoke('attr', 'aria-valuenow')
  .then(parseInt)

.then((currentValue) => {
  cy.log(currentValue)
  // if the expected number is found
  // stop adding any more commands
  if (currentValue === value) {
    cy.log('to ', value)

    return
  }
  cy.get('.MuiSlider-thumb').type('{rightarrow}')
  moveToTheRight()
})
}
moveToTheRight()
})
