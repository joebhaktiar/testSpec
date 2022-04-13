/* eslint-disable max-len */
const content = require('../../fixtures/content.json')

describe('Global Test', () => {
    it('Breadcrumbs', () => {
        cy.viewport(1280, 1024)
        cy.get('[data-testid="breadcrumbHome"]').should('have.text', content.breadcrumbs.home).and('have.attr', 'href', content.breadcrumbs.homeLink).and('be.visible')
        cy.get('[data-testid="breadcrumbFile"]').should('have.text', content.breadcrumbs.fileBreadcrumb).and('have.attr', 'href', content.breadcrumbs.fileBreadcrumbLink).and('be.visible')
        cy.get('[data-testid="breadcrumbIndividuals"]').should('have.text', content.breadcrumbs.individualsBreadcrumb).and('have.attr', 'href', content.breadcrumbs.individualsBreadcrumbLink).and('be.visible')
        cy.get('[data-testid="breadcrumbTaxWithholdingEstimator"]').should('have.text', content.breadcrumbs.tweBreadcrumb).and('have.attr', 'href', content.breadcrumbs.tweBreadcrumbLink).and('be.visible')
        cy.get('[data-testid="currentPage"]').should('have.text', content.breadcrumbs.page1Breadcrumb).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep2"]').click()
        cy.get('[data-testid="currentPage"]').should('have.text', content.breadcrumbs.page2Breadcrumb).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep3"]').click()
        cy.get('[data-testid="currentPage"]').should('have.text', content.breadcrumbs.page3Breadcrumb).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep4"]').click()
        cy.get('[data-testid="currentPage"]').should('have.text', content.breadcrumbs.page4Breadcrumb).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep5"]').click()
        cy.get('[data-testid="currentPage"]').should('have.text', content.breadcrumbs.page5Breadcrumb).and('be.visible')
        cy.get('[data-testid="stepIndicatorStep6"]').click()
        cy.get('[data-testid="currentPage"]').should('have.text', content.breadcrumbs.page6Breadcrumb).and('be.visible')
    })
})
