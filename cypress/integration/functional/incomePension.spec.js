import {getNumbersFromDate, getCurrentDateForCalendar, incomeToDateMonthly, 
    convertToDollar, salaryYearIncome, getOffsetDateForCalendar} from '../../fixtures/testsHelper'
/* eslint-disable max-len */

describe('Income and Witholding', () => {
    //added the following tests (1 income) see whc-1654
    it('Pension Disabled', () => {
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
            //added the following assertion (1 income) see whc-1654
            cy.get('[data-testid=incomeType0-input-pension]').should('be.disabled')
            cy.get('[data-testid=incomeType0-input-ssi]').should('be.disabled')
            cy.get('[data-testid=incomeType0-ssi]').should('have.text', content.incomeWithholding.ssi).and('be.visible')
            cy.get('[data-testid=incomeType0-none]').should('have.text', content.incomeWithholding.none).and('be.visible')
        })
    })
    it('Pension Enabled Flow', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            // Job Type Question
            cy.get('[data-testid=incomeType0-label]').should('have.text', content.incomeWithholding.incomeType).and('be.visible')
            cy.get('[data-testid="jobs.0.incomeTypeHelpTip"]').should('be.visible').click()
            cy.get('[data-testid=incomeTypeToolTipHeading1]').should('have.text', content.ToolTip.incomeTypeToolTipHeading1).and('be.visible')
            cy.get('[data-testid=incomeTypeToolTipParagraph1]').should('have.text', content.ToolTip.incomeTypeToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="jobs.0.incomeTypeHelpTip"]').should('be.visible').click()
            cy.get('[data-testid=incomeTypeToolTipHeading1]').should('be.not.visible')
            // cy.get('[data-testid=incomeType1-hourly]').should('have.text', content.incomeWithholding.hourly).and('be.visible')
            // cy.get('[data-testid=incomeType1-salary]').should('have.text', content.incomeWithholding.salary).and('be.visible')
            // cy.get('[data-testid=incomeType1-pension]').should('have.text', content.incomeWithholding.pension).and('be.visible')
            //added the following assertion (2 incomes) see whc-1654
            cy.get('[data-testid=numOfJobs-plus]').click()
            cy.get('[data-testid=undefined-trigger]').last().click()
            cy.get('[data-testid=incomeType1-pension]').click()
            cy.get('[data-testid=incomeType1-input-pension]').should('not.be.disabled')
            cy.get('[data-testid=incomeType1-ssi]').should('have.text', content.incomeWithholding.ssi).and('be.visible')
            cy.get('[data-testid=incomeType1-none]').should('have.text', content.incomeWithholding.none).and('be.visible')
            cy.get('[data-testid=incomeType1-pension]').click()

            // Time Period of Job Question
            cy.get('[data-testid=timePeriodOfJob1-label]').should('have.text', content.incomeWithholding.timePeriodOfJobPension).and('be.visible')
            cy.get('[data-testid=timePeriodOfJob1-allYear]').should('have.text', content.incomeWithholding.pensionAllYear).and('be.visible')
            cy.get('[data-testid=timePeriodOfJob1-past]').should('have.text', content.incomeWithholding.pensionPast).and('be.visible')
            cy.get('[data-testid=timePeriodOfJob1-future]').should('have.text', content.incomeWithholding.pensionFuture).and('be.visible')
            cy.get('[data-testid=timePeriodOfJob1-currentPortion]').should('have.text', content.incomeWithholding.pensionCurrentPortion).and('be.visible')

            // ALL YEAR FLOW
            cy.get('[data-testid=timePeriodOfJob1-allYear]').click()

            // Pay frequency Question
            cy.get('[data-testid=payFrequency1-label]').should('have.text', content.incomeWithholding.payFrequencyPension).and('be.visible')
            cy.get('[data-testid=payFrequency1-label]').click()
            cy.get('[data-testid="jobs.1.payFrequencyHelpTip"]').should('be.visible').click()
            cy.get('[data-testid=pensionPayFrequencyToolTipHeading1]').should('have.text', content.ToolTip.timePeriodOfPensionToolTipHeading1).and('be.visible')
            cy.get('[data-testid=pensionPayFrequencyToolTipParagraph1]').should('have.text', content.ToolTip.timePeriodOfPensionToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="jobs.1.payFrequencyHelpTip"]').should('be.visible').click()
            cy.get('[data-testid=pensionPayFrequencyToolTipHeading1]').should('be.not.visible')
            cy.get('[data-testid=payFrequency1-weekly]').should('have.text', content.incomeWithholding.weekly).and('be.visible')
            cy.get('[data-testid=payFrequency1-biweekly]').should('have.text', content.incomeWithholding.biweekly).and('be.visible')
            cy.get('[data-testid=payFrequency1-twiceMonthly]').should('have.text', content.incomeWithholding.twiceMonthly).and('be.visible')
            cy.get('[data-testid=payFrequency1-monthly]').should('have.text', content.incomeWithholding.monthly).and('be.visible')
            cy.get('[data-testid=payFrequency1-monthly]').click()

            // Most Recent Pension Question
            cy.get('[id="jobs.1.dateLastPayPeriod-label"]').should('have.text', content.incomeWithholding.dateLastPension).and('be.visible')
            cy.get('[id="jobs.1.dateLastPayPeriod-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.1.dateLastPayPeriod"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.1.dateLastPayPeriodCalenderButton"]').should('be.visible')
            const adjustedDate = getCurrentDateForCalendar()
            cy.get('[data-testid="jobs.1.dateLastPayPeriod"]').type(getNumbersFromDate(adjustedDate)).should('have.value', adjustedDate)

            // Pay Statement Question
            // Last
            cy.get('[data-testid=wagesPerPayPeriod1-label]').should('have.text', content.incomeWithholding.lastPensionStatement).and('be.visible')
            cy.get('[data-testid="wagesPerPayPeriod1-input"]').type('$10,000').should('have.value', '$10,000')
            // YTD
            cy.get('[data-testid=wagesYTD1-label]').should('have.text', content.incomeWithholding.pensionPaymentYTD).and('be.visible')
            const payToDate = incomeToDateMonthly(10000)
            cy.get('[data-testid="wagesYTD1-input"]').type(payToDate).should('have.value', convertToDollar(payToDate))

            // Does This Amount Look Correct Question
            cy.get('[data-testid=isIncomeAmountCorrect1-label]').should('have.text', salaryYearIncome(content.incomeWithholding.isIncomeAmountCorrect,10000,12)).and('be.visible')
            // verify yes and no is visible
            cy.get('[data-testid=isIncomeAmountCorrect1-label]').click()
            cy.get('[data-testid=isIncomeAmountCorrect1-input-yes]').click()
            
            // Taxes Last pay period
            cy.get('[data-testid=taxesPerPayPeriod1-label]').should('have.text', content.incomeWithholding.taxesPerPayPeriod).and('be.visible')
            cy.get('[data-testid=taxesPerPayPeriod1-label]').click()
            cy.get('[data-testid=taxesPerPayPeriod1-helpTip-button]').should('be.visible').click()
            cy.get('[data-testid=taxesPerPayPeriodToolTipHeading1]').should('have.text', content.ToolTip.taxesPerPayPeriodToolTipHeading1).and('be.visible')
            cy.get('[data-testid=taxesPerPayPeriodToolTipParagraph1]').should('have.text', content.ToolTip.taxesPerPayPeriodToolTipParagraph1).and('be.visible')
            cy.get('[data-testid=taxesPerPayPeriod1-helpTip-button]').should('be.visible').click()
            cy.get('[data-testid=taxesPerPayPeriodToolTipHeading1]').should('be.not.visible')
            cy.get('[data-testid=taxesPerPayPeriod1-input]').type('500').should('have.value', '$500')

            // Taxes Paid YTD
            const taxToDate = incomeToDateMonthly(500)
            cy.get('[data-testid=taxesYTD1-label]').should('have.text', content.incomeWithholding.taxesYTD).and('be.visible')
            cy.get('[data-testid=taxesYTD1-input]').type(taxToDate).should('have.value', convertToDollar(taxToDate))

            // Contribute to an HSA/FSA Question
            cy.get('[data-testid=contributeToCafeteriaPlan1-label]').should('have.text', 'Do you contribute to an HSA, FSA, or another kind of "cafeteria plan"?*').and('be.visible')
            cy.get('[data-testid=contributeToCafeteriaPlan1-label]').click()
            cy.get('[data-testid="jobs.1.contributeToCafeteriaPlanHelpTip"]').should('be.visible').click()
            cy.get('[data-testid=cafeteriaPlanToolTipHeading1]').should('have.text', 'Types of "Cafeteria Plans"').and('be.visible')
            cy.get('[data-testid=cafeteriaPlanToolTipParagraph1]').should('have.text', content.ToolTip.cafeteriaPlanToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="jobs.1.contributeToCafeteriaPlanHelpTip"]').should('be.visible').click()
            cy.get('[data-testid=cafeteriaPlanToolTipHeading1]').should('be.not.visible')
            // verify yes and no is visible
            cy.get('[data-testid=contributeToCafeteriaPlan1-label]').click()
            cy.get('[data-testid=contributeToCafeteriaPlan1-input-no]').click()

            // End of flow as of now

            // PAST JOB FLOW
            cy.get('[data-testid=timePeriodOfJob1-input-past]').click()

            // Date Range Question
            cy.get('[data-testid=dateRange1-label]').should('have.text', content.incomeWithholding.dateRangePastPension).and('be.visible')
            cy.get('[id="jobs.1.dateRange.startDate-label"]').should('have.text', 'Start:*').and('be.visible')
            cy.get('[id="jobs.1.dateRange.startDate-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
            cy.get('[id="jobs.1.dateRange.endDate-label"]').should('have.text', content.incomeWithholding.end).and('be.visible')
            cy.get('[id="jobs.1.dateRange.endDate-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.1.dateRange.startDate"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.1.dateRange.endDate"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.1.dateRange.startDateCalenderButton"]').should('be.visible')
            cy.get('[data-testid="jobs.1.dateRange.endDateCalenderButton"]').should('be.visible')
            cy.get('[data-testid="jobs.1.dateRange.startDate"]').type(getNumbersFromDate(getOffsetDateForCalendar(-15))).should('have.value', getOffsetDateForCalendar(-15))
            cy.get('[data-testid="jobs.1.dateRange.endDate"]').type(getNumbersFromDate(getOffsetDateForCalendar(-1))).should('have.value', getOffsetDateForCalendar(-1))

            // Total Payment Pension Payment YTD
            cy.get('[data-testid=dateRange1-label]').click()
            cy.get('[data-testid="wagesYTD1-label"]').should('have.text', content.incomeWithholding.totalPensionYTD).and('be.visible')
            cy.get('[data-testid=wagesYTD1-input]').clear().type('50000').should('have.value', '$50,000')

            // Taxes Paid YTD
            cy.get('[data-testid=taxesYTD1-label]').should('have.text', content.incomeWithholding.pensionTaxesPaidYTD).and('be.visible')
            cy.get('[data-testid=taxesYTD1-input]').clear().type('5000').should('have.value', '$5,000')

            //Fill income number 1
            cy.incomePage('salary', 'allYear', 'monthly', '6000', '60000', '1000', '10000')
            /* Results page pension content tests whc-1654 is in the results.spec updated by the 
            completion of whc-1626 */
        })
    })
})
