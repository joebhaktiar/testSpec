/* eslint-disable max-len */
import { last } from 'lodash';
import XLSX from 'xlsx'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

let rowsLength;
let columnLength;
let lastrow;

const cyWait = () => {
  cy.wait(5000);
}

let checkForNullValue = (dataValue, customFunction, falseCase) => {
  const datatype = typeof dataValue;
  let notnullFlag = false;
  if (datatype === 'object') {
    dataValue.forEach(element => {
      if (element !== null && element !== undefined && element !== '') {
        notnullFlag = true;
      }
    });
  }
  else if (dataValue !== null && dataValue !== undefined && dataValue !== '') {
    notnullFlag = true;
  }
  if (notnullFlag) {
    customFunction();
  }
  else if (falseCase !== undefined) {
    falseCase();
  }
}

const setResultData = (resultValue) => {

  if (resultValue !== null && resultValue !== "") {
    const datatype = typeof resultValue;
    if (datatype == "string") {
      const resultValueTrim = resultValue.replace(",", "").replace("$", "")
      if (!isNaN(resultValueTrim)) {
        return resultValue;
      }
    } else if (datatype == 'number') {
      return resultValue;
    }
  }
  return "";
}
//Current Formated Date Excel Result
const getFileName = () => {
  const date = new Date();
  const year = date.getFullYear(),
    month = date.getMonth() + 1, // months are zero indexed
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    monthFormatted = month < 10 ? "0" + month : month,
    dayFormatted = day < 10 ? "0" + day : day,
    hourFormatted = hour < 10 ? "0" + hour : hour,
    minuteFormatted = minute < 10 ? "0" + minute : minute;
  return `${year}-${monthFormatted}-${dayFormatted}-${hourFormatted}-${minuteFormatted}-${second}-results.xlsx`;

}

