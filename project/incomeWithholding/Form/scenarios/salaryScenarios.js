import { getIncomeTimeframe } from './helpers'

// SALARY SCENARIOS
export const showTimePeriodOfJob = (values, index) => values?.jobs[index]?.incomeType === 'salary'

export const showDateRange = (values, index) => showTimePeriodOfJob(values, index)
  && (values.jobs[index].timePeriodOfJob === 'past'
    || values.jobs[index].timePeriodOfJob === 'future'
    || values.jobs[index].timePeriodOfJob === 'currentPortion')

export const showPayFrequency = (values, index, param) => (showTimePeriodOfJob(values, index)
  && values.jobs[index].timePeriodOfJob === 'allYear')
  || (showDateRange(values, index)
    && values.jobs[index].dateRange.startDate !== '' && values.jobs[index].dateRange.endDate !== ''
    && getIncomeTimeframe(values, index, param) !== 'past')

export const showAnnualSalary = (values, index, param) => (showPayFrequency(values, index, param)
  && values.jobs[index].payFrequency !== ''
  && showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future')

export const showDateLastPayPeriod = (values, index, param) => showPayFrequency(values, index, param)
  && values.jobs[index].payFrequency !== ''
  && (values.jobs[index].timePeriodOfJob === 'allYear' || getIncomeTimeframe(values, index, param) === 'currentPortion')

export const showWagesPaidLastPayPeriod = (values, index, param) => showDateLastPayPeriod(values, index, param)
  && values.jobs[index].dateLastPayPeriod !== ''

export const showWagesPaidYTD = (values, index, param) => showDateLastPayPeriod(values, index, param)
  && values.jobs[index].dateLastPayPeriod !== ''

export const showWagesPaidYTDPast = (values, index, param) => showDateRange(values, index)
  && getIncomeTimeframe(values, index, param) === 'past'

export const showTaxesPaidYTDPast = (values, index, param) => showDateRange(values, index)
  && getIncomeTimeframe(values, index, param) === 'past'

export const showIsIncomeAmountCorrect = (values, index, param) => (showDateLastPayPeriod(values, index, param)
  && values.jobs[index].wagesPerPayPeriod !== '' && values.jobs[index].wagesYTD !== '')
  || (showAnnualSalary(values, index, param) && values.jobs[index].annualSalary !== '')

export const showCorrectedWages = (values, index, param) => showIsIncomeAmountCorrect(values, index, param)
  && values.jobs[index].isIncomeAmountCorrect === 'no'

export const showTaxesPaidLastPayPeriod = (values, index, param) => (((showCorrectedWages(values, index, param)
  && values.jobs[index].correctedWages !== '')
  || (showIsIncomeAmountCorrect(values, index, param) && values.jobs[index].isIncomeAmountCorrect === 'yes'))
  && (values.jobs[index].timePeriodOfJob === 'allYear' || (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion')))

export const showTaxesPaidYTD = (values, index, param) => (((showCorrectedWages(values, index, param)
  && values.jobs[index].correctedWages !== '')
  || (showIsIncomeAmountCorrect(values, index, param) && values.jobs[index].isIncomeAmountCorrect === 'yes'))
  && ((values.jobs[index].timePeriodOfJob === 'allYear' || (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion'))
    || (showWagesPaidYTDPast(values, index, param) && values.jobs[index].wagesYTD !== '')))

export const showContributionsAndBonuses = (values, index, param) => (showTaxesPaidLastPayPeriod(values, index, param)
  && showTaxesPaidYTD(values, index, param)
  && values.jobs[index].taxesPerPayPeriod !== '' && values.jobs[index].taxesYTD !== '')
  || (showTaxesPaidYTDPast(values, index, param) && showWagesPaidYTDPast(values, index, param)
    && values.jobs[index].taxesYTD !== '' && values.jobs[index].wagesYTD !== '')
  || (showAnnualSalary(values, index, param) && showIsIncomeAmountCorrect(values, index, param)
    && ((values.jobs[index].isIncomeAmountCorrect === 'yes')
      || (showCorrectedWages(values, index, param) && values.jobs[index].correctedWages !== '')))
