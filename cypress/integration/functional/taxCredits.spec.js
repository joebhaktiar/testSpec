import {getCurrentYearString} from '../../fixtures/testsHelper'
/* eslint-disable max-len */

describe('Tax Credits', () => {
      it('Tax Credit Validation', () => {
      cy.get('@contentJSON').then((content) => {
        cy.aboutYouPage('single')
        cy.incomePage('salary', 'allYear', 'monthly', '6000', '60000', '1000', '10000')
        cy.adjustmentsPage()
        cy.deductionsPage()

        // Accordion Title Validation
        cy.get('[data-testid=childCreditsAccordion-trigger]').should('be.visible')
        cy.get('[data-testid=foreignTaxAccordion-trigger]').should('be.visible')
        cy.get('[data-testid=educationalAccordion-trigger]').should('be.visible')
        cy.get('#retirementSavingsAccordionItem-trigger').should('be.visible')
        cy.get('[data-testid=homeOwnerTaxAccordion-trigger]').should('be.visible')
        cy.get('[data-testid=elderlyTaxAccordion-trigger]').should('be.visible')
        cy.get('[data-testid=businessAccordion-trigger]').should('be.visible')
        cy.get('[data-testid=alternativeMinimumCreditAccordion-trigger]').should('be.visible')
        cy.get('[data-testid=energyTaxCreditAccordion-trigger]').should('be.visible')
            // Child and dependent creedit
            cy.get('[data-testid=childCreditsAccordion-trigger]').click()
            cy.get('[data-testid=childTaxCreditHeading]').should('have.text', 'Child Tax Credit').and('be.visible')
            cy.get('[data-testid=childrenAges-label]').should('have.text', content.taxCredits.childCredits+getCurrentYearString()).and('be.visible')
            cy.get('[data-testid=childrenAges-input]').should('be.visible')
            cy.get('[data-testid=childrenAges-input]').type('999').should('have.value', '999').clear()
            cy.get('[data-testid=childrenAges-input]').type('hi$,()15').should('have.value', '15')
            cy.get('[data-testid=addAnotherButton]').should('be.visible')
            // Verify if Child tax credit is in 0 the minus button is disabled
            cy.get('[data-testid=numOfChildDependentCareQC-min]').should('be.disabled')
            // Verify Child tax credit only allows you 10
            for (let i = 4; i < 13; i++) {
                cy.get('[data-testid=addAnotherButton]').click();
                cy.get(`:nth-child(${i}) > [data-testid=childrenAges] > div.inline-block > [data-testid=childrenAges-input]`).type('999').should('have.value', '999').clear()
                cy.get(`:nth-child(${i}) > [data-testid=childrenAges] > div.inline-block > [data-testid=childrenAges-input]`).type('hi$,()16').should('have.value', '16')
                        }
            cy.get('[data-testid=addAnotherButton]').should('be.disabled')
            // Close all the another child extra input fields
            for (let i = 0; i < 9; i++) {
              cy.get('[data-testid=deleteButton1]').click();
            }
            // Verify if Child and dependent tax credit is in 0 the minus button is disabled
            cy.get('[data-testid=numOfEitcQC-min]').should('be.disabled')
            // Verify Child and dependent Tax Credit can only add 10
            for (let i = 0; i < 10; i++) {
                cy.get('[data-testid=numOfChildDependentCareQC-plus]').click();
              }
            cy.get('[data-testid=numOfChildDependentCareQC-plus]').should('be.disabled')
            // Verify EITC can only add 10 children
            for (let i = 0; i < 3; i++) {
                cy.get('[data-testid=numOfEitcQC-plus]').click();
              }
            cy.get('[data-testid=numOfEitcQC-plus]').should('be.disabled')

            cy.get('[data-testid=childDependentCareCreditHeading1]').should('have.text', 'Child and Dependent Care Credit').and('be.visible')
            cy.get('[data-testid=numOfChildDependentCareQC-label]').should('have.text', content.taxCredits.childAndDependentLabel).and('be.visible')
            cy.get('[data-testid=numOfChildDependentCareQC-plus]').should('be.visible')

            cy.get('[data-testid=childDependentCareAmount-label]').should('have.text', content.taxCredits.childAndDependentCareA).and('be.visible')
            cy.get('[data-testid=childDependentCareAmount-input]').type('999999999').should('have.value', '$999,999,999').clear()
            cy.get('[data-testid=childDependentCareAmount-input]').type('hi$,()3000').should('have.value', '$3,000')

            cy.get('[data-testid=eitcHeading1]').should('have.text', 'Earned Income Tax Credit').and('be.visible')
            cy.get('[data-testid=numOfEitcQC-label]').should('have.text', content.taxCredits.eitcLabel).and('be.visible')
            cy.get('[data-testid=numOfEitcQC-plus]').should('be.visible')

            cy.get('[data-testid=adoptionCreditHeading1]').should('have.text', 'Adoption Tax Credit').and('be.visible')
            cy.get('[data-testid=adoptionCreditAmount-label]').should('have.text', content.taxCredits.adoptionCreditLabel).and('be.visible')
            cy.get('[data-testid=adoptionCreditAmount-input]')
            cy.get('[data-testid=adoptionCreditAmount-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=adoptionCreditAmount-input]').type('hi$,()3000').should('have.value', '$3,000')
            // Foreign Tax Credit
            cy.get('[data-testid=foreignTaxAccordion-trigger]').click()
            cy.get('[data-testid=foreignTaxCredit-label]').should('have.text', content.taxCredits.foreignCreditLabel).and('be.visible')
            cy.get('[data-testid=foreignTaxCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=foreignTaxCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
            // Educational
            cy.get('[data-testid=educationalAccordion-trigger]').click()
            cy.get('[data-testid=aotcCreditHeading]').should('have.text', 'American Opportunity Tax Credit').and('be.visible')
            cy.get('[data-testid=numOfStudents-label]').should('have.text', content.taxCredits.aotcStudents).and('be.visible')
               // If No of Students is 0 the minus button shold be disabled
            cy.get('[data-testid=numOfStudents-min]').should('be.disabled')
                        // Verify AOTC can only add 10 students
                        for (let i = 0; i < 10; i++) {
                          cy.get('[data-testid=numOfStudents-plus]').click();
                        }
                        cy.get('[data-testid=numOfStudents-plus]').should('be.disabled')
                // AOTC
            cy.get('[data-testid=aotc-label]').should('have.text', content.taxCredits.aotcLabel).and('be.visible')
            cy.get('[data-testid=aotc-callout]').should('have.text', content.taxCredits.aotcCallout).and('be.visible')
            cy.get('[data-testid=aotc-input]').should('be.visible')
                // LLC
              cy.get('#educationalAccordionItem > .my-4').should('have.text', 'Lifetime Learning Credit').and('be.visible')
              cy.get('[data-testid=llc-label]').should('have.text', content.taxCredits.llcLabel).and('be.visible')
              cy.get('[data-testid=llc-callout]').should('have.text', content.taxCredits.llcCallout).and('be.visible')
              cy.get('[data-testid=llc-input]').should('be.visible')
              cy.get('[data-testid=aotc-input]').type('1000')
              // cy.get('[data-testid=warningBody]').should('not.be.visible')
              cy.get('[data-testid=llc-input]').type('1000')
              cy.get('[data-testid=warningBody]').should('have.text', content.taxCredits.llcWarning).and('be.visible')

            // Retirement
            cy.get('[data-testid=retirementSavingsCredit-label]').should('not.be.visible')
            cy.get('#retirementSavingsAccordionItem-trigger').should('be.visible').click()
            cy.get('[data-testid=retirementSavingsCredit-label]').should('have.text', content.taxCredits.retirementLabel).and('be.visible')
            cy.get('[data-testid=retirementSavingsCredit-input]').clear()
            cy.get('[data-testid=retirementSavingsCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=retirementSavingsCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
            // HomeOwner
            cy.get('[data-testid=homeOwnerTaxAccordion-trigger]').click()
            cy.get('[data-testid=homeOwnerTaxCredit-label]').should('have.text', 'Residential Energy Credit').and('be.visible')
            cy.get('[data-testid=homeOwnerTaxCredit-input]').should('be.visible')
            cy.get('[data-testid=homeOwnerMortgageTaxCredit-label]').should('have.text', content.taxCredits.homeOwnerLabel).and('be.visible')
            cy.get('[data-testid=homeOwnerMortgageTaxCredit-input]').clear()
            cy.get('[data-testid=homeOwnerMortgageTaxCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=homeOwnerMortgageTaxCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
            // Elderly or Disabled
            cy.get('[data-testid=elderlyTaxAccordion-trigger]').click()
            cy.get('[data-testid=elderlyTaxCredit-label]').should('have.text', content.taxCredits.elderlyLabel).and('be.visible')
            cy.get('[data-testid=elderlyTaxCredit-input]').clear()
            cy.get('[data-testid=elderlyTaxCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=elderlyTaxCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
            // Business
            cy.get('[data-testid=businessAccordion-trigger]').click()
            cy.get('[data-testid=businessCredit-label]').should('have.text', 'General business credit').and('be.visible')
            cy.get('[data-testid=businessCredit-input]').clear()
            cy.get('[data-testid=businessCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=businessCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
            // Alternative Minimum Credit
            cy.get('[data-testid=alternativeMinimumCreditAccordion-trigger]').click()
            cy.get('[data-testid=alternativeMinimumCredit-label]').should('have.text', content.taxCredits.alternativeLabel).and('be.visible')
            cy.get('[data-testid=alternativeMinimumCredit-input]').clear()
            cy.get('[data-testid=alternativeMinimumCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=alternativeMinimumCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
            // Energy Efficient Vehicles
            cy.get('[data-testid=energyTaxCreditAccordion-trigger]').click()
            cy.get('[data-testid=energyMotorVehicleTaxCredit-label]').should('have.text', content.taxCredits.energyMotorLabel).and('be.visible')
            cy.get('[data-testid=energyMotorVehicleTaxCredit-input]').clear()
            cy.get('[data-testid=energyMotorVehicleTaxCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=energyMotorVehicleTaxCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
            cy.get('[data-testid=energyRefuelingTaxCredit-label]').should('have.text', content.taxCredits.energyRefuelingLabel).and('be.visible')
            cy.get('[data-testid=energyRefuelingTaxCredit-input]').clear()
            cy.get('[data-testid=energyRefuelingTaxCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=energyRefuelingTaxCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
            cy.get('[data-testid=energyPlugInTaxCredit-label]').should('have.text', content.taxCredits.energyPlugLabel).and('be.visible')
            cy.get('[data-testid=energyPlugInTaxCredit-input]').clear()
            cy.get('[data-testid=energyPlugInTaxCredit-input]').should('be.visible').type('999999999').and('have.value', '$999,999,999')
.clear()
            cy.get('[data-testid=energyPlugInTaxCredit-input]').type('hi$,()3000').should('have.value', '$3,000')
        })
      })
      it('TaxCredit Tool Tips', () => {
        cy.get('@contentJSON').then((content) => {
            cy.aboutYouPage('single')
            cy.incomePage('salary', 'allYear', 'monthly', '6000', '60000', '1000', '10000')
            cy.adjustmentsPage()
            cy.deductionsPage()
            // Verify TaxCredit Tool Tips
              // Child and dependent credits
                // ChildTaxCredit
            cy.get('[data-testid=childCreditsAccordion-trigger]').click()
            cy.get('[data-testid=childrenAges-helpTip-button]').should('be.visible')
            cy.get('[data-testid=childrenAges-helpTip-button]').click()
            cy.get('[data-testid=childrenAgesToolTipHeading1]').should('have.text', content.taxCredits.childTaxCreditToolTipHeading).and('be.visible')
            cy.get('[data-testid=childrenAgesToolTipParagraph1]').should('have.text', content.taxCredits.childTaxCreditToolTip).and('be.visible')
            cy.get('[data-testid=childrenAgesToolTipParagraph2]').should('have.text', content.taxCredits.childTaxCreditToolTip2).and('be.visible')
            // ask mikeala how to verify links
            // cy.get('[data-testid=childrenAgesTT1Link]').should('have.href', content.taxCredits.childTaxCreditToolTipLink).and('be.visible')
                // Child and  Dependent Tax Credit
                cy.get('[testid=numOfChildDependentCareQC-helpTip]').should('be.visible').click()
                cy.get('[data-testid=childDependentCareAmount-helpTip-button]').should('be.visible').click()
                cy.get('[data-testid=numOfChildDependentCareQCToolTipHeading1]').should('have.text', content.taxCredits.childDependentCreditToolTipHeading).and('be.visible')
                cy.get('[data-testid=numOfChildDependentCareQCToolTipParagraph1]').should('have.text', content.taxCredits.childDependentCreditToolTip).and('be.visible')
                cy.get('[data-testid=numOfChildDependentCareQCToolTipParagraph2]').should('have.text', content.taxCredits.childDependentCreditToolTip2).and('be.visible')
                  // Child and dependent tax amount
                  cy.get('[data-testid=childDependentCareAmountToolTipHeading1]').should('have.text', content.taxCredits.childDependentCreditAmopuntToolTipHeading).and('be.visible')
                  cy.get('[data-testid=childDependentCareAmountToolTipParagraph1]').should('have.text', content.taxCredits.childDependentCreditAmopuntToolTip).and('be.visible')
                  cy.get('[data-testid=childDependentCareAmountToolTipParagraph2]').should('have.text', content.taxCredits.childDependentCreditAmopuntToolTip2).and('be.visible')
                // EITC
                cy.get('[testid=numOfEitcQC-helpTip]').click()
                cy.get('[data-testid=numOfEitcQCToolTipHeading1]').should('have.text', content.taxCredits.eitcToolTipHeading).and('be.visible')
                cy.get('[data-testid=numOfEitcQCToolTipParagraph1]').should('have.text', content.taxCredits.eitcToolTipParagraph).and('be.visible')
                cy.get('[data-testid=numOfEitcQCToolTipParagraph2]').should('have.text', content.taxCredits.eitcToolTipParagraph2).and('be.visible')
                cy.get('[data-testid=numOfEitcQCToolTipParagraph3]').should('have.text', content.taxCredits.eitcToolTipParagraph3).and('be.visible')
                cy.get('[data-testid=numOfEitcToolTipList0]').should('have.text', content.taxCredits.eitcToolTipList0).and('be.visible')
                cy.get('[data-testid=numOfEitcToolTipList1]').should('have.text', content.taxCredits.eitcToolTipList1).and('be.visible')
                cy.get('[data-testid=numOfEitcToolTipList2]').should('have.text', content.taxCredits.eitcToolTipList2).and('be.visible')
                cy.get('[data-testid=numOfEitcToolTipList3]').should('have.text', content.taxCredits.eitcToolTipList3).and('be.visible')
                cy.get('[data-testid=numOfEitcQCToolTipParagraph4]').should('have.text', content.taxCredits.eitcToolTipParagraph4).and('be.visible')

                // Adoption Tax Credit
                cy.get('[data-testid=adoptionCreditAmount-helpTip-button]').should('be.visible').click()
                cy.get('[data-testid=adoptionCreditAmountToolTipHeading1]').should('have.text', content.taxCredits.adoptionCreditToolTipHeading).and('be.visible')
                cy.get('[data-testid=adoptionCreditAmountToolTipParagraph1]').should('have.text', content.taxCredits.adoptionCreditToolTip).and('be.visible')
                cy.get('[data-testid=adoptionCreditAmountToolTipParagraph2]').should('have.text', content.taxCredits.adoptionCreditToolTip2).and('be.visible')

                // Foreing
                cy.get('[data-testid=foreignTaxAccordion-trigger]').click()
                cy.get('[data-testid=foreignTaxCredit-helpTip-button]').should('be.visible').click()
                cy.get('[data-testid=foreignTaxCreditToolTipHeading1]')
                cy.get('[data-testid=foreignTaxCreditToolTipParagraph1]')
                // Educational
                cy.get('[data-testid=educationalAccordion-trigger]').click()
                  // AOTC
                  cy.get('[data-testid=aotc-helpTip-button]').should('be.visible').click()
                  cy.get('[data-testid=aotcToolTipHeading1]').should('have.text', content.taxCredits.aotcToolTipHeading).and('be.visible')
                  cy.get('[data-testid=aotcToolTipHParagraph1]').should('have.text', content.taxCredits.aotcToolTip).and('be.visible')
                  // LLC
                  cy.get('[data-testid=llc-helpTip-button]').should('be.visible').click()
                  cy.get('[data-testid=llcToolTipHeading1]').should('have.text', content.taxCredits.llcToolTipHeading).and('be.visible')
                  cy.get('[data-testid=llcToolTipParagraph1]').should('have.text', content.taxCredits.llcToolTip).and('be.visible')
                // RetirementSavings
                cy.get('#retirementSavingsAccordionItem-trigger').should('be.visible').click()
                cy.get('[data-testid=retirementSavingsCredit-helpTip-button]').should('be.visible').click()
                cy.get('[data-testid=retirementSavingsCreditToolTipHeading1]').should('have.text', content.taxCredits.retirementSavingToolTipHeading).and('be.visible')
                cy.get('[data-testid=retirementSavingsCreditToolTipParagraph1]').should('have.text', content.taxCredits.retirementSavingToolTip).and('be.visible')
                // HomeOwner
                cy.get('[data-testid=homeOwnerTaxAccordion-trigger]').click()
                  // Residential
                  cy.get('[data-testid=homeOwnerTaxCredit-helpTip-button]').should('be.visible').click()
                  cy.get('[data-testid=homeOwnerTaxCreditToolTipHeading1]').should('have.text', content.taxCredits.residentialCreditToolTipHeading).and('be.visible')
                  cy.get('[data-testid=homeOwnerTaxCreditToolTipParagraph1]').should('have.text', content.taxCredits.residentialCreditToolTip).and('be.visible')
                  // Mortgage
                  cy.get('[data-testid=homeOwnerMortgageTaxCredit-helpTip-button]').should('be.visible').click()
                  cy.get('[data-testid=homeOwnerMortgageTaxCreditToolTipHeading1]').should('have.text', content.taxCredits.mortgageInterestCreditToolTipHeading).and('be.visible')
                  cy.get('[data-testid=homeOwnerMortgageTaxCreditToolTipParagraph1]').should('have.text', content.taxCredits.mortgageInterestCreditToolTip).and('be.visible')
                // ElderlyorDisabled
                cy.get('[data-testid=elderlyTaxAccordion-trigger]').click()
                cy.get('[data-testid=elderlyTaxCredit-helpTip-button]').should('be.visible').click()
                cy.get('[data-testid=elderlyTaxCreditToolTipHeading1]').should('have.text', content.taxCredits.elderlyCreditToolTipHeader).and('be.visible')
                cy.get('[data-testid=elderlyTaxCreditToolTipParagraph1]').should('have.text', content.taxCredits.elderlyCreditToolTip).and('be.visible')
                // Business
                cy.get('[data-testid=businessAccordion-trigger]').click()
                cy.get('[data-testid=businessCredit-helpTip-button]').should('be.visible').click()
                cy.get('[data-testid=businessCreditToolTipHeading1]').should('have.text', content.taxCredits.businessCreditToolTipHeader).and('be.visible')
                cy.get('[data-testid=businessCreditToolTipParagraph1]').should('have.text', content.taxCredits.businessCreditToolTip).and('be.visible')
                // AlternativeMinimumCredit
                cy.get('[data-testid=alternativeMinimumCreditAccordion-trigger]').click()
                cy.get('[data-testid=alternativeMinimumCredit-helpTip-button]').should('be.visible').click()
                cy.get('[data-testid=alternativeMinimumCreditToolTipHeading1]').should('have.text', content.taxCredits.alternativeMinimumCreditToolTipHeader).and('be.visible')
                cy.get('[data-testid=alternativeMinimumCreditToolTipParagraph1]').should('have.text', content.taxCredits.alternativeMinimumCreditToolTip).and('be.visible')
                // EnergyEfficientehicles
                cy.get('[data-testid=energyTaxCreditAccordion-trigger]').click()
                  // Motor
                  cy.get('[data-testid=energyMotorVehicleTaxCredit-helpTip-button]').should('be.visible').click()
                  cy.get('[data-testid=energyMotorVehicleTaxCreditToolTipHeading1]').should('have.text', content.taxCredits.energyMotorToolTipHeader).and('be.visible')
                  cy.get('[data-testid=energyMotorVehicleTaxCreditToolTipParagraph1]').should('have.text', content.taxCredits.energyMotorToolTip).and('be.visible')
                  // Fuel
                  cy.get('[data-testid=energyRefuelingTaxCredit-helpTip-button]').should('be.visible').click()
                  cy.get('[data-testid=energyRefuelingTaxCreditToolTipHeading1]').should('have.text', content.taxCredits.energyRefuelingToolTipHeader).and('be.visible')
                  cy.get('[data-testid=energyRefuelingTaxCreditToolTipParagraph1]').should('have.text', content.taxCredits.energyRefuelingToolTip).and('be.visible')
                  // Plug-in
                  cy.get('[data-testid=energyPlugInTaxCredit-helpTip-button]').should('be.visible').click()
                  cy.get('[data-testid=energyPlugInTaxCreditToolTipHeading1]').should('have.text', content.taxCredits.energyPlugToolTipHeader).and('be.visible')
                  cy.get('[data-testid=energyPlugInTaxCreditToolTipParagraph1]').should('have.text', content.taxCredits.energyPlugToolTip).and('be.visible')
          })
        })
    })
