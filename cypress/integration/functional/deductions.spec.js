/* eslint-disable max-len */

describe('Deductions', () => {
    it('Deductions Page Questionaire', () => {
            cy.get('@contentJSON').then((content) => {
                cy.aboutYouPage('single')
                cy.incomePage('salary', 'allYear', 'monthly', '6000', '60000', '1000', '10000')
                cy.adjustmentsPage()

                // verify radio and checkboxes
                cy.get('[data-testid=deductions-label]').should('have.text', content.deductions.StandardDeduction).and('be.visible')
                cy.get('[data-testid=deductions-standardDeduction]').should('have.text', content.deductions.StandardDeductionRadioButton).and('be.visible')
                cy.get('[data-testid=deductions-itemizedDeduction]').should('have.text', content.deductions.itemizedRadioButton).and('be.visible')
                // Verify disabled checkboxes because itemized deductions is not selected
                cy.get('.mt-6.block > fieldset > :nth-child(1) > .mt-1 > .flex > .MuiFormControlLabel-root').should('not.be.enabled')
                cy.get('[name=itemizedCalculationsDisabled]').should('not.be.enabled')
                // Click on standard deductions
                cy.get('[data-testid=deductions-input-standardDeduction]').click()
                // verify checboxes still not enabled
                cy.get('.mt-6.block > fieldset > :nth-child(1) > .mt-1 > .flex > .MuiFormControlLabel-root').should('not.be.enabled')
                cy.get('[name=itemizedCalculationsDisabled]').should('not.be.enabled')
                // Click on itemized
                cy.get('[data-testid=deductions-input-itemizedDeduction]').click()
                // Verify itemized text and checkboxes are enabled
                cy.get('[data-testid="deductionPayments.medical.checked"]').should('be.visible')
                cy.get('.w-full.block > fieldset > .mt-3 > .flex > .MuiFormControlLabel-root > .MuiButtonBase-root').should('be.visible')
                // Check all checkboxes
                cy.get('[data-testid="deductionPayments.medical.checked"]').should('not.be.disabled')
                cy.get('[type="checkbox"]').check({ force: true })
                cy.get('[type="checkbox"]').uncheck({ force: true })
                // Check Medical and Dental Expenses
                cy.get('[data-testid="deductionPayments.medical.checked"]').should('be.visible').click()
                cy.get('[data-testid="deductionPayments.medical.checked"]').click()
                cy.get('[data-testid="deductionPayments.medical.checked"]').click()
                cy.get('[data-testid=medical0-label]').should('be.visible')
                cy.get('[data-testid=medical0-input]').should('be.visible')
                cy.get('[data-testid=addAnother-medical]').should('be.visible')
                cy.get('[data-testid=addAnother-medical]').click()
                cy.get('[data-testid=addAnother-medical]').click()
                cy.get('[data-testid=addAnother-medical]').click()
                cy.get('[data-testid=addAnother-medical]').should('be.disabled')
                cy.get('[data-testid=deleteButton3]').click()
                cy.get('[data-testid=deleteButton2]').click()
                cy.get('[data-testid=deleteButton1]').click()
                cy.get('[data-testid=medical0-input]').type('10000').click()
                // Click on Taxes you paid and verify input and message
                cy.get('[data-testid="deductionPayments.paid.checked"]').click()
                cy.get('[data-testid=paid-callout]').should('have.text', 'Taxes paid is capped at $10,000').and('be.visible').click()
                cy.get('[data-testid=paid0-input]').type('15000')
                // Verify total is added
                cy.get('[data-testid=itemizedTotal]').should('have.text', content.deductions.ItemizedTotal).and('be.visible')
                // Verify itimized names
                cy.get('.mt-6.block > fieldset > :nth-child(1) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', 'Medical and dental expenses').and('be.visible')
                cy.get('.mt-6.block > fieldset > :nth-child(2) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', 'Taxes you paid').and('be.visible')
                cy.get('.mt-6.block > fieldset > :nth-child(3) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', 'Qualified interest that you paid').and('be.visible')
                cy.get('.mt-6.block > fieldset > :nth-child(4) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', 'Gifts to charity').and('be.visible')
                cy.get('.mt-6.block > fieldset > :nth-child(5) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', 'Casualty losses').and('be.visible')
                cy.get('.mt-6.block > fieldset > :nth-child(6) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', 'Other itemized deductions').and('be.visible')
            })
    })
        it('Deductions Tool Tips', () => {
            cy.get('@contentJSON').then((content) => {
                cy.aboutYouPage('single')
                cy.incomePage('salary', 'allYear', 'monthly', '6000', '60000', '1000', '10000')
                cy.adjustmentsPage()
                // Click on itemized
                 cy.get('[data-testid=deductions-input-itemizedDeduction]').click()
                // Verify tooltips
                cy.get('[data-testid=deductionsHelpTip]> svg').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
                cy.get('[data-testid=deductionsHelpTip]> svg').click()
                cy.get('[data-testid=deductionsToolTipHeading1]').should('have.text', 'Standard Deduction').and('be.visible')
                cy.get('[data-testid=deductionsToolTipParagraph1]').should('have.text', content.deductions.standardDeductionParagraph).and('be.visible')
                cy.get('[data-testid=deductionsHelpTip]').click()
                // Medical
                cy.get('[data-testid=medical-helpTip] > .svg-inline--fa').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
                cy.get('[data-testid=medical-helpTip] > .svg-inline--fa').click()
                cy.get('[data-testid=medicalToolTipHeading1]').should('have.text', 'Medical and Dental Expenses').and('be.visible')
                cy.get('[data-testid=medicalToolTipParagraph1]').should('have.text', content.deductions.medicalParagraph1).and('be.visible')
                // cy.get('[data-testid=MedicalTT1Link]').should('have.text', 'For more information visit').and('be.visible')
                cy.get('[data-testid=medical-helpTip] > .svg-inline--fa').click()
                // Taxes
                cy.get('[data-testid=paid-helpTip] > .svg-inline--fa').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
                cy.get('[data-testid=paid-helpTip] > .svg-inline--fa').click()
                cy.get('[data-testid=paidToolTipHeading1]').should('have.text', 'Taxes you paid').and('be.visible')
                cy.get('[data-testid=paidToolTipParagraph1]').should('have.text', content.deductions.taxesParagraph1).and('be.visible')
                cy.get('[data-testid=paidToolTipList0]').should('have.text', content.deductions.taxesList1).and('be.visible')
                cy.get('[data-testid=paidToolTipList1]').should('have.text', content.deductions.taxesList2).and('be.visible')
                cy.get('[data-testid=paidToolTipList2]').should('have.text', content.deductions.taxesList3).and('be.visible')
                cy.get('[data-testid=paidToolTipList3]').should('have.text', content.deductions.taxesList4).and('be.visible')
                // cy.get('[data-testid=paidTT1Link]').should('have.text', 'For more information visit').and('be.visible')
                cy.get('[data-testid=paid-helpTip] > .svg-inline--fa').click()
                // Quaified
                cy.get('[data-testid=qualified-helpTip] > .svg-inline--fa').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
                cy.get('[data-testid=qualified-helpTip] > .svg-inline--fa').click()
                cy.get('[data-testid=qualifiedToolTipHeading1]').should('have.text', 'Interest You Paid').and('be.visible')
                cy.get('[data-testid=qualifiedToolTipParagraph1]').should('have.text', content.deductions.qualifiedParagraph).and('be.visible')
                cy.get('[data-testid=qualifiedToolTipList0]').should('have.text', content.deductions.qualifiedList1).and('be.visible')
                cy.get('[data-testid=qualifiedToolTipList1]').should('have.text', content.deductions.qualifiedList2).and('be.visible')
                // cy.get('[data-testid=qualifiedTT1Link]').should('have.text', 'For more information visit').and('be.visible')
                cy.get('[data-testid=qualified-helpTip] > .svg-inline--fa').click()
                // GiftstoCharity
                cy.get('[data-testid=charity-helpTip] > .svg-inline--fa').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
                cy.get('[data-testid=charity-helpTip] > .svg-inline--fa').click()
                cy.get('[data-testid=charityToolTipHeading1]').should('have.text', 'Charity').and('be.visible')
                cy.get('[data-testid=charityToolTipParagraph1]').should('have.text', content.deductions.charityParagraph).and('be.visible')
                // cy.get('[data-testid=charityTT1Link]').should('have.text', 'For more information visit').and('be.visible')
                cy.get('[data-testid=charity-helpTip] > .svg-inline--fa').click()
                // Casualty
                cy.get('[data-testid=casualty-helpTip] > .svg-inline--fa').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
                cy.get('[data-testid=casualty-helpTip] > .svg-inline--fa').click()
                cy.get('[data-testid=casualtyToolTipHeading1]').should('have.text', 'Casualty Losses').and('be.visible')
                cy.get('[data-testid=casualtyToolTipParagraph1]').should('have.text', content.deductions.casualtyParagraph).and('be.visible')
                // cy.get('[data-testid=casualityTT1Link]').should('have.text', 'For more information visit').and('be.visible')
                cy.get('[data-testid=casualty-helpTip] > .svg-inline--fa').click()
                // Other
                cy.get('[data-testid=other-helpTip] > .svg-inline--fa').should('have.attr', 'data-icon', 'question-circle').and('be.visible')
                cy.get('[data-testid=other-helpTip] > .svg-inline--fa').click()
                cy.get('[data-testid=otherToolTipHeading1]').should('have.text', 'Other Deductions').and('be.visible')
                //cy.get('#deductionPayments\.other\.checked-helpTip > .my-3').should('have.text', 'For information on other deductions see Tax Topic 529').and('be.visible')
                cy.get('[data-testid=otherTT1Link]').should('have.text', 'Tax Topic 529').and('be.visible')
                cy.get('[data-testid=other-helpTip] > .svg-inline--fa').click()
            })
        })
    it('Deduction  Question Errors', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            cy.incomePage('salary', 'allYear', 'monthly', '6000', '60000', '1000', '10000')
            cy.adjustmentsPage()
            // Verify error if no radio button is selected (placeholder errors)
            cy.get('[data-testid=nextButton]').click()
            cy.get('[data-testid=errorHeading]').should('have.text', content.deductions.errorHeading).and('be.visible')
            cy.get('#deductions-error-message').should('be.visible')
                    })
    })
})