describe('Test Scenarios Comparison', () => {
  // eslint-disable-next-line no-undef
  before(() => {
    cy.task('readXlsx', { file: 'cypress/fixtures/TestScenariosInputData.xlsm', sheet: 'TWEScenarios' }).then((rows) => {
      rowsLength = rows.length;
      lastrow = (rowsLength - 1)
      cy.log('last row ', lastrow)
      cy.writeFile('cypress/fixtures/xlsxData.json', { rows })
      cy.writeFile('cypress/fixtures/Results.json', '')
      cy.writeFile('cypress/fixtures/Results.json', '[')
    })
    // cy.visit(Cypress.config('baseURL'));
    // cy.visit('http://localhost:3900/app/tax-withholding-estimator/')
  })
  it('Test Scenarios', () => {
    cy.get('@contentJSON').then((content) => {
      cy.fixture('xlsxData').then((data) => {
        for (let i = 0; i < rowsLength; i++) {
          const localhost = 'http://localhost:3900/app/tax-withholding-estimator/'
          const tweDev = 'https://twe-frontend-bucket-dev.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
          const actcSit = 'https://twe-frontend-bucket-sit.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
          const actcEITE = 'https://twe-frontend-bucket-eite.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
          const actcPete = 'https://twe-frontend-bucket-pete.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
          const actcPerf = 'https://cloudapps.perf.irs.gov/app/tax-withholding-estimator'
          const actcProd = 'https://twe-frontend-bucket-prod.s3-us-gov-west-1.amazonaws.com/app/tax-withholding-estimator/index.html'
          const actcLive = 'https://apps.irs.gov/app/tax-withholding-estimator'
          cy.visit(localhost)
          cy.clock().invoke('restore')
          // Date
          cy.clock(Date.UTC(2022, 11, 1), ['Date'])

          cy.get(`[data-testid="filingStatus-${data.rows[i].FilingStatus}"]`).click();
          cy.get('[data-testid="jobOrPension-yes"]').click()
          if (data.rows[i].planToClaimDependents == 'Yes') {
            cy.get('[data-testid=demographicsCheckboxGroup]').click()
            cy.get('[data-testid=willClaimDependents]').click()
          }
          cy.get('[data-testid="nextButton"]').click()
          // Income Page
          // for (let n = 0; n < data.rows[i].numberOfJobs; n++) {
          let numOfJobs = data.rows[i].numberOfJobs;
          for (let k = 1; k < numOfJobs; k++) {
            cyWait();
            cy.get('[data-testid=numOfJobs-plus]').click();
          }
          for (let k = 1; k < numOfJobs; k++) {
            let jobNum = "job" + (k + 1);
            cy.get(`[id=${jobNum}-trigger]`).click();
          }

          for (let j = 1; j <= numOfJobs; j++) {
            // Variable initialization
            let incomeTypeNum = "incomeType" + j;
            let timePeriodOfJobNum = "timePeriodOfJob" + j;
            let payFrequencyNum = "payFrequency" + j;
            let recentPayPeriodNum = "recentPayPeriod" + j;
            let wagesPerPeriodNum = "wagesPerPeriod" + j;
            let wagesYTDNum = "wagesYTD" + j;
            let isThisCorrectNum = "isThisCorrect" + j;
            let annualIncomeManualNum = "annualIncomeManual" + j;
            let taxesPerPeriodNum = "taxesPerPeriod" + j;
            let taxesYTDNum = "taxesYTD" + j;
            let presentStartDateNum = "presentStartDate" + j;
            let presentEndDateNum = "presentEndDate" + j;
            let futureStartDateNum = "presentStartDate" + j;
            let futureEndDateNum = "presentEndDate" + j;
            let pastStardDateNum = "pastStardDate" + j;
            let pastEndDateNum = "pastEndDate" + j;
            let pastYTDNum = "pastYTD" + j;
            let pastTaxesYTDNum = "pastTaxesYTD" + j;

            // Salary
            if (data.rows[i][incomeTypeNum] == 'salary') {

              cy.get(`[data-testid="incomeType${j - 1}-input-${data.rows[i][incomeTypeNum]}"]`).click()
              // All Year
              if (data.rows[i][timePeriodOfJobNum] == 'allYear') {
                cy.get(`[data-testid="timePeriodOfJob${j - 1}-input-${data.rows[i][timePeriodOfJobNum]}"]`).click()
                cy.get(`[data-testid="payFrequency${j - 1}-input-${data.rows[i][payFrequencyNum]}"]`).click()
                cy.get(`[data-testid="jobs.${j - 1}.dateLastPayPeriod"]`).type(data.rows[i][recentPayPeriodNum])
                cy.get(`[data-testid=wagesPerPayPeriod${j - 1}-input]`).type(data.rows[i][wagesPerPeriodNum])
                cy.get(`[data-testid=wagesYTD${j - 1}-input]`).type(data.rows[i][wagesYTDNum])
                if (data.rows[i][isThisCorrectNum] == 'no') {
                  cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
                  cy.get(`[data-testid=correctedWages${j - 1}-input]`).type(data.rows[i][annualIncomeManualNum])
                }
                else {
                  cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
                }
                cy.get(`[data-testid=taxesPerPayPeriod${j - 1}-input]`).type(`${data.rows[i][taxesPerPeriodNum]}`)
                cy.get(`[data-testid=taxesYTD${j - 1}-input]`).type(`${data.rows[i][taxesYTDNum]}`)
              }
              // Present
              if (data.rows[i][timePeriodOfJobNum] == 'currentPortion') {
                cy.get(`[data-testid="timePeriodOfJob${j - 1}-input-${data.rows[i][timePeriodOfJobNum]}"]`).click()
                cy.get(`[data-testid="jobs.${j - 1}.dateRange.startDate"]`).type(data.rows[i][presentStartDateNum])
                cy.get(`[data-testid="jobs.${j - 1}.dateRange.endDate"]`).type(data.rows[i][presentEndDateNum]);
                cy.get(`[data-testid=dateRange${j - 1}-label]`).click()
                cy.get(`[data-testid="payFrequency${j - 1}-input-${data.rows[i][payFrequencyNum]}"]`).click()
                cy.get(`[data-testid="jobs.${j - 1}.dateLastPayPeriod"]`).type(data.rows[i][recentPayPeriodNum])
                cy.get(`[data-testid=wagesPerPayPeriod${j - 1}-input]`).type(data.rows[i][wagesPerPeriodNum])
                cy.get(`[data-testid=wagesYTD${j - 1}-input]`).type(data.rows[i][wagesYTDNum])
                cy.get(`[data-testid=taxesYTD${j - 1}-input]`).type(`${data.rows[i][taxesYTDNum]}`)

                if (data.rows[i][isThisCorrectNum] == 'no') {
                  cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
                  cy.get(`[data-testid=correctedWages${j - 1}-input]`).type(data.rows[i][annualIncomeManualNum])
                }
                else {
                  cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
                }
                cy.get(`[data-testid=taxesPerPayPeriod${j - 1}-input]`).type(`${data.rows[i][taxesPerPeriodNum]}`)
                cy.get(`[data-testid=taxesYTD${j - 1}-input]`).type(`${data.rows[i][taxesYTDNum]}`)
              }

              // Past
              if (data.rows[i][timePeriodOfJobNum] == 'past') {

                cy.get(`[data-testid=incomeType${j - 1}-input-${data.rows[i][incomeTypeNum]}]`).last().click()
                cy.get(`[data-testid=timePeriodOfJob${j - 1}-input-${data.rows[i][timePeriodOfJobNum]}]`).last().click()
                cy.get(`[data-testid="jobs.${j - 1}.dateRange.startDate"]`).type(data.rows[i][pastStardDateNum])
                cy.get(`[data-testid="jobs.${j - 1}.dateRange.endDate"]`).type(data.rows[i][pastEndDateNum])
                cy.get('[for="otherIncome"]').click()
                cy.get(`[data-testid=wagesYTD${j - 1}-input]`).type(data.rows[i][pastYTDNum])
                cy.get(`[data-testid=taxesYTD${j - 1}-input]`).type(data.rows[i][pastTaxesYTDNum])
              }
              // Future
              if (data.rows[i][timePeriodOfJobNum] == 'future') {

                cy.get(`[data-testid=incomeType${j - 1}-input-${data.rows[i][incomeTypeNum]}]`).last().click()
                cy.get(`[data-testid=timePeriodOfJob${j - 1}-input-${data.rows[i][timePeriodOfJobNum]}]`).last().click()
                cy.get(`[data-testid="jobs.${j - 1}.dateRange.startDate"]`).type(data.rows[i][futureStartDateNum])
                cy.get(`[data-testid="jobs.${j - 1}.dateRange.endDate"]`).type(data.rows[i][futureEndDateNum])
                cy.get(`[data-testid=dateRange${j - 1}-label]`).click()
                checkForNullValue(data.rows[i][payFrequencyNum], () => {
                  cy.get(`[data-testid="payFrequency${j - 1}-input-${data.rows[i][payFrequencyNum]}"]`).click()
                })
                cy.get(`[data-testid=annualSalary${j - 1}-input]`).type(data.rows[i][wagesYTDNum])

                if (data.rows[i][isThisCorrectNum] == 'no') {
                  cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
                  cy.get(`[data-testid=correctedWages${j - 1}-input]`).last().type(data.rows[i][annualIncomeManualNum])
                }
                else {
                  cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
                }
              }
            }
            // Social Security Income
            else if (data.rows[i][incomeTypeNum] == 'ssi') {

              cy.get(`[data-testid=incomeType${j}-input-ssi]`).click()
              // cy.get(`[data-testid=ssiAllYear${j}-label]`).click()
              cy.get(`[data-testid=ssiAllYear${j}-input-yes]`).click()
              cy.get(`[data-testid=ssiMonthlyAmount${j}-input]`).type(data.rows[i][ssiTotalAmountBeforeTaxes])
              cy.get(`[data-testid=taxesYTD${j}-input]`).type(data.rows[i][ssiFederalIncomeTaxesWithheldYTD])
              cy.get(`[data-testid=taxesPerPayPeriod${j}-input]`).type(data.rows[i][ssiTotalFederalIncomWithheldPP])
            }

            // hourly - Not implemented yet
            // else if (data.rows[i][incomeTypeNum] == 'hourly') {
            //   cy.get(`[data-testid="incomeType${j - 1}-input-${data.rows[i][incomeTypeNum]}"]`).click();
            //   // All Year
            //   if (data.rows[i][timePeriodOfJobNum] == 'allYear') {
            //     cy.get(`[data-testid="timePeriodOfJob${j - 1}-input-${data.rows[i][timePeriodOfJobNum]}"]`).click()
            //     cy.get(`[data-testid=payFrequency${j - 1}-label]`).should('be.visible').click()
            //     cy.get(`[data-testid="payFrequency${j - 1}-input-${data.rows[i][payFrequencyNum]}"]`).click()
            //     cy.get(`[data-testid="jobs.${j - 1}.dateLastPayPeriod"]`).type(data.rows[i][recentPayPeriodNum])
            //     cy.get(`[data-testid=wagesPerPayPeriod${j - 1}-input]`).type(data.rows[i][wagesPerPeriodNum])
            //     cy.get(`[data-testid=wagesYTD${j - 1}-input]`).type(data.rows[i][wagesYTDNum])

            //     if (data.rows[i][isThisCorrectNum] == 'no') {
            //       cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //       cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //       cy.get(`[data-testid=correctedWages${j - 1}-input]`).type(data.rows[i][annualIncomeManualNum])
            //     }
            //     cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //     cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //     cy.get(`[data-testid=taxesPerPayPeriod${j - 1}-input]`).type(`${data.rows[i][taxesPerPeriodNum]}`)
            //     cy.get(`[data-testid=taxesYTD${j - 1}-input]`).type(`${data.rows[i][taxesYTDNum]}`)
            //   }
            //   // Present
            //   if (data.rows[i][timePeriodOfJobNum] == 'currentPortion') {
            //     cy.get(`[data-testid="timePeriodOfJob${j - 1}-input-${data.rows[i][timePeriodOfJobNum]}"]`).click()
            //     cy.get(`[data-testid="jobs.${j - 1}.dateRange.startDate"]`).type(data.rows[i][presentStartDateNum])
            //     cy.get(`[data-testid="jobs.${j - 1}.dateRange.endDate"]`).type(data.rows[i][presentEndDateNum])
            //     cy.get(`[data-testid=dateRange${j - 1}-label]`).click()
            //     cy.get(`[data-testid="payFrequency${j - 1}-input-${data.rows[i][payFrequencyNum]}"]`).click()
            //     cy.get(`[data-testid="payFrequency${j - 1}-input-${data.rows[i][payFrequencyNum]}"]`).click()
            //     cy.get(`[data-testid="jobs.${j - 1}.dateLastPayPeriod"]`).type(data.rows[i][recentPayPeriodNum])
            //     cy.get(`[data-testid=wagesPerPayPeriod${j - 1}-input]`).type(data.rows[i][wagesPerPeriodNum])
            //     cy.get(`[data-testid=wagesYTD${j - 1}-input]`).type(data.rows[i][wagesYTDNum])
            //     if (data.rows[i][isThisCorrectNum] == 'no') {
            //       cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //       cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //       cy.get(`[data-testid=correctedWages${j - 1}-input]`).last().type(data.rows[i][annualIncomeManualNum])
            //     }
            //     cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-yes]`).click()
            //     cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-yes]`).click()
            //     cy.get(`[data-testid=taxesPerPayPeriod${j - 1}-input]`).type(`${data.rows[i][taxesPerPeriodNum]}`)
            //     cy.get(`[data-testid=taxesYTD${j - 1}-input]`).type(`${data.rows[i][taxesYTDNum]}`)
            //   }
            //   // Past
            //   if (data.rows[i][timePeriodOfJobNum] == 'past') {
            //     cy.get(`[data-testid=incomeType${j - 1}-input-${data.rows[i][incomeTypeNum]}]`).last().click()
            //     cy.get(`[data-testid=timePeriodOfJob${j - 1}-input-${data.rows[i][timePeriodOfJobNum]}]`).last().click()
            //     cy.get(`[data-testid="jobs.${j - 1}.dateRange.startDate"]`).type(data.rows[i][pastStardDateNum])
            //     cy.get(`[data-testid="jobs.${j - 1}.dateRange.endDate"]`).type(data.rows[i][pastEndDateNum])
            //     cy.get('[for="otherIncome"]').click()
            //     cy.get(`[data-testid=wagesYTD${j - 1}-input]`).type(data.rows[i][pastYTDNum])
            //     cy.get(`[data-testid=taxesYTD${j - 1}-input]`).type(data.rows[i][pastTaxesYTDNum])
            //   }
            //   // Future
            //   if (data.rows[i][timePeriodOfJobNum] == 'future') {
            //     cy.get(`[data-testid=incomeType${j - 1}-input-${data.rows[i][incomeTypeNum]}]`).last().click()
            //     cy.get(`[data-testid=timePeriodOfJob${j - 1}-input-${data.rows[i][timePeriodOfJobNum]}]`).last().click()
            //     cy.get(`[data-testid="jobs.${j - 1}.dateRange.startDate"]`).type(data.rows[i][futureStartDateNum])
            //     cy.get(`[data-testid="jobs.${j - 1}.dateRange.endDate"]`).type(data.rows[i][futureEndDateNum])
            //     cy.get(`[data-testid=dateRange${j - 1}-label]`).click()
            //     cy.get(`[data-testid=payFrequency${j - 1}-input-${data.rows[i][payFrequencyNum]}]`).click()
            //     cy.get(`[data-testid=payFrequency${j - 1}-input-${data.rows[i][payFrequencyNum]}]`).click()
            //     cy.get(`[data-testid=annualSalary${j - 1}-input]`).type(data.rows[i][wagesYTDNum])
            //     if (data.rows[i][isThisCorrectNum] == 'no') {
            //       cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //       cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //       cy.get(`[data-testid=correctedWages${j - 1}-input]`).last().type(data.rows[i][annualIncomeManualNum])
            //     } else {
            //       cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //       cy.get(`[data-testid=isIncomeAmountCorrect${j - 1}-input-${data.rows[i][isThisCorrectNum]}]`).click()
            //     }
            //   }
            // }
          }
          //         }
          //       })
          //     })
          //   })
          // })

          // Old Code Below - Not implemented

          //       // hourly
          //       else if (data.rows[i].incomeType1 == 'hourly') {
          //   cy.get(`[data-testid="incomeType0-input-${data.rows[i].incomeType1}"]`).click()
          //   cy.get(`[data-testid="timePeriodOfJob-input-${data.rows[i].timePeriodOfJob}"]`).click()
          //   cy.get('[data-testid=payFrequency-label]').should('be.visible').click()
          //   cy.get('[data-testid=payFrequency-label]').should('be.visible').click()
          //   cy.get(`[data-testid="payFrequency-input-${data.rows[i].Frequency}"]`).click()
          //   cy.get('[data-testid="jobs.0.dateLastPayPeriod"]').type('08/01/2021')
          //   if (data.rows[i].situationLastStatementHourly == 'yes') {
          //     cy.get('[data-testid=payStatementOptions-lastStatement] > .text').click()
          //     cy.get('[data-testid=payStatementOptions-input-lastStatement]').click()
          //     cy.get('[data-testid=undefined-input]').type(data.rows[i].lastStatementHourly)
          //     cy.get('[data-testid=wagesYTD-input]').type(data.rows[i].last2To3StatementsHourly)
          //     if (data.rows[i].isThisCorrect == 'yes') {
          //       cy.get('[data-testid=isIncomeAmountCorrect-label]').should('be.visible').click()
          //       cy.get('[data-testid=isIncomeAmountCorrect-input-yes]').click()
          //       cy.get('[data-testid=taxesPerPayPeriod-input]').type(data.rows[i].taxesPerPeriod)
          //       cy.get('[data-testid=taxesYTD-input]').type(data.rows[i].taxesYTD)
          //     } else {
          //       cy.get('[data-testid=isIncomeAmountCorrect-input-no]').click()
          //       cy.get('[data-testid=correctedWages-input]').type(data.rows[i].annualIncomeManual)
          //     }
          //   } else {
          //     cy.get('[data-testid=payStatementOptions-input-last2To3Statements]').click()
          //   }
          //   cy.get('[data-testid="nextButton"]').click()
          //   cy.get('[data-testid="adjustmentsTitle"]').should('be.visible')

          // }
          //         // Pension
          //         else if (data.rows[i].incomeType1 == 'pension') {
          //         cy.get(`[data-testid="incomeType0-input-${data.rows[i].incomeType1}"]`).click()
          //         cy.get(`[data-testid="timePeriodOfJob0-input-${data.rows[i].timePeriodOfJob1}"]`).click()
          //         cy.get('[data-testid=payFrequency0-label]').should('be.visible').click()
          //         cy.get(`[data-testid="payFrequency0-input-${data.rows[i].payFrequency1}"]`).click()
          //         cy.get('[data-testid="jobs.0.dateLastPayPeriod"]').type(data.rows[i].recentPayPeriod1)
          //         cy.get('[data-testid=wagesPerPayPeriod0-input]').type(data.rows[i].wagesPerPeriod1)
          //         cy.get('[data-testid=wagesYTD0-input]').type(data.rows[i].wagesYTD1)
          //         // cy.get('[data-testid=isIncomeAmountCorrect-input-yes]').click()
          //         if (data.rows[i].isThisCorrect1 == 'no') {
          //           cy.get(`[data-testid=isIncomeAmountCorrect0-input-${data.rows[i].isThisCorrect1}]`).click()
          //           cy.get(`[data-testid=isIncomeAmountCorrect0-input-${data.rows[i].isThisCorrect1}]`).click()
          //           cy.get('[data-testid=correctedWages0-input]').type(data.rows[i].annualIncomeManual1)
          //           cy.get('[data-testid=taxesPerPayPeriod0-input]').type(`${data.rows[i].taxesPerPeriod1}`)
          //           cy.get('[data-testid=taxesYTD0-input]').type(`${data.rows[i].taxesYTD1}`)
          //           cy.get('[data-testid=contributeToCafeteriaPlan0-label]').click()
          //           cy.get('[data-testid=contributeToCafeteriaPlan0-input-no]').click()
          //                }
          //         cy.get(`[data-testid=isIncomeAmountCorrect0-input-${data.rows[i].isThisCorrect1}]`).click()
          //         cy.get(`[data-testid=isIncomeAmountCorrect0-input-${data.rows[i].isThisCorrect1}]`).click()
          //         cy.get('[data-testid=taxesPerPayPeriod0-input]').type(`${data.rows[i].taxesPerPeriod1}`)
          //         cy.get('[data-testid=taxesYTD0-input]').type(`${data.rows[i].taxesYTD1}`)
          //         cy.get('[data-testid=contributeToCafeteriaPlan0-label]').click()
          //         cy.get('[data-testid=contributeToCafeteriaPlan0-input-no]').click()
          //         }
          //       // }

          // Select any that apply
          for (let j = 0; j < numOfJobs; j++) {
            if (data.rows[i][`incomeType${j + 1}`] == 'salary' || data.rows[i][`incomeType${j + 1}`] == 'hourly') {
              // 401K
              cy.get(`[data-testid="jobs.${[j]}.contributionsAndBonuses.retirement.checked"]`).click()
              if (data.rows[i][`timePeriodOfJob${j + 1}`] !== 'past') {
                cy.get(`[data-testid=retirement${[j]}-0-input]`).type(data.rows[i][`401kPPP${j + 1}`])
              }
              cy.get(`[data-testid=retirement${[j]}YTD-0-input]`).type(data.rows[i][`401kYTD${j + 1}`])
              // HSA and FSA
              cy.get('[for="jobs.0.contributionsAndBonuses"]').click()
              cy.get(`[data-testid="jobs.${[j]}.contributionsAndBonuses.cafeteriaPlan.checked"]`).click()
              cy.get(`[data-testid=cafeteriaPlan${[j]}-0-input]`).type(data.rows[i][`HSAPPP${j + 1}`])
              // cy.get('[data-testid=cafeteriaPlan0-input]').eq([j]).type(data.rows[i][`HSAPPP${j + 1}`])
              if (data.rows[i][`timePeriodOfJob${j + 1}`] !== 'past') {
                cy.get(`[data-testid=cafeteriaPlan${[j]}YTD-0-input]`).type(data.rows[i][`HSAYTD${j + 1}`])
              }
              // getting a bonus
              if (data.rows[i][`timePeriodOfJob${j + 1}`] !== 'past') {
                cy.get('[for="jobs.0.contributionsAndBonuses"]').click()
                cy.get(`[data-testid="jobs.${[j]}.contributionsAndBonuses.bonusFuture.checked"]`).click()
                cy.get(`[data-testid=bonusFuture${[j]}-0-input]`).type(data.rows[i][`gettingBonusAmount${j + 1}`])
                if (data.rows[i][`gettingBonusEWithheld${j + 1}`] == 'yes') {
                  cy.get('[data-testid=bonusFuture0-0-label]').click()
                  cy.get('[data-testid=employerWillWithhold]').eq([j]).click()
                }
              }
              // got bonus
              if (data.rows[i][`timePeriodOfJob${j + 1}`] !== 'future') {
                cy.get('[for="jobs.0.contributionsAndBonuses"]').click()
                cy.get(`[data-testid="jobs.${[j]}.contributionsAndBonuses.bonusPast.checked"]`).click()
                cy.get(`[data-testid=bonusPast${[j]}-0-input]`).type(data.rows[i][`gtoBonus${j + 1}`])
              }
            }
          }
          // Other Income
          checkForNullValue([data.rows[i].scholarship, data.rows[i].scholarshipTaxes], () => {
            cy.get('[data-testid="otherIncome.scholarship.checked"]').click()
            cy.get('[data-testid=scholarship0-input]').eq(0).type(data.rows[i].scholarship)
            cy.get('[data-testid=scholarship0-input]').eq(1).type(data.rows[i].scholarshipTaxes)
          })
          checkForNullValue([data.rows[i].unemployment, data.rows[i].unemploymentTaxes], () => {
            cy.get('[data-testid="otherIncome.unemployment.checked"]').click()
            cy.get('[data-testid=unemployment0-input]').eq(0).type(data.rows[i].unemployment)
            cy.get('[data-testid=unemployment0-input]').eq(1).type(data.rows[i].unemploymentTaxes)
          })
          checkForNullValue([data.rows[i].selfEmployment, data.rows[i].selfEmploymentTaxes], () => {
            cy.get('[data-testid="otherIncome.selfEmployment.checked"]').click()
            cy.get('[data-testid=selfEmployment0-input]').eq(0).type(data.rows[i].selfEmployment)
            cy.get('[data-testid=selfEmployment0-input]').eq(1).type(data.rows[i].selfEmploymentTaxes)
          })
          checkForNullValue([data.rows[i].investments, data.rows[i].investmentsTaxes], () => {
            cy.get('[data-testid="otherIncome.investments.checked"]').click()
            cy.get('[data-testid=investments0-input]').eq(0).type(data.rows[i].investments)
            cy.get('[data-testid=investments0-input]').eq(1).type(data.rows[i].investmentsTaxes)
          })

          checkForNullValue(data.rows[i].otherTaxableIncome, () => {
            cy.get('[data-testid="otherIncome.otherTaxableIncome.checked"]').click()
            cy.get('[data-testid=otherTaxableIncome0-input]').eq(0).type(data.rows[i].otherTaxableIncome)
          })

          checkForNullValue(data.rows[i].otherTaxes, () => {
            cy.get('[data-testid="otherIncome.otherTaxes.checked"]').click()
            cy.get('[data-testid=otherTaxes0-input]').eq(0).type(data.rows[i].otherTaxes)
          })

          // Next to adjustments
          cy.get('[data-testid="nextButton"]').click()
          cy.waitFor('[data-testid="adjustmentsTitle"]')
          cyWait();
          cy.get('[data-testid="adjustmentsTitle"]').should('be.visible')

          // Adjustments (check which all checkboxes have been checked and expand all checked income types)
          // Expand all checkboxes if values present
          checkForNullValue(data.rows[i].studentLoan, () => {
            cy.get('[data-testid="adjustments.studentLoan.checked"]').click()
            cy.get('[data-testid=studentLoan0-input]').type(data.rows[i].studentLoan)
          })

          checkForNullValue(data.rows[i].educator, () => {
            cy.get('[data-testid="adjustments.educator.checked"]').click()
            cy.get('[data-testid=educator0-input]').type(data.rows[i].educator)
          })

          checkForNullValue(data.rows[i].ira, () => {
            cy.get('[data-testid="adjustments.ira.checked"]').click()
            cy.get('[data-testid=ira0-input]').type(data.rows[i].ira)
          })

          checkForNullValue(data.rows[i].healthSavings, () => {
            cy.get('[data-testid="adjustments.hsa.checked"]').click()
            cy.get('[data-testid=hsa0-input]').type(data.rows[i].healthSavings)
          })

          checkForNullValue(data.rows[i].movingMilitary, () => {
            cy.get('[data-testid="adjustments.moving.checked"]').click()
            cy.get('[data-testid=moving0-input]').type(data.rows[i].movingMilitary)
          })

          checkForNullValue(data.rows[i].alimonyPaid, () => {
            cy.get('[data-testid="adjustments.alimony.checked"]').click()
            cy.get('[data-testid=alimony0-input]').type(data.rows[i].alimonyPaid)
          })

          checkForNullValue(data.rows[i].earlyWithdrawlSavings, () => {
            cy.get('[data-testid="adjustments.earlyWithdrawal.checked"]').click()
            cy.get('[data-testid=earlyWithdrawal0-input]').type(data.rows[i].earlyWithdrawlSavings)
          })

          checkForNullValue(data.rows[i].alimonyPaid, () => {
            cy.get('[data-testid="adjustments.business.checked"]').click()
            cy.get('[data-testid=business0-input]').type(data.rows[i].businessCredits)
          })

          cy.get('[data-testid=total]').should('have.text', `Adjustments entered: ${formatter.format(data.rows[i].totalAdjustments)}`)
          cy.get('[data-testid=total]').click()
          cy.get('[data-testid="nextButton"]').click()

          // Deductions
          cyWait();
          cy.get('[data-testid="deductionsTitle"]').should('be.visible')
          if (data.rows[i].itemize == 'no') {
            cy.get('[data-testid="deductions-standardDeduction"]').click()
          } else {
            // Itemized
            cy.get('[data-testid=deductions-input-itemizedDeduction]').click()
            cy.get('[type="checkbox"]').check({ force: true })
            cy.get('[data-testid=itemized]').click()

            cy.get('[data-testid=medical0-input]').type(data.rows[i].medical)
            cy.get('[data-testid=paid0-input]').type(data.rows[i].taxes)
            cy.get('[data-testid=qualified0-input]').type(data.rows[i].interestPaid)
            cy.get('[data-testid=charity0-input]').type(data.rows[i].charity)
            cy.get('[data-testid=casualty0-input]').type(data.rows[i].casualty)
            cy.get('[data-testid=other0-input]').type(data.rows[i].otherItemized)
            if (data.rows[i].useItemized == 'yes') {
              cy.get('[data-testid=itemizedTotal]').click()
              cy.get('[data-testid=itemized]').click()
            }
          }
          cy.get('[data-testid="nextButton"]').click()
          // Tax Credits
          cyWait();
          cy.get('[data-testid="taxCreditsTitle"]').should('be.visible')

          if (data.rows[i].planToClaimDependents == 'Yes') {
            cy.get('[data-testid=childrenAges-input]').should('be.visible')
          } else {
            cy.get('[data-testid=childCreditsAccordion-trigger]').click()
          }
          if ((data.rows[i].Child1Age) !== 0) {

            cy.get('[data-testid=childrenAges-input]').type(data.rows[i].Child1Age)

            // eslint-disable-next-line max-len
            checkForNullValue(data.rows[i].Child2Age, () => {
              cy.get('[data-testid=addAnotherButton]').click()
              cy.get(':nth-child(4) > [data-testid=childrenAges] > div.inline-block > [data-testid=childrenAges-input]').type(data.rows[i].Child2Age)
            })

            // Child and Dependent Tax Credit
            for (let j = 0; j < (data.rows[i].qCforCDTC); j++) {
              cy.get('[data-testid=numOfChildDependentCareQC-plus]').click();
            }
          }
          cy.get('[data-testid=childDependentCareAmount-input]').type(data.rows[i].ChildCareExpenses)
          // Earned income tax credit
          for (let j = 0; j < (data.rows[i].QCforEITC); j++) {
            cy.get('[data-testid=numOfEitcQC-plus]').click();
          }
          // Adoption Tax Credit Amount

          cy.get('[data-testid=adoptionCreditAmount-input]').type(data.rows[i].adoptionTaxCredit)
          cy.get('[data-testid=educationalAccordion-trigger]').click()

          cy.get('[data-testid=aotc-input]').type(data.rows[i].AOCCredit)
          checkForNullValue(data.rows[i].LLCCredit, () => {
            cy.get('[data-testid=llc-input]').type(data.rows[i].LLCCredit)
            cy.get('[data-testid=llc-input]').click()
          })

          // foreignTaxCredit
          checkForNullValue(data.rows[i].foreignTaxCredit, () => {
            cy.get('[data-testid=foreignTaxAccordion-trigger]').click()
            cy.get('[data-testid=foreignTaxCredit-input]').type(data.rows[i].foreignTaxCredit)
          })
          // Retirement Savings
          checkForNullValue(data.rows[i].retirementSavingsContributions, () => {
            cy.get('[data-testid=retirementSavingsAccordion-trigger]').click()
            cy.get('[data-testid=retirementSavingsCredit-input]').type(data.rows[i].retirementSavingsContributions)
          })
          // Homeowner
          checkForNullValue([data.rows[i].residentalEnergyCredit, data.rows[i].mortgageInterestCredit], () => {
            cy.get('[data-testid=homeOwnerTaxAccordion-trigger]').click()
            cy.get('[data-testid=homeOwnerTaxCredit-input]').type(data.rows[i].residentalEnergyCredit)
            cy.get('[data-testid=homeOwnerMortgageTaxCredit-input]').type(data.rows[i].mortgageInterestCredit)
          })
          // Elderly or Disabled
          checkForNullValue(data.rows[i].elderOrDisabledCredit, () => {
            cy.get('[data-testid=elderlyTaxAccordion-trigger]').click()
            cy.get('[data-testid=elderlyTaxCredit-input]').type(data.rows[i].elderOrDisabledCredit)
          })
          // Business
          checkForNullValue(data.rows[i].generalBusinessCredit, () => {
            cy.get('[data-testid=businessAccordion-trigger]').click()
            cy.get('[data-testid=businessCredit-input]').type(data.rows[i].generalBusinessCredit)
          })
          // Alternative Minimum Credit
          checkForNullValue(data.rows[i].alternativeMinimumTaxCredit, () => {
            cy.get('[data-testid=alternativeMinimumCreditAccordion-trigger]').click()
            cy.get('[data-testid=alternativeMinimumCredit-input]').type(data.rows[i].alternativeMinimumTaxCredit)
          })
          // Energy Efficient Vehicles
          checkForNullValue([data.rows[i].motorVehicleCredit, data.rows[i].energyRefuelingTaxCredit, data.rows[i].pluginElectricCredit], () => {
            cy.get('[data-testid=energyTaxCreditAccordion-trigger]').click()
            cy.get('[data-testid=energyMotorVehicleTaxCredit-input]').type(data.rows[i].motorVehicleCredit)
            cy.get('[data-testid=energyRefuelingTaxCredit-input]').type(data.rows[i].energyRefuelingTaxCredit)
            cy.get('[data-testid=energyPlugInTaxCredit-input]').type(data.rows[i].pluginElectricCredit)
          })
          // Next button to results
          cy.get('[data-testid="nextButton"]').click()
          cyWait();
          cy.get('[data-testid=yourResultsTitle]').should('be.visible')


          // Results Page
          // Get Expected witholding
          cy.writeFile('cypress/fixtures/Results.json', `{ \"Scenario${data.rows[i].Scenarios}\" : { \"Values\" : [`, { flag: 'a+' })
          cy.get('[data-testid=expectedTaxValue]').invoke('text').then((text) => {
            const expectedTaxWithholding = text
            cy.log(expectedTaxWithholding)
            cy.softAssert(expectedTaxWithholding, `${formatter.format(data.rows[i].expectedTaxWithholding)}`, 'No Match');
            if (expectedTaxWithholding == `${formatter.format(data.rows[i].expectedTaxWithholding)}`) {
              cy.writeFile('cypress/fixtures/Results.json', { Match: 'yes', ActualWitolding: setResultData(expectedTaxWithholding), ExpectedTaxWithholding: `${formatter.format(setResultData(data.rows[i].expectedTaxWithholding))}` }, { flag: 'a+' })
              cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
            } else {
              cy.writeFile('cypress/fixtures/Results.json', { Match: 'no', ActualWitolding: setResultData(expectedTaxWithholding), ExpectedTaxWithholding: `${formatter.format(setResultData(data.rows[i].expectedTaxWithholding))}` }, { flag: 'a+' })
              cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
            }
          })
          // Tax obligation
          cy.get('[data-testid=anticipatedTaxValue]').invoke('text').then((text) => {
            const aTaxValue = text
            cy.log(aTaxValue)
            cy.softAssert(aTaxValue, `${formatter.format(data.rows[i].anticipatedTaxObligation)}`, 'No Match');
            if (aTaxValue == `${formatter.format(data.rows[i].anticipatedTaxObligation)}`) {
              cy.writeFile('cypress/fixtures/Results.json', { ActualTaxObligaation: setResultData(aTaxValue), ExpectedTaxObligation: `${formatter.format(setResultData(data.rows[i].anticipatedTaxObligation))}`, Match: 'yes' }, { flag: 'a+' })
              cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
            } else {
              cy.writeFile('cypress/fixtures/Results.json', { ActualTaxObligaation: setResultData(aTaxValue), ExpectedTaxObligation: `${formatter.format(setResultData(data.rows[i].anticipatedTaxObligation))}`, Match: 'no' }, { flag: 'a+' })
              cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
            }
          })
          // Owe or Refund
          cy.get('[data-testid=estimatedValue]').invoke('text').then((text) => {
            const resultsEstimatedValue = text
            cy.log(resultsEstimatedValue)
            cy.softAssert(resultsEstimatedValue, formatter.format(data.rows[i].redundOrOwe), 'No Match');
            if (resultsEstimatedValue == `${formatter.format(data.rows[i].refundOrOwe)}`) {
              cy.writeFile('cypress/fixtures/Results.json', { OweOrRefund: setResultData(resultsEstimatedValue), ExpectedOweOrRefund: `${formatter.format(setResultData(data.rows[i].refundOrOwe))}`, Match: 'yes' }, { flag: 'a+' })
              cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
            } else {
              cy.writeFile('cypress/fixtures/Results.json', { OweOrRefund: setResultData(resultsEstimatedValue), ExpectedOweOrRefund: `${formatter.format(setResultData(data.rows[i].refundOrOwe))}`, Match: 'no' }, { flag: 'a+' })
              cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
            }
          })
          // RECOMMENDATIONS

          // Standard Variable
          cy.get('.MuiSlider-thumb').invoke('attr', 'style', 'left: 0%;')
          cy.get('.MuiSlider-thumb').type('{rightarrow}')
          cy.get('.MuiSlider-thumb').type('{leftarrow}')

          const checkAndReload = () => {
            // get the element's text, convert into a number
            cy.get('[data-testid=salaryIntroParagraph20] > [data-testid=standardWithholdingAmount]')
              .should('not.be.empty')
              .invoke('text')
              // .then(parseInt)
              .then((standardVariable) => {
                cy.log(standardVariable)
                // if the expected number is found
                // stop adding any more commands
                if (standardVariable.length !== 0) {
                  cy.log('found min')
                  return
                }
                // otherwise insert more Cypress commands
                // by calling the function after reload
                cy.get('.MuiSlider-thumb').type('{rightarrow}')
                checkAndReload()
              })
          }
          checkAndReload()

          cy.get('.MuiSlider-thumb').invoke('attr', 'aria-valuemin').then(($minSlider) => {
            // Get standard variable if 0 for job 1
            cy.get('[data-testid=salaryIntroParagraph20] > [data-testid=standardWithholdingAmount]').invoke('text').then((text) => {
              const standardVariable1 = text
              cy.log(standardVariable1)
              if (standardVariable1 == `${formatter.format(data.rows[i].standardVariable1)}`) {
                cy.writeFile('cypress/fixtures/Results.json', { StandardVariableJob1: setResultData(standardVariable1), ExpectedStandardVariable: `${formatter.format(setResultData(data.rows[i].standardVariable1))}`, Match: 'yes' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              } else {
                cy.writeFile('cypress/fixtures/Results.json', { standarVariableJob1: setResultData(standardVariable1), ExpectedStandardVariable: `${formatter.format(setResultData(data.rows[i].standardVariable1))}`, Match: 'no' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              }
            })

            // Get standard variable if 2 jobs
            if (data.rows[i].numberOfJobs == 2 && data.rows[i].incomeType2 == 'salary' && data.rows[i].timePeriodOfJob2 !== 'past') {
              cy.get('[data-testid=salaryIntroParagraph21] > [data-testid=standardWithholdingAmount]').invoke('text').then((text) => {
                const standardVariable2 = text
                cy.log(standardVariable2)
                if (standardVariable2 == `${formatter.format(data.rows[i].standardVariable2)}`) {
                  cy.writeFile('cypress/fixtures/Results.json', { StandardVariableJob2: setResultData(standardVariable2), ExpectedStandardVariable: `${formatter.format(setResultData(data.rows[i].standardVariable2))}`, Match: 'yes' }, { flag: 'a+' })
                  cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
                } else {
                  cy.writeFile('cypress/fixtures/Results.json', { standarVariableJob2: setResultData(standardVariable2), ExpectedStandardVariable: `${formatter.format(setResultData(data.rows[i].standardVariable2))}`, Match: 'no' }, { flag: 'a+' })
                  cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
                }
              })
            }

            // Recommendations Job 1 at 0
            cy.get('[data-testid=recommendationAccordion0-trigger]').click()
            cy.get('#recommendationAccordion0 > p.inline > [data-testid=amount1SalaryParagraph5]').invoke('text').then((text) => {
              const job1RecAt0 = text
              cy.log(job1RecAt0)
              if (job1RecAt0 == `${formatter.format(data.rows[i].Job1Rec0)}`) {
                cy.writeFile('cypress/fixtures/Results.json', { Job1RecommendationAtMin: setResultData(job1RecAt0), ExpectedJob1RecommendationAtMin: `${formatter.format(setResultData(data.rows[i].Job1Rec0))}`, Match: 'yes' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              } else {
                cy.writeFile('cypress/fixtures/Results.json', { Job1RecommendationAtMin: setResultData(job1RecAt0), ExpectedJob1RecommendationAtMin: `${formatter.format(setResultData(data.rows[i].Job1Rec0))}`, Match: 'no' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              }
            })

            // Recommendations Job 2 at 0
            if (data.rows[i].numberOfJobs == 2 && data.rows[i].incomeType2 == 'salary' && data.rows[i].timePeriodOfJob2 !== 'past') {
              cy.get('[data-testid=recommendationAccordion1-trigger]').click()
              cy.get('#recommendationAccordion1 > p.inline > [data-testid=amount1SalaryParagraph5]').invoke('text').then((text) => {
                const job2RecAt0 = text
                cy.log(job2RecAt0)
                if (job2RecAt0 == `${formatter.format(data.rows[i].Job2Rec0)}`) {
                  cy.writeFile('cypress/fixtures/Results.json', { Job2RecommendationAtMin: setResultData(job2RecAt0), ExpectedJob2RecommendationAtMine: `${formatter.format(setResultData(data.rows[i].Job2Rec0))}`, Match: 'yes' }, { flag: 'a+' })
                  cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
                } else {
                  cy.writeFile('cypress/fixtures/Results.json', { Job2RecommendationAtMin: setResultData(job2RecAt0), ExpectedJob2RecommendationAtMin: `${formatter.format(setResultData(data.rows[i].Job2Rec0))}`, Match: 'no' }, { flag: 'a+' })
                  cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
                }
              })
            }

            // Getting Last entry Amount
            cy.get('[data-testid=taxAfterCreditsTotalTaxPaidW4Value]').invoke('text').then((text) => {
              const LastEntryMin = text
              cy.log(LastEntryMin)
              if (LastEntryMin == `${formatter.format(data.rows[i].LastEntry0)}`) {
                cy.writeFile('cypress/fixtures/Results.json', { LastEntryAtMin: setResultData(LastEntryMin), ExpectedLastEntryAtMin: `${formatter.format(setResultData(data.rows[i].LastEntry0))}`, Match: 'yes' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              } else {
                cy.writeFile('cypress/fixtures/Results.json', { LastEntryAtMin: setResultData(LastEntryMin), ExpectedLastEntryAtMin: `${formatter.format(setResultData(data.rows[i].LastEntry0))}`, Match: 'no' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              }
            })
            // MOVE SLIDER TO POSITION 5
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')

            // cy.MoveSlider(1000)

            //                 cy.get('.MuiSlider-thumb').invoke('attr', 'aria-valuemax').then(($maxSlider) => {
            //                 const maxSlider = $maxSlider
            //                 const currentValue = 0
            //                 const targetValue = 1000;
            //                 const increment = maxSlider / 20;
            //                 const steps = (targetValue - currentValue) / increment;
            //                 const arrows = '{rightarrow}'.repeat(steps)
            //                 cy.get('.MuiSlider-thumb').should('have.attr', 'aria-valuenow', Math.round(currentValue)).type(arrows)
            //                 cy.get('.MuiSlider-thumb').should('have.attr', 'aria-valuenow', 1000)
            //                                                        })
            // // Recommendations Job 1 at 1000
            cy.get('#recommendationAccordion0 > p.inline > [data-testid=amount1SalaryParagraph5]').invoke('text').then((text) => {
              const job1RecAt1000 = text
              cy.log(job1RecAt1000)
              if (job1RecAt1000 == `${formatter.format(data.rows[i].Job1Rec1000)}`) {
                cy.writeFile('cypress/fixtures/Results.json', { Job1RecommendationAtPosition5: setResultData(job1RecAt1000), ExpectedJob1RecommendationAt1000: `${formatter.format(setResultData(data.rows[i].Job1Rec1000))}`, Match: 'yes' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              } else {
                cy.writeFile('cypress/fixtures/Results.json', { Job1RecommendationAtPosition5: setResultData(job1RecAt1000), ExpectedJob1RecommendationAt1000: `${formatter.format(setResultData(data.rows[i].Job1Rec1000))}`, Match: 'no' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              }
            })

            // // Recommendations Job 2 at 1000
            if (data.rows[i].numberOfJobs == 2 && data.rows[i].incomeType2 == 'salary' && data.rows[i].timePeriodOfJob2 !== 'past') {
              cy.get('#recommendationAccordion1 > p.inline > [data-testid=amount1SalaryParagraph5]').invoke('text').then((text) => {
                const job2RecAt1000 = text
                cy.log(job2RecAt1000)
                if (job2RecAt1000 == `${formatter.format(data.rows[i].Job2Rec1000)}`) {
                  cy.writeFile('cypress/fixtures/Results.json', { Job2RecommendationAtPosition5: setResultData(job2RecAt1000), ExpectedJob2RecommendationAt1000: `${formatter.format(setResultData(data.rows[i].Job2Rec1000))}`, Match: 'yes' }, { flag: 'a+' })
                  cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
                } else {
                  cy.writeFile('cypress/fixtures/Results.json', { Job2RecommendationAtPosition5: setResultData(job2RecAt1000), ExpectedJob2RecommendationAt1000: `${formatter.format(setResultData(data.rows[i].Job2Rec1000))}`, Match: 'no' }, { flag: 'a+' })
                  cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
                }
              })
            }

            // Getting Last entry Amount at 1000
            cy.get('[data-testid=taxAfterCreditsTotalTaxPaidW4Value]').invoke('text').then((text) => {
              const LastEntry1000 = text
              cy.log(LastEntry1000)
              if (LastEntry1000 == `${formatter.format(data.rows[i].LastEntry1000)}`) {
                cy.writeFile('cypress/fixtures/Results.json', { LastEntryPosition5: setResultData(LastEntry1000), ExpectedLastEntryAt1000: `${formatter.format(setResultData(data.rows[i].LastEntry1000))}`, Match: 'yes' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              } else {
                cy.writeFile('cypress/fixtures/Results.json', { LastEntryPosition5: setResultData(LastEntry1000), ExpectedLastEntryAt1000: `${formatter.format(setResultData(data.rows[i].LastEntry1000))}`, Match: 'no' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              }
            })
            // MOVE SLIDER TO POSITION 15
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')
            cy.get('.MuiSlider-thumb').type('{rightarrow}')

            // Recommendations Job 1 at 2000
            cy.get('#recommendationAccordion0 > p.inline > [data-testid=amount1SalaryParagraph5]').invoke('text').then((text) => {
              const job1RecAt2000 = text
              cy.log(job1RecAt2000)
              if (job1RecAt2000 == `${formatter.format(data.rows[i].Job1Rec2000)}`) {
                cy.writeFile('cypress/fixtures/Results.json', { Job1RecommendationAtPosition15: setResultData(job1RecAt2000), ExpectedJob1RecommendationAt2000: `${formatter.format(setResultData(data.rows[i].Job1Rec2000))}`, Match: 'yes' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              } else {
                cy.writeFile('cypress/fixtures/Results.json', { Job1RecommendationAtPosition15: setResultData(job1RecAt2000), ExpectedJob1RecommendationAt2000: `${formatter.format(setResultData(data.rows[i].Job1Rec2000))}`, Match: 'no' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              }
            })

            // Recommendations Job 2 at 2000
            if (data.rows[i].numberOfJobs == 2 && data.rows[i].incomeType2 == 'salary' && data.rows[i].timePeriodOfJob2 !== 'past') {
              cy.get('#recommendationAccordion1 > p.inline > [data-testid=amount1SalaryParagraph5]').invoke('text').then((text) => {
                const job2RecAt2000 = text
                cy.log(job2RecAt2000)
                if (job2RecAt2000 == `${formatter.format(data.rows[i].Job2Rec2000)}`) {
                  cy.writeFile('cypress/fixtures/Results.json', { Job2RecommendationAtPosition15: setResultData(job2RecAt2000), ExpectedJob2RecommendationAt2000: `${formatter.format(setResultData(data.rows[i].Job2Rec2000))}`, Match: 'yes' }, { flag: 'a+' })
                  cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
                } else {
                  cy.writeFile('cypress/fixtures/Results.json', { Job2RecommendationAtPosition15: setResultData(job2RecAt2000), ExpectedJob2RecommendationAt2000: `${formatter.format(setResultData(data.rows[i].Job2Rec2000))}`, Match: 'no' }, { flag: 'a+' })
                  cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
                }
              })
            }

            // Getting Last entry Amount at 2000
            cy.get('[data-testid=taxAfterCreditsTotalTaxPaidW4Value]').invoke('text').then((text) => {
              const LastEntry2000 = text
              cy.log(LastEntry2000)
              if (LastEntry2000 == `${formatter.format(data.rows[i].LastEntry2000)}`) {
                cy.writeFile('cypress/fixtures/Results.json', { LastEntryAtPosition15: setResultData(LastEntry2000), ExpectedLastEntryAt2000: `${formatter.format(setResultData(data.rows[i].LastEntry2000))}`, Match: 'yes' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              } else {
                cy.writeFile('cypress/fixtures/Results.json', { LastEntryAtPosition15: setResultData(LastEntry2000), ExpectedLastEntryAt2000: `${formatter.format(setResultData(data.rows[i].LastEntry2000))}`, Match: 'no' }, { flag: 'a+' })
                cy.writeFile('cypress/fixtures/Results.json', ',', { flag: 'a+' })
              }
            })
          }) // then if 0
        }// end of loop for all rows scenarios

        cy.writeFile('cypress/fixtures/Results.json', '{"results":"ignore"}]', { flag: 'a+' })
        cy.writeFile('cypress/fixtures/Results.json', `}}]`, { flag: 'a+' })
        cy.fixture('Results.json').as('ResultsJSON')
        cy.get('@ResultsJSON').then((Results) => {
          cy.writeFile('cypress/fixtures/Results.json', JSON.stringify(Results, null, 2))
          // add to workbook
          const wb = XLSX.utils.book_new();
          Results.forEach(scenarioList => {
            const scenarioKey = Object.keys(scenarioList)[0];
            const ws = XLSX.utils.json_to_sheet(scenarioList[scenarioKey]["Values"]);
            XLSX.utils.book_append_sheet(wb, ws, scenarioKey);
          })
          // generate an XLSX file
          XLSX.writeFile(wb, getFileName());
        })
      })
    })
  })
})
