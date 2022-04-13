import {getNextYearString} from '../../fixtures/testsHelper'
/* eslint-disable max-len */

describe('About You Page', () => {
    it('Default', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
        })
    })
    it('Completed', () => {
        cy.get('@contentJSON').then((content) => {
            // cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            // cy.get('[data-testid="backButton"]').should('not.exist')
        })
    })
    it('Filing Status Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="filingStatus-label"]').should('have.text', content.aboutYou.filingStatus).and('be.visible')
            cy.get('[data-testid="filingStatusHelpTip"]').should('be.visible')
            cy.get('[data-testid="filingStatus-single"]').should('have.text', content.aboutYou.single).and('be.visible')
            cy.get('[data-testid="filingStatus-married"]').should('have.text', content.aboutYou.mfj).and('be.visible')
            cy.get('[data-testid="filingStatus-head-Of-Household"]').should('have.text', content.aboutYou.hoh).and('be.visible')
            cy.get('[data-testid="filingStatus-widow"]').should('have.text', content.aboutYou.qw).and('be.visible')
            cy.get('[data-testid="filingStatus-married-Separate"]').should('have.text', content.aboutYou.mfs).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('[data-testid="jobOrPension"]').should('be.not.visible') // for the next question
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="filingStatus-head-Of-Household"]').click()
            cy.get('[data-testid="filingStatus-widow"]').click()
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            cy.get('[data-testid="jobOrPension"]').should('be.visible')
        })
    })
    it('Filing Status Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="errorBody"]').should('have.text', content.error.filingStatusError).click()
            cy.get('[id="filingStatus-error-message"]').should('have.text', content.error.filingStatusError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
    it('Job/Pension Question', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="jobOrPension-label"]').should('have.text', content.aboutYou.jobOrPension).and('be.visible')
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="jobOrPension-label"]').should('have.text', content.aboutYou.jobOrPensionMFJ).and('be.visible')
            cy.get('[data-testid="jobOrPensionHelpTip"]').should('be.visible')
            cy.get('[data-testid="jobOrPension-yes"]').should('have.text', content.yes).and('be.visible')
            cy.get('[data-testid="jobOrPension-no"]').should('have.text', content.no).and('be.visible')
            cy.get('[data-testid="backButton"]').should('not.exist')
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
            cy.get('fieldset > legend').should('be.not.visible') // for the next question
            cy.get('[data-testid="jobOrPension-yes"]').click()
            cy.get('[data-testid="jobOrPension-no"]').click()
            cy.get('[data-testid="jobOrPension"]').should('be.visible')
        })
    })
    it('Job/Pension Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="nextButton"]').should('be.enabled').click()
            cy.get('[data-testid="errorHeading"]').should('have.text', content.error.errorHeading)
            cy.get('[data-testid="errorBody"]').should('have.text', content.error.jobOrPensionError).click()
            cy.get('[id="jobOrPension-error-message"]').should('have.text', content.error.jobOrPensionError)
            cy.get('[data-testid="nextButton"]').should('have.text', content.nextButton).and('be.enabled').and('be.visible')
        })
    })
    it('Checkboxes Single', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="filingStatus-single"]').click()
            cy.get('[data-testid="jobOrPension-yes"]').click()
            cy.get('[data-testid="demographicsCheckboxGroup"]').should('have.text', content.aboutYou.demographicsCheckboxGroup).and('be.visible')
            cy.get('[data-testid=is65OrOlder]').should('have.text', content.aboutYou.is65OrOlderLabel+getNextYearString()).and('be.visible')
            cy.get('[data-testid=blind]').should('have.text', content.aboutYou.blindLabel).and('be.visible')
            cy.get('[data-testid=claimedAsDependent]').should('have.text', content.aboutYou.claimedAsDependentLabel).and('be.visible')
            cy.get('[data-testid="claimedAsDependentHelpTip"] > svg').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
            cy.get('[data-testid="claimedAsDependentHelpTip"]').click()
            cy.get('[data-testid="claimedAsDependentToolTipHeading1"]').should('have.text', content.ToolTip.claimedAsDependentToolTipHeading1).and('be.visible').click()
            cy.get('[data-testid="claimedAsDependentToolTipParagraph1"]').should('have.text', content.ToolTip.claimedAsDependentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="claimedAsDependentHelpTip"]').click()
            cy.get('[data-testid="claimedAsDependentToolTipParagraph1"]').should('be.not.visible')
            cy.get('[data-testid="willClaimDependents"]').should('have.text', content.aboutYou.willClaimDependentsLabel).and('be.visible')
            cy.get('[data-testid="willClaimDependentsHelpTip"] > svg').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
            cy.get('[data-testid="willClaimDependentsHelpTip"]').click()
            cy.get('[data-testid="willClaimDependentsHelpTip"] > svg').should('have.attr', 'data-icon', 'times-circle').and('be.visible')
            cy.get('[data-testid="willClaimDependentsToolTipHeading1"]').should('have.text', content.ToolTip.willClaimDependentsToolTipHeading1).and('be.visible')
            cy.get('[data-testid="willClaimDependentsToolTipParagraph1"]').should('have.text', content.ToolTip.willClaimDependentsToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="willClaimDependentsHelpTip"]').click()
            cy.get('[data-testid="willClaimDependentsToolTipParagraph1"]').should('be.not.visible')
        })
    })
    it('Checkboxes MFJ', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="filingStatus-married"]').click()
            cy.get('[data-testid="jobOrPension-yes"]').click()
            cy.get('[data-testid="demographicsCheckboxGroup"]').should('have.text', content.aboutYou.demographicsCheckboxGroupMFJ).and('be.visible')
            cy.get('[data-testid="is65OrOlder"]').should('have.text', content.aboutYou.is65OrOlderLabel+getNextYearString()).and('be.visible')
            cy.get('[data-testid="is65OrOlderSpouse"]').should('have.text', content.aboutYou.is65OrOlderSpouseLabel+getNextYearString()).and('be.visible')
            cy.get('[data-testid="blind"]').should('have.text', content.aboutYou.blindLabel).and('be.visible')
            cy.get('[data-testid="blindSpouse"]').should('have.text', content.aboutYou.blindSpouseLabel).and('be.visible')
            cy.get('[data-testid="claimedAsDependent"]').should('have.text', content.aboutYou.claimedAsDependentLabel).and('be.visible')
            cy.get('[data-testid="claimedAsDependentHelpTip"]').should('be.visible')
            cy.get('[data-testid="willClaimDependents"]').should('have.text', content.aboutYou.willClaimDependentsLabel).and('be.visible')
            cy.get('[data-testid="willClaimDependentsHelpTip"]').should('be.visible')
        })
   })
   it('Checkboxes HOH', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="filingStatus-head-Of-Household"]').click()
            cy.get('[data-testid="jobOrPension-yes"]').click()
            cy.get('[data-testid="demographicsCheckboxGroup"]').should('have.text', content.aboutYou.demographicsCheckboxGroup).and('be.visible')
            cy.get('[data-testid="is65OrOlder"]').should('have.text', content.aboutYou.is65OrOlderLabel+getNextYearString()).and('be.visible')
            cy.get('[data-testid="blind"]').should('have.text', content.aboutYou.blindLabel).and('be.visible')
            cy.get('[data-testid="claimedAsDependent"]').should('have.text', content.aboutYou.claimedAsDependentLabel).and('be.visible')
            cy.get('[data-testid="claimedAsDependentHelpTip"]').should('be.visible')
            cy.get('[data-testid="willClaimDependents"]').should('have.text', content.aboutYou.willClaimDependentsLabelRequired).and('be.visible') // a required box
            cy.get('[data-testid="willClaimDependentsHelpTip"]').should('be.visible')
            })
   })
   it('Checkboxes QW', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="filingStatus-widow"]').click()
            cy.get('[data-testid="jobOrPension-yes"]').click()
            cy.get('[data-testid="demographicsCheckboxGroup"]').should('have.text', content.aboutYou.demographicsCheckboxGroup).and('be.visible')
            cy.get('[data-testid=is65OrOlder]').should('have.text', content.aboutYou.is65OrOlderLabel+getNextYearString()).and('be.visible')
            cy.get('[data-testid="blind"]').should('have.text', content.aboutYou.blindLabel).and('be.visible')
            cy.get('[data-testid="willClaimDependents"]').should('have.text', content.aboutYou.willClaimDependentsLabelRequired).and('be.visible') // a required box
            cy.get('[data-testid="willClaimDependentsHelpTip"]').should('be.visible')
          })
   })
   it('Checkboxes MFS', () => {
        cy.get('@contentJSON').then((content) => {
            cy.get('[data-testid="filingStatus-married-Separate"]').click()
            cy.get('[data-testid="jobOrPension-yes"]').click()
            cy.get('[data-testid="demographicsCheckboxGroup"]').should('have.text', content.aboutYou.demographicsCheckboxGroup).and('be.visible')
            cy.get('[data-testid=is65OrOlder]').should('have.text', content.aboutYou.is65OrOlderLabel+getNextYearString()).and('be.visible')
            cy.get('[data-testid="blind"]').should('have.text', content.aboutYou.blindLabel).and('be.visible')
            cy.get('[data-testid="claimedAsDependent"]').should('have.text', content.aboutYou.claimedAsDependentLabel).and('be.visible')
            cy.get('[data-testid="claimedAsDependentHelpTip"]').should('be.visible')
            cy.get('[data-testid="willClaimDependents"]').should('have.text', content.aboutYou.willClaimDependentsLabel).and('be.visible')
            cy.get('[data-testid="willClaimDependentsHelpTip"]').should('be.visible')
          })
    })
})
