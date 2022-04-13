/* eslint-disable newline-per-chained-call */
/* eslint-disable max-len */
const content = require('../../fixtures/content.json')

describe('Regression', () => {
  it('Full Regression', () => {
    cy.viewport(1280, 1024)
    // GLOBAL
    // Header
    cy.get('[data-testid="helpLinkHeader"]').should('have.text', content.global.header.help).and('have.attr', 'href', content.global.headerLink.helpLink)
    cy.get('[data-testid="aboutIrsLink"]').should('have.text', content.global.footer.aboutIRS).and('have.attr', 'href', content.global.footerLinks.aboutIRSLink)
    cy.get('[data-testid="fileLink"]').should('have.text', content.global.header.file).and('have.attr', 'href', content.global.headerLink.fileLink).and('be.visible')
    // Progress Tracker
    cy.get('[data-testid="stepIndicatorStep1"]  > a').should('have.attr', 'href', content.progressTracker.page1Link).and('be.visible')
    cy.get('[data-testid="stepIndicatorStep1"]').should('have.text', content.progressTracker.page1).and('be.visible')
    // Breadcrumbs
    cy.get('[data-testid="breadcrumbHome"]').should('have.text', content.breadcrumbs.home).and('have.attr', 'href', content.breadcrumbs.homeLink)
  //  cy.get('[data-testid="breadcrumbCredits & Deductions"]').should('have.text', content.breadcrumbs.creditsDeductions).and('have.attr', 'href', content.breadcrumbs.creditsDeductionsLink)
    cy.get('[data-testid="breadcrumbIndividuals"]').should('have.text', content.breadcrumbs.individualsBreadcrumb).and('have.attr', 'href', content.breadcrumbs.individualsBreadcrumbLink)
  //  cy.get('[data-testid="breadcrumbAdvance Child Tax Credit Payments in 2021"]').should('have.text', content.breadcrumbs.actcBreadcrumb).and('have.attr', 'href', content.breadcrumbs.actcBreadcrumbLink)
    cy.get('[data-testid="currentPage"]').should('have.text', content.breadcrumbs.page1Breadcrumb)
    // App Title/Subtitle
  //  cy.get('[data-testid="generalHeader"]').should('have.text', content.title).and('be.visible')
  //  cy.get('[data-testid="generalHeaderIntro"]').should('have.text', content.subTitle).and('be.visible')
    // Page Title/Subtitle
  //  cy.get('[data-testid="generalTitle"]').should('have.text', content.genInfo.title).and('be.visible')
  //  cy.get('[data-testid="generalSubtitle"]').should('have.text', content.genInfo.subtitle).and('be.visible')
  //  cy.get('[data-testid="incomeReq"]').should('have.text', content.reqText).and('be.visible')
    // Skip Ahead Warnings
    cy.get('[data-testid="stepIndicatorStep2"]').click()
  //  cy.get('[data-testid="filingInfoTitle"]').should('have.text', content.filingStatus.title).and('be.visible')
  //  cy.get('[data-testid="warningBody"]').should('have.text', content.error.skipAheadFilingStatus).and('be.visible')

    // GENERAL PAGE
    cy.get('[data-testid="stepIndicatorStep1"]').click()
  //  cy.get('[for="didClaimCTC"]').should('be.visible')
  //  cy.get('[for="didClaimCTCUnsure"]').click()

    // Helptip Functionality
  //  cy.get('[data-testid="didClaimCTCHelpTip"]').click()
  //  cy.get('[data-testid="didClaimCTCToolTipParagraph1"]').should('be.visible')
  //  cy.get('[data-testid="didClaimCTCHelpTip"]').click()

    // Error Messages Functionality
  //  cy.get('[data-testid="nextButton"]').click()
  //  cy.get('[data-testid="errorHeading"]').should('be.visible')

  //  cy.get('[for="resident"]').should('be.visible')
  //  cy.get('[for="residentA"]').click()
  //  cy.get('[data-testid="nextButton"]').click()

    // STATUS & INCOME PAGE
  //  cy.get('[for="filingStatus"]').should('be.visible')
  //  cy.get('[for="filingInfo-hoh"]').click()

    // HelpTip Functionality
  //  cy.get('[data-testid="agiHelpTip"]').click()
  //  cy.get('[data-testid="agiToolTipParagraph1"]').should('be.visible')
  //  cy.get('[data-testid="agiHelpTip"]').click()

    // Error Messages Functionality
  //  cy.get('[data-testid="nextButton"]').click()
  //  cy.get('[data-testid="errorHeading"]').should('be.visible')

  //  cy.get('[data-testid="agi"]').type('2000')
  //  cy.get('[data-testid="nextButton"]').click()

    // QUALIFYING CHILDREN PAGE
  //  cy.get('[for="numOfQualifyingChildrenUnder6"]').should('be.visible')
  //  cy.get('[for="numOfQualifyingChildrenUnder18"]').should('be.visible')

    // Error Message Functionality
  //  cy.get('[data-testid="nextButton"]').click()
  //  cy.get('[data-testid="errorHeading"]').should('be.visible')

  //  cy.get('[data-testid="numOfQualifyingChildrenUnder6"]').type('1')
  //  cy.get('[data-testid="numOfQualifyingChildrenUnder18"]').type('1')
  //  cy.get('[data-testid="nextButton"]').click()

    // RESULTS PAGE
  //  cy.get('[data-testid="resultsTitle"]').should('be.visible')

    // Buttons and Start Over link
  //  cy.get('[data-testid="backButton"]').should('be.visible')
  //  cy.get('[data-testid="startOverButton"]').should('be.visible')
  })
})
