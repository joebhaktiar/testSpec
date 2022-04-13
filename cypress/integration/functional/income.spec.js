import {getCurrentDateForCalendar, getNumbersFromDate} from '../../fixtures/testsHelper'

/* eslint-disable max-len */

describe('Income and Witholding', () => {
    it('Defualt', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            // Verify Title
            cy.get('[data-testid=incomeWithholdingTitle]').should('have.text', content.incomeWithholding.title).and('be.visible')
            // verify Subtitle
            cy.get('[data-testid=incomeWithholdingSubtitle]').should('have.text', content.incomeWithholding.subtitle).and('be.visible')
            // Required
            cy.get('[data-testid=reqText]').should('have.text', content.incomeWithholding.req).and('be.visible')
            // Number of jobs
            cy.get('[data-testid=numOfJobs-label]').should('have.text', content.incomeWithholding.numJobs).and('be.visible')
            // TODO counter, accordian, other types of income all display
            // Back and Next buttons
            cy.get('[data-testid=backButton]').should('be.enabled').and('be.visible')
            cy.get('[data-testid=nextButton]').should('be.enabled').and('be.visible')
        })
    })

    it('Other Source of income', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            cy.get(':nth-child(1) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', content.incomeWithholding.scholarshipLabel).and('be.visible')
            cy.get(':nth-child(2) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', content.incomeWithholding.unemploymentabel).and('be.visible')
            cy.get(':nth-child(3) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', content.incomeWithholding.selfEmploymentLabel).and('be.visible')
            cy.get(':nth-child(4) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', content.incomeWithholding.investmentLabel).and('be.visible')
            cy.get(':nth-child(5) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', content.incomeWithholding.otherTaxableLabel).and('be.visible')
            cy.get(':nth-child(6) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', content.incomeWithholding.otherTaxesWithheldLabel).and('be.visible')
            // cy.get(':nth-child(7) > .mt-1 > .flex > .MuiFormControlLabel-root > .ml-3').should('have.text', content.incomeWithholding.planningTaxesWithheldLabel).and('be.visible')
            cy.get('[data-testid=none] > .ml-4').should('have.text', content.incomeWithholding.dontHaveOtherTaxesLabel).and('be.visible')
        })
    })
    it('Other Source of income tooltips', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            cy.get('[data-testid=scholarship-helpTip] > .svg-inline--fa').click()
            cy.get('[data-testid=scholarshipToolTipHeading1]').should('have.text', content.incomeWithholding.scholarshipToolTipHeading1).and('be.visible')
            cy.get('[data-testid=scholarshipToolTipParagraph1]').should('have.text', content.incomeWithholding.scholarshipToolTipParagraph1).and('be.visible')
            cy.get('[data-testid=scholarshipToolTipParagraph2]').should('have.text', content.incomeWithholding.scholarshipToolTipParagraph2).and('be.visible')
            cy.get('[data-testid=scholarshipToolTipList0]').should('have.text', content.incomeWithholding.scholarshipToolTipList0).and('be.visible')
            cy.get('[data-testid=scholarshipToolTipList1]').should('have.text', content.incomeWithholding.scholarshipToolTipList1).and('be.visible')
            
            // cy.get('[data-testid=incomeWithholdingScholarshipTT3Paragraph]').should('have.attr', 'href', 'https://www.irs.gov/taxtopics/tc421')
            // cy.get('[data-testid=incomeWithholdingScholarshipTT1Link]').should('have.attr', 'href', 'https://www.irs.gov/taxtopics/tc421')
            cy.get('[data-testid=incomeWithholdingScholarshipTT3Paragraph]').should('have.text', content.incomeWithholding.incomeWithholdingScholarshipTT3Paragraph).and('be.visible')

            cy.get('[data-testid=selfEmployment-helpTip] > .svg-inline--fa').click()
            cy.get('[data-testid=selfEmploymentToolTipHeading1]').should('have.text', content.incomeWithholding.selfEmploymentToolTipHeading1).and('be.visible')
            cy.get('[data-testid=selfEmploymentToolTipParagraph1]').should('have.text', content.incomeWithholding.selfEmploymentToolTipParagraph1).and('be.visible')
            cy.get('[data-testid=incomeWithholdingSelfEmploymentTT2Paragraph]').should('have.text', content.incomeWithholding.incomeWithholdingSelfEmploymentTT2Paragraph).and('be.visible')

            cy.get('[data-testid=investments-helpTip] > .svg-inline--fa').click()
            cy.get('[data-testid=investmentsToolTipHeading1]').should('have.text', content.incomeWithholding.investmentsToolTipHeading1).and('be.visible')
            cy.get('[data-testid=investmentsToolTipParagraph1]').should('have.text', content.incomeWithholding.investmentsToolTipParagraph1).and('be.visible')
            cy.get('[data-testid=incomeWithholdingInvestmentsTT2Paragraph]').should('have.text', content.incomeWithholding.incomeWithholdingInvestmentsTT2Paragraph).and('be.visible')

            cy.get('[data-testid=otherTaxableIncome-helpTip] > .svg-inline--fa').click() 
            cy.get('[data-testid=otherTaxableIncomeToolTipHeading1]').should('have.text', content.incomeWithholding.otherTaxableIncomeToolTipHeading1).and('be.visible')
            cy.get('[data-testid=otherTaxableIncomeToolTipParagraph1]').should('have.text', content.incomeWithholding.otherTaxableIncomeToolTipParagraph1).and('be.visible')
            cy.get('[data-testid=incomeWithholdingOtherTaxableIncomeTT2Paragraph]').should('have.text', content.incomeWithholding.incomeWithholdingOtherTaxableIncomeTT2Paragraph).and('be.visible')

           cy.get('[data-testid=otherTaxes-helpTip] > .svg-inline--fa').click()
           cy.get('[data-testid=otherTaxesToolTipHeading1]').should('have.text', content.incomeWithholding.otherTaxesToolTipHeading1).and('be.visible')
           cy.get('[data-testid=otherTaxesToolTipParagraph1]').should('have.text', content.incomeWithholding.otherTaxesToolTipParagraph1).and('be.visible')
        })
    })

    it('Select any that apply tooltips', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            cy.get('[data-testid=incomeType0-input-salary]').click()
            cy.get('[data-testid=timePeriodOfJob0-allYear]').click()
            cy.get('[data-testid=payFrequency0-input-monthly]').click()
            cy.get('[data-testid=payFrequency0-input-monthly]').click()
            cy.get('[data-testid="jobs.0.dateLastPayPeriod"]').type(getNumbersFromDate(getCurrentDateForCalendar())).should('have.value', getCurrentDateForCalendar())
            cy.get('[data-testid=wagesPerPayPeriod0-input]').type('5000').should('have.value', '$5,000')
            cy.get('[data-testid=wagesYTD0-input]').type('50000').should('have.value', '$50,000')
            cy.get('[data-testid=isIncomeAmountCorrect0-label]').click()
            cy.get('[data-testid=isIncomeAmountCorrect0-input-yes]').click()
            cy.get('[data-testid=taxesPerPayPeriod0-input]').type('300').should('have.value', '$300')
            cy.get('[data-testid=taxesYTD0-input]').type('3000').should('have.value', '$3,000')

                            // Select Any that Apply tooltips
                            cy.get('[data-testid=timePeriodOfJob0-allYear]').click()
                            cy.get('[data-testid=retirement0-helpTip] > .svg-inline--fa').eq(0).should('be.visible').click()
                            cy.get('[data-testid=retirementToolTipHeading1]').should('have.text', 'Tax-Deferred Retirement Plan').and('be.visible')
                            cy.get('[data-testid=retirementToolTipParagraph1]').should('have.text', content.ToolTip.retirementToolTipParagraph1).and('be.visible')
                            cy.get('[data-testid=retirementToolTipList0]').should('have.text', content.ToolTip.retirementToolTipList0).and('be.visible')
                            cy.get('[data-testid=retirementToolTipList1]').should('have.text', content.ToolTip.retirementToolTipList1).and('be.visible')
                            cy.get('[data-testid=retirementToolTipList2]').should('have.text', content.ToolTip.retirementToolTipList2).and('be.visible')
                            cy.get('[data-testid=retirementToolTipList3]').should('have.text', content.ToolTip.retirementToolTipList3).and('be.visible')
                            cy.get('[data-testid=retirementToolTipList4]').should('have.text', content.ToolTip.retirementToolTipList4).and('be.visible')
                            cy.get('[data-testid=retirementToolTipList5]').should('have.text', content.ToolTip.retirementToolTipList5).and('be.visible')
                            cy.get('[data-testid=retirementToolTipList6]').should('have.text', content.ToolTip.retirementToolTipList6).and('be.visible')
                            // cy.get('[data-testid=contributionsAndBonusesHelpTip]').eq(0).should('be.visible').click()
                            cy.get('[data-testid=cafeteriaPlan0-helpTip] > .svg-inline--fa').should('be.visible').click()
                            cy.get('[data-testid=cafeteriaPlanToolTipHeading1]').should('have.text', 'Types of "Cafeteria Plans"').and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipParagraph1]').should('have.text', content.ToolTip.cafeteriaPlanToolTipParagraph1).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList0]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList0).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList1]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList1).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList2]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList2).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList3]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList3).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList4]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList4).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList5]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList5).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList6]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList6).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList7]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList7).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList8]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList8).and('be.visible')
                            cy.get('[data-testid=cafeteriaPlanToolTipList9]').should('have.text', content.ToolTip.cafeteriaPlanToolTipList9).and('be.visible')
                            // cy.get('[data-testid=contributionsAndBonusesHelpTip]').eq(1).should('be.visible').click()
                            cy.get('[data-testid=bonusFuture0-helpTip] > .svg-inline--fa').should('be.visible').click()
                            cy.get('[data-testid=bonusToolTipHeading1]').should('have.text', content.ToolTip.bonusToolTipHeading1).and('be.visible')
                            cy.get('[data-testid=bonusToolTipParagraph1]').should('have.text', content.ToolTip.bonusToolTipParagraph1).and('be.visible')
                            cy.get('[data-testid=bonusToolTipParagraph]').should('have.text', content.ToolTip.bonusToolTipParagraph).and('be.visible')
                            // cy.get('[data-testid=contributionsAndBonusesHelpTip]').eq(2).should('be.visible').click()
                        })
                    })
    // TODO completed test
})
