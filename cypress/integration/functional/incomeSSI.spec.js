/* eslint-disable max-len */

describe('Income and Witholding', () => {
    it('SSI Flow', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            // Job Type Question
            cy.get('[data-testid=incomeType0-label]').should('have.text', content.incomeWithholding.incomeType).and('be.visible')
            cy.get('[data-testid="jobs.0.incomeTypeHelpTip"]').should('be.visible').click()
            cy.get('[data-testid=incomeTypeToolTipHeading1]').should('have.text', content.ToolTip.incomeTypeToolTipHeading1).and('be.visible')
            cy.get('[data-testid=incomeTypeToolTipParagraph1]').should('have.text', content.ToolTip.incomeTypeToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="jobs.0.incomeTypeHelpTip"]').should('be.visible').click()
            cy.get('[data-testid=incomeTypeToolTipHeading1]').should('be.not.visible')
            cy.get('[data-testid=incomeType0-hourly]').should('have.text', content.incomeWithholding.hourly).and('be.visible')
            cy.get('[data-testid=incomeType0-salary]').should('have.text', content.incomeWithholding.salary).and('be.visible')
            cy.get('[data-testid=incomeType0-pension]').should('have.text', content.incomeWithholding.pension).and('be.visible')
            cy.get('[data-testid=incomeType0-ssi]').should('have.text', content.incomeWithholding.ssi).and('be.visible')
            cy.get('[data-testid=incomeType0-input-ssi]').should('be.disabled')
            cy.get('[data-testid=incomeType0-none]').should('have.text', content.incomeWithholding.none).and('be.visible')
            cy.get('[data-testid=numOfJobs-plus]').click()
            cy.get('[data-testid=undefined-trigger]').last().click()
            cy.get('[data-testid=incomeType1-ssi]').click()


            // SSI-YES
            // Total monthly amount
            cy.get('[data-testid=ssiAllYear1-label]').should('have.text', content.incomeWithholding.ssiAllYear)
            cy.get('[data-testid=ssiAllYear1-input-yes]').click()
            cy.get('[data-testid=ssiMonthlyAmount1-label]').should('have.text', content.incomeWithholding.ssiMonthlyAmount1Label).and('be.visible')
            cy.get('[data-testid=ssiMonthlyAmount1-label]').click()
            cy.get('[data-testid=ssiMonthlyAmount1-helpTip-button]').should('be.visible').click()
            //cy.get('[data-testid=ssiMonthlyAmountToolTipHeading1]').should('have.text', content.ToolTip.ssiMonthlyAmountToolTipHeading1Total).and('be.visible')
            //cy.get('[data-testid=ssiMonthlyAmountToolTipParagraph1]').should('have.text', content.ToolTip.ssiMonthlyAmountToolTipParagraph1Total).and('be.visible')
            cy.get('[data-testid=ssiMonthlyAmount1-helpTip-button]').should('be.visible').click()
            cy.get('[data-testid=ssiMonthlyAmountToolTipHeading1]').should('be.not.visible')
            cy.get('[data-testid="ssiMonthlyAmount1-input"]').type('5000').should('have.value', '$5,000')

            // YTD Taxes Withheld
            cy.get('[data-testid="taxesYTD1-label"]').should('have.text', content.incomeWithholding.ssiTaxesYTD).and('be.visible')
            // cy.get('[data-testid="jobs.0.taxesYTD-helpTip"]').should('be.visible').click()
            // cy.get('[data-testid="taxesYTDToolTipHeading1"]').should('have.text', content.ToolTip.taxesYTDToolTipHeading1).and('be.visible')
            // cy.get('[data-testid="taxesYTDToolTipParagraph1"]').should('have.text', content.ToolTip.taxesYTDToolTipParagraph1).and('be.visible')
            // cy.get('[data-testid="jobs.0.taxesYTD-helpTip"]').should('be.visible').click()
            // cy.get('[data-testid="taxesYTDToolTipHeading1"]').should('be.not.visible')
            cy.get('[data-testid="taxesYTD1-input"]').type('5000').should('have.value', '$5,000')

            // Taxes Last SSI Payment
            cy.get('[data-testid="taxesPerPayPeriod1-label"]').should('have.text', content.incomeWithholding.ssiTaxesPPP).and('be.visible')
            cy.get('[data-testid=taxesPerPayPeriod1-label]').click()
            cy.get('[data-testid=taxesPerPayPeriod1-helpTip-button]').should('be.visible').click()
            cy.get('[data-testid=taxesPerPayPeriodToolTipHeading1]').should('have.text', content.ToolTip.ssiTaxesPerPayPeriodToolTipHeading1Last).and('be.visible')
            cy.get('[data-testid=taxesPerPayPeriodToolTipParagraph1]').should('have.text', content.ToolTip.ssitaxesPerPayPeriodToolTipParagraph1Last).and('be.visible')
            cy.get('[data-testid=taxesPerPayPeriod1-helpTip-button]').should('be.visible').click()
            cy.get('[data-testid=taxesPerPayPeriodToolTipHeading1]').should('be.not.visible')
            cy.get('[data-testid=taxesPerPayPeriod1-input]').type('500').should('have.value', '$500')

            // Select any that apply

            // SSI-NO
            cy.get('[data-testid=ssiAllYear1-label]').click()
            cy.get('[data-testid=ssiAllYear1-input-no]').click()

            // Dates for your SSI benefits
            cy.get('[data-testid=dateRange1-label]').should('have.text', content.incomeWithholding.dateRangeSSI).and('be.visible')
            cy.get('[id="jobs.1.dateRange.startDate-label"]').should('have.text', content.incomeWithholding.start).and('be.visible')
            cy.get('[id="jobs.1.dateRange.startDate-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
            cy.get('[id="jobs.1.dateRange.endDate-label"]').should('have.text', content.incomeWithholding.end).and('be.visible')
            cy.get('[id="jobs.1.dateRange.endDate-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid=dateRange1-helpTip-button]').click()
            cy.get('[data-testid=dateRangeToolTipHeading1]').should('have.text', content.ToolTip.dateRangeToolTipHeading1SSI).and('be.visible')
            cy.get('[data-testid=dateRangeToolTipParagraph1]').should('have.text', content.ToolTip.dateRangeToolTipParagraph1SSI).and('be.visible')
            cy.get('[data-testid=dateRangeToolTipParagraph2]').should('have.text', content.ToolTip.dateRangeToolTipParagraph2SSI).and('be.visible')
            cy.get('[data-testid=dateRange1-helpTip-button]').click()
            cy.get('[data-testid=dateRangeToolTipHeading1]').should('be.not.visible')
            cy.get('[data-testid="jobs.1.dateRange.startDate"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.1.dateRange.endDate"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.1.dateRange.startDateCalenderButton"]').should('be.visible')
            cy.get('[data-testid="jobs.1.dateRange.endDateCalenderButton"]').should('be.visible')
            //The following date tests (2021) need to be investigated as the tests still pass
            cy.get('[data-testid="jobs.1.dateRange.startDate"]').type('02202021').should('have.value', '02/20/2021')
            cy.get('[data-testid="jobs.1.dateRange.endDate"]').type('07302021')
            cy.get('[data-testid="jobs.1.dateRange.endDate"]').should('have.value', '07/30/2021')

            // SSI benefits YTD
            cy.get('[data-testid=ssiBenefitsYTD1-label]').should('have.text', content.incomeWithholding.ssiBenefitsYTD).and('be.visible')
            cy.get('[data-testid=ssiBenefitsYTD1-helpTip-button]').should('be.visible').click()
            //cy.get('[data-testid=ssiMonthlyAmountToolTipHeading1]').should('have.text', content.ToolTip.ssiMonthlyAmountToolTipHeading1YTD).and('be.visible')
            //cy.get('[data-testid=ssiMonthlyAmountToolTipParagraph1YTD"]').should('have.text', content.ToolTip.ssiMonthlyAmountToolTipParagraph1YTD).and('be.visible')
            cy.get('[data-testid=ssiBenefitsYTD1-helpTip-button]').should('be.visible').click()
            cy.get('[data-testid=ssiMonthlyAmountToolTipHeading1]').should('be.not.visible')
            cy.get('[data-testid=ssiBenefitsYTD1-input]').type('20000').should('have.value', '$20,000')

            // Enter taxes paid Year-to-date
            cy.get('[data-testid=taxesYTD1-label]').should('have.text', content.incomeWithholding.taxesYTD2).and('be.visible')
            cy.get('[data-testid=taxesYTD1-input]').clear().type('5000').should('have.value', '$5,000')
        })
    })
})
