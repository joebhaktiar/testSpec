import {getCurrentYearStringPattern} from '../../fixtures/testsHelper'
/* eslint-disable max-len */
const content = require('../../fixtures/content.json')

describe('Global Test', () => {
    it('Page Titles', () => {
        cy.get('[data-testid="aboutYouTitle"]').should('have.text', content.aboutYou.title).and('be.visible')
        cy.get('[data-testid="aboutYouSubtitle"]').should('have.text', getCurrentYearStringPattern(content.aboutYou.subtitle, 'cYYYY')).and('be.visible')
        cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
        cy.aboutYouPage('single')
        cy.get('[data-testid="incomeWithholdingTitle"]').should('have.text', content.incomeWithholding.title).and('be.visible')
        cy.get('[data-testid="incomeWithholdingSubtitle"]').should('have.text', content.incomeWithholding.subtitle).and('be.visible')
        cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
        cy.incomePage('salary', 'allYear', 'monthly', '6000', '60000', '1000', '10000')
        cy.get('[data-testid="adjustmentsTitle"]').should('have.text', content.adjustments.adjustmentsTitle).and('be.visible')
        cy.get('[data-testid="adjustmentsSubtitle"]').should('have.text', content.adjustments.adjustmentsSubtitle).and('be.visible')
        //cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
        cy.adjustmentsPage()
        cy.get('[data-testid="deductionsTitle"]').should('have.text', content.deductions.title).and('be.visible')
        cy.get('[data-testid="deductionsSubtitle"]').should('have.text', content.deductions.subtitle).and('be.visible')
        cy.get('[data-testid="reqText"]').should('have.text', content.reqText).and('be.visible')
        cy.deductionsPage()
        cy.get('[data-testid="taxCreditsTitle"]').should('have.text', content.taxCredits.title).and('be.visible')
        cy.get('[data-testid="taxCreditsSubtitle"]').should('have.text', content.taxCredits.subtitle).and('be.visible')
        cy.get('[data-testid="taxCreditsHasDependentsInto"]').should('be.not.visible')
        cy.get('[data-testid="stepIndicatorStep1"]').click()
        cy.get('[data-testid="willClaimDependents"]').click()
        cy.get('[data-testid="stepIndicatorStep5"]').click()
        cy.get('[data-testid="taxCreditsHasDependentsInto"]').should('have.text', content.taxCredits.taxCreditsHasDependentsInto).and('be.visible')
        cy.taxCreditsPage()
        cy.get('[data-testid=yourResultsTitle]').should('have.text', content.results.yourResultsTitle).and('be.visible')
        cy.get('[data-testid=yourResultsSubtitle]').should('have.text', content.results.yourResultsSubtitle).and('be.visible')
    })
})