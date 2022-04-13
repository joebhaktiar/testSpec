import {getCurrentDateForCalendar, getNumbersFromDate, incomeToDateMonthly, getOffsetDateForCalendar, salaryYearIncome} from '../../fixtures/testsHelper'
/* eslint-disable max-len */

describe('Income and Witholding', () => {
        it('Salary Flow', () => {
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
                        cy.get('[data-testid=incomeType0-none]').should('have.text', content.incomeWithholding.none).and('be.visible')
                        cy.get('[data-testid=incomeType0-salary]').click()
                        //

                        // Time Period of Job Question
                        cy.get('[data-testid=timePeriodOfJob0-label]').should('have.text', content.incomeWithholding.timePeriodOfJob).and('be.visible')
                        cy.get('[data-testid=timePeriodOfJob0-allYear]').should('have.text', content.incomeWithholding.allYear).and('be.visible')
                        cy.get('[data-testid=timePeriodOfJob0-past]').should('have.text', content.incomeWithholding.past).and('be.visible')
                        cy.get('[data-testid=timePeriodOfJob0-future]').should('have.text', content.incomeWithholding.future).and('be.visible')
                        cy.get('[data-testid=timePeriodOfJob0-currentPortion]').should('have.text', content.incomeWithholding.currentPortion).and('be.visible')

                        // ALL YEAR FLOW
                        cy.get('[data-testid=timePeriodOfJob0-allYear]').click()

                        // Pay Frequency Question
                        cy.get('[data-testid=payFrequency0-label]').should('have.text', content.incomeWithholding.payFrequency).and('be.visible')
                        cy.get('[data-testid=payFrequency0-label]').click()
                        cy.get('[data-testid="jobs.0.payFrequencyHelpTip"]').should('be.visible').click()
                        cy.get('[data-testid=payFrequencyToolTipHeading1]').should('have.text', content.ToolTip.payFrequencyToolTipHeading1).and('be.visible')
                        cy.get('[data-testid=payFrequencyToolTipParagraph1]').should('have.text', content.ToolTip.payFrequencyToolTipParagraph1).and('be.visible')
                        cy.get('[data-testid="jobs.0.payFrequencyHelpTip"]').should('be.visible').click()
                        cy.get('[data-testid=payFrequencyToolTipHeading1]').should('be.not.visible')
                        cy.get('[data-testid=payFrequency0-weekly]').should('have.text', content.incomeWithholding.weekly).and('be.visible')
                        cy.get('[data-testid=payFrequency0-biweekly]').should('have.text', content.incomeWithholding.biweekly).and('be.visible')
                        cy.get('[data-testid=payFrequency0-twiceMonthly]').should('have.text', content.incomeWithholding.twiceMonthly).and('be.visible')
                        cy.get('[data-testid=payFrequency0-monthly]').should('have.text', content.incomeWithholding.monthly).and('be.visible')
                        cy.get('[data-testid=payFrequency0-monthly]').click() // can select any option here

                        // Date of Last Pay Period Question
                        cy.get('[id="jobs.0.dateLastPayPeriod-label"]').should('have.text', content.incomeWithholding.dateLastPayPeriod).and('be.visible')
                        cy.get('[id="jobs.0.dateLastPayPeriod-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
                        cy.get('[data-testid="jobs.0.dateLastPayPeriod"]').type(getNumbersFromDate(getCurrentDateForCalendar())).should('have.value', getCurrentDateForCalendar())
                        cy.get('[data-testid=wagesPerPayPeriod0-label]').should('have.text', content.incomeWithholding.salaryWagesPPP).and('be.visible')
                        cy.get('[data-testid=wagesPerPayPeriod0-input]').type('5000').should('have.value', '$5,000')
                        cy.get('[data-testid=wagesYTD0-label]').should('have.text', content.incomeWithholding.salaryWagesYTD).and('be.visible')
                        cy.get('[data-testid=wagesYTD0-input]').type(incomeToDateMonthly(5000)).should('have.value', '$10,000')
                        // Does This Amount Look Correct Question
                        cy.get('[data-testid=isIncomeAmountCorrect0-label]').should('have.text', salaryYearIncome(content.incomeWithholding.salaryisIncomeCorrect, 5000, 12)).and('be.visible')
                        cy.get('[data-testid=isIncomeAmountCorrect0-label]').click()
                        cy.get('[data-testid=isIncomeAmountCorrect0-input-yes]').click()
                        cy.get('[data-testid=taxesPerPayPeriod0-label]').should('have.text', content.incomeWithholding.taxesPerPayPeriod).and('be.visible')
                        cy.get('[data-testid=taxesPerPayPeriod0-input]').type('300').should('have.value', '$300')
                        cy.get('[data-testid=taxesYTD0-label]').should('have.text', content.incomeWithholding.taxesYTD).and('be.visible')
                        cy.get('[data-testid=taxesYTD0-input]').type('3000').should('have.value', '$3,000')
                        // End of flow as of now

                        // PAST JOB FLOW
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
                        cy.get('[data-testid=incomeType0-none]').should('have.text', content.incomeWithholding.none).and('be.visible')
                        cy.get('[data-testid=incomeType0-salary]').click()

                        // PAST JOB FLOW
                        cy.get('[data-testid="timePeriodOfJob0-past"]').click()

                        // Date Range Question
                        cy.get('[for="jobs.0.dateRange"]').should('have.text', content.incomeWithholding.dateRange).and('be.visible')
                        cy.get('[for="jobs.0.dateRange.startDate"]').should('have.text', content.incomeWithholding.start).and('be.visible')
                        cy.get('[id="jobs.0.dateRange.startDate-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
                        cy.get('[for="jobs.0.dateRange.endDate"]').should('have.text', content.incomeWithholding.end).and('be.visible')
                        cy.get('[id="jobs.0.dateRange.endDate-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
                        cy.get('[data-testid=dateRange0-helpTip-button]').should('be.visible').click()
                        cy.get('[data-testid=dateRangeToolTipHeading1]').should('have.text', content.ToolTip.dateRangeToolTipHeading1).and('be.visible')
                        cy.get('[data-testid=dateRangeToolTipParagraph1]').should('have.text', content.ToolTip.dateRangeToolTipParagraph1Salary).and('be.visible')
                        cy.get('[data-testid=dateRangeToolTipParagraph2]').should('have.text', content.ToolTip.dateRangeToolTipParagraph2Salary).and('be.visible')
                        cy.get('[data-testid=dateRange0-helpTip-button]').should('be.visible').click()
                        cy.get('[data-testid=dateRangeToolTipHeading1]').should('be.not.visible')
                        cy.get('[data-testid="jobs.0.dateRange.startDate"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
                        cy.get('[data-testid="jobs.0.dateRange.endDate"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
                        cy.get('[data-testid="jobs.0.dateRange.startDateCalenderButton"]').should('be.visible')
                        cy.get('[data-testid="jobs.0.dateRange.endDateCalenderButton"]').should('be.visible')
                        cy.get('[data-testid="jobs.0.dateRange.startDate"]').type(getNumbersFromDate(getOffsetDateForCalendar(-15))).should('have.value', getOffsetDateForCalendar(-15))
                        cy.get('[data-testid="jobs.0.dateRange.endDate"]').type(getNumbersFromDate(getOffsetDateForCalendar(-1))).should('have.value', getOffsetDateForCalendar(-1))

                        // Total Wages Earned this Year CHECK
                        cy.get('[data-testid=dateRange0-label]').click()
                        cy.get('[data-testid="wagesYTD0-label"]').should('have.text', content.incomeWithholding.salaryWagesPastYTD).and('be.visible')
                        cy.get('[data-testid=dateRange0-label]').click()
                        cy.get('[data-testid="wagesYTD0-input"]').clear().type('50000').should('have.value', '$50,000')

                        // Taxes Paid YTD CHECKKKKK
                        cy.get('[data-testid=taxesYTD0-label]').should('have.text', content.incomeWithholding.salaryTaxesPastYTD).and('be.visible')
                        cy.get('[data-testid="wagesYTD0-input"]').clear().type('5000').should('have.value', '$5,000')
                })
        })
})
