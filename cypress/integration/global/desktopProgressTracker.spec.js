/* eslint-disable max-len */
const content = require('../../fixtures/content.json')

describe('Global Test', () => {
    it('Progress Tracker', () => {
        cy.viewport(1280, 1024)
        cy.get('[data-testid="stepIndicatorStep1"]  > a').should('have.attr', 'href', content.progressTracker.page1Link).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep1"]').should('have.text', content.progressTracker.page1).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep2"]  > a').should('have.attr', 'href', content.progressTracker.page2Link).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep2"]').should('have.text', content.progressTracker.page2).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep3"]  > a').should('have.attr', 'href', content.progressTracker.page3Link).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep3"]').should('have.text', content.progressTracker.page3).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep4"]  > a').should('have.attr', 'href', content.progressTracker.page4Link).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep4"]').should('have.text', content.progressTracker.page4).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep5"]  > a').should('have.attr', 'href', content.progressTracker.page5Link).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep5"]').should('have.text', content.progressTracker.page5).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep6"]  > a').should('have.attr', 'href', content.progressTracker.page6Link).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep6"]').should('have.text', content.progressTracker.page6).and('be.visible')
    })
})
