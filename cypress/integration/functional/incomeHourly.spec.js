import {getCurrentDateForCalendar, getNumbersFromDate} from '../../fixtures/testsHelper'
/* eslint-disable max-len */

describe('Income and Witholding', () => {
    it('Hourly Flow', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            // Job Type Question
            cy.get('[data-testid=incomeType0-label]').should('have.text', content.incomeWithholding.incomeType).and('be.visible')
            cy.get('[data-testid="jobs.0.incomeTypeHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="incomeTypeToolTipHeading1"]').should('have.text', content.ToolTip.incomeTypeToolTipHeading1).and('be.visible')
            cy.get('[data-testid="incomeTypeToolTipParagraph1"]').should('have.text', content.ToolTip.incomeTypeToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="incomeTypeToolTipParagraph2"]').should('have.text', content.ToolTip.incomeTypeToolTipParagraph2).and('be.visible')
            cy.get('[data-testid="incomeTypeToolTipParagraph3"]').should('have.text', content.ToolTip.incomeTypeToolTipParagraph3).and('be.visible')
            cy.get('[data-testid="incomeTypeToolTipParagraph4"]').should('have.text', content.ToolTip.incomeTypeToolTipParagraph4).and('be.visible')
            cy.get('[data-testid="jobs.0.incomeTypeHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="incomeTypeToolTipHeading1"]').should('be.not.visible')
            cy.get('[data-testid=incomeType0-hourly]').should('have.text', content.incomeWithholding.hourly).and('be.visible')
            cy.get('[data-testid="incomeType0-salary"]').should('have.text', content.incomeWithholding.salary).and('be.visible')
            cy.get('[data-testid="incomeType0-pension"]').should('have.text', content.incomeWithholding.pension).and('be.visible')
            cy.get('[data-testid="incomeType0-ssi"]').should('have.text', content.incomeWithholding.ssi).and('be.visible')
            cy.get('[data-testid="incomeType0-none"]').should('have.text', content.incomeWithholding.none).and('be.visible')
            cy.get('[data-testid="incomeType0-hourly"]').click()

            // Time Period of Job Question
            cy.get('[data-testid="timePeriodOfJob0-label"]').should('have.text', content.incomeWithholding.timePeriodOfJob).and('be.visible')
            cy.get('[data-testid="timePeriodOfJob0-allYear"]').should('have.text', content.incomeWithholding.allYear).and('be.visible')
            cy.get('[data-testid="timePeriodOfJob0-past"]').should('have.text', content.incomeWithholding.past).and('be.visible')
            cy.get('[data-testid="timePeriodOfJob0-future"]').should('have.text', content.incomeWithholding.future).and('be.visible')
            cy.get('[data-testid="timePeriodOfJob0-currentPortion"]').should('have.text', content.incomeWithholding.currentPortion).and('be.visible')

            // ALL YEAR FLOW
            cy.get('[data-testid=timePeriodOfJob0-input-allYear]').click()

            // Pay Frequency Question
            cy.get('[data-testid="payFrequency0-label"]').should('have.text', content.incomeWithholding.payFrequency).and('be.visible')
            cy.get('[data-testid="jobs.0.payFrequencyHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="payFrequencyToolTipHeading1"]').should('have.text', content.ToolTip.payFrequencyToolTipHeading1).and('be.visible')
            cy.get('[data-testid="payFrequencyToolTipParagraph1"]').should('have.text', content.ToolTip.payFrequencyToolTipParagraph1).and('be.visible')
            cy.get('[data-testid="jobs.0.payFrequencyHelpTip"]').should('be.visible').click()
            cy.get('[data-testid="payFrequencyToolTipHeading1"]').should('be.not.visible')
            cy.get('[data-testid="payFrequency0-weekly"]').should('have.text', content.incomeWithholding.weekly).and('be.visible')
            cy.get('[data-testid="payFrequency0-biweekly"]').should('have.text', content.incomeWithholding.biweekly).and('be.visible')
            cy.get('[data-testid="payFrequency0-twiceMonthly"]').should('have.text', content.incomeWithholding.twiceMonthly).and('be.visible')
            cy.get('[data-testid="payFrequency0-monthly"]').should('have.text', content.incomeWithholding.monthly).and('be.visible')
            cy.get('[data-testid="payFrequency0-weekly"]').click() // can select any option here

            // Date of Last Pay Period Question
            cy.get('[id="jobs.0.dateLastPayPeriod-label"]').should('have.text', content.incomeWithholding.dateLastPayPeriod).and('be.visible')
            cy.get('[id="jobs.0.dateLastPayPeriod-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.0.dateLastPayPeriod"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.0.dateLastPayPeriodCalenderButton"]').should('be.visible')
            cy.get('[data-testid="jobs.0.dateLastPayPeriod"]').type(getNumbersFromDate(getCurrentDateForCalendar())).should('have.value', getCurrentDateForCalendar())

            // Pay Statement Options Question
            cy.get('[data-testid=payStatementOptions0-label]').should('have.text', content.incomeWithholding.payStatementOptions).and('be.visible')
            cy.get('[data-testid=payStatementOptions0-lastStatement]').should('have.text', content.incomeWithholding.lastStatement).and('be.visible')
            cy.get('[data-testid=payStatementOptions0-last2To3Statements]').should('have.text', content.incomeWithholding.last2To3Statements).and('be.visible')
            cy.get('[data-testid=payStatementOptions0-lastStatement]').click()

            // End of flow as of now

            // PAST JOB FLOW
            cy.get('[data-testid=timePeriodOfJob0-past]').click()

            // Date Range Question
            cy.get('[for="jobs.0.dateRange"]').should('have.text', content.incomeWithholding.dateRangePast).and('be.visible')
            cy.get('[for="jobs.0.dateRange.startDate"]').should('have.text', content.incomeWithholding.start).and('be.visible')
            cy.get('[id="jobs.0.dateRange.startDate-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
            cy.get('[for="jobs.0.dateRange.endDate"]').should('have.text', content.incomeWithholding.end).and('be.visible')
            cy.get('[id="jobs.0.dateRange.endDate-hint"]').should('have.text', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid=dateRange0-helpTip-button]').should('be.visible').click()
            cy.get('[data-testid=dateRangeToolTipHeading1]').should('have.text', content.ToolTip.dateRangeToolTipHeading1).and('be.visible')
            cy.get('[data-testid=dateRangeToolTipParagraph1]').should('have.text', content.ToolTip.dateRangeToolTipParagraph1Hourly).and('be.visible')
            cy.get('[data-testid=dateRange0-helpTip-button]').should('be.visible').click()
            cy.get('[data-testid=dateRangeToolTipHeading1]').should('be.not.visible')
            cy.get('[data-testid="jobs.0.dateRange.startDate"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.0.dateRange.endDate"]').should('have.attr', 'placeholder', content.datePlaceholder).and('be.visible')
            cy.get('[data-testid="jobs.0.dateRange.startDateCalenderButton"]').should('be.visible')
            cy.get('[data-testid="jobs.0.dateRange.endDateCalenderButton"]').should('be.visible')
            cy.get('[data-testid="jobs.0.dateRange.startDate"]').type('2202021').should('have.value', '02/20/2021')
            // cy.get('[data-testid="jobs.0.dateRange.endDateCalenderButton"]').click()
            // cy.get('[data-testid="jobs.0.dateRange.endDate"]').click()
            // cy.get('[aria-label="Sunday, August 01, 2021"]').click()
            cy.get('[data-testid="jobs.0.dateRange.endDate"]').type('08/01/2021').should('have.value', '08/01/2021')
            // How Frequently Are You Paid Question
            // cy.get('[data-testid=payFrequency-label]').should('be.visible')

            // Date of Last Pay Period Question
            // cy.get('[id="jobs.0.dateLastPayPeriod-label"]').should('be.visible')

            // Pay Statement Options Question
            // cy.get('[data-testid=payStatementOptions-label]').should('be.visible')
        })
    })
})
