const content = require('../../fixtures/content.json')

describe('Global Test', () => {
    it('Official Government Website', () => {
        cy.viewport(1280, 1024)
        cy.get('[data-testid="U.S. Flag"]').should('be.visible')
        cy.get('[data-testid="US Flag text"]').should('have.text', content.global.header.govWebsiteText).and('be.visible')
    })
})
