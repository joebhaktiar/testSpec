import { getIncomeTimeframe } from './helpers'

const notEmpty = (value) => value !== ''

// HOURLY SCENARIOS
export const showTimePeriodOfJob = (values, index) => values?.jobs[index]?.incomeType === 'hourly'

export const showDateRange = (values, index) => showTimePeriodOfJob(values, index)
  && (values.jobs[index].timePeriodOfJob === 'past'
    || values.jobs[index].timePeriodOfJob === 'future'
    || values.jobs[index].timePeriodOfJob === 'currentPortion')

export const showPayFrequency = (values, index, param) => (showTimePeriodOfJob(values, index)
  && values.jobs[index].timePeriodOfJob === 'allYear')
  || (showDateRange(values, index)
    && values.jobs[index].dateRange.startDate !== '' && values.jobs[index].dateRange.endDate !== ''
    && getIncomeTimeframe(values, index, param) !== 'past')

export const showHourlyWage = (values, index, param) => (
  showDateRange(values, index)
  && getIncomeTimeframe(values, index, param) === 'future' && showPayFrequency(values, index, param) && values.jobs[index].payFrequency !== ''
)

export const showHours = (values, index, param) => showDateRange(values, index)
  && getIncomeTimeframe(values, index, param) === 'future' && showPayFrequency(values, index, param) && values.jobs[index].payFrequency !== ''

export const showDateLastPayPeriod = (values, index, param) => showTimePeriodOfJob(values, index)
  && (values.jobs[index].timePeriodOfJob === 'allYear' || (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion'))
  && showPayFrequency(values, index, param) && values.jobs[index].payFrequency !== ''

export const showPayStatementOptions = (values, index, param) => showDateLastPayPeriod(values, index, param)
  && values.jobs[index].dateLastPayPeriod !== ''

export const showHourlyPayStatements = (values, index, param) => showPayStatementOptions(values, index, param)
  && values.jobs[index].payStatementOptions !== ''

export const showWagesPaidYTD = (values, index, param) => (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'past')
  || (showPayStatementOptions(values, index, param) && values.jobs[index].payStatementOptions !== '')

export const showIsIncomeAmountCorrect = (values, index, param) => (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future'
  && showPayFrequency(values, index, param) && showHourlyWage(values, index, param) && showHours(values, index, param)
  && values.jobs[index].hourlyWage !== '' && values.jobs[index].hours !== '')
  || (showWagesPaidYTD(values, index, param) && values.jobs[index].wagesYTD !== ''
    && showHourlyPayStatements(values, index, param) && values.jobs[index].hourlyPayStatements.every(notEmpty))

export const showCorrectedWages = (values, index, param) => showIsIncomeAmountCorrect(values, index, param)
  && values.jobs[index].isIncomeAmountCorrect === 'no'

export const showTaxesPaidLastPayPeriod = (values, index, param) => showHourlyPayStatements(values, index, param)
  && ((showIsIncomeAmountCorrect(values, index, param) && values.jobs[index].isIncomeAmountCorrect === 'yes')
    || (showCorrectedWages(values, index, param) && values.jobs[index].correctedWages !== ''))

export const showTaxesPaidYTD = (values, index, param) => ((showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'past')
  || (showHourlyPayStatements(values, index, param)
    && ((showIsIncomeAmountCorrect(values, index, param) && values.jobs[index].isIncomeAmountCorrect === 'yes')
      || (showCorrectedWages(values, index, param) && values.jobs[index].correctedWages !== ''))))

export const showContributionsAndBonuses = (values, index, param) => (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'past'
  && showWagesPaidYTD(values, index, param) && values.jobs[index].wagesYTD !== ''
  && showTaxesPaidYTD(values, index, param) && values.jobs[index].taxesYTD !== '')
  || (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future' && showIsIncomeAmountCorrect(values, index, param)
    && (values.jobs[index].isIncomeAmountCorrect === 'yes'
      || (showCorrectedWages(values, index, param) && values.jobs[index].correctedWages !== '')))
  || (showTaxesPaidLastPayPeriod(values, index, param) && values.jobs[index].taxesPerPayPeriod !== ''
    && showTaxesPaidYTD(values, index, param) && values.jobs[index].taxesYTD !== '')
