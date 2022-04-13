import { getIncomeTimeframe } from './helpers'

// PENSION SCENARIOS
export const showTimePeriodOfPension = (values, index) => values.jobs[index].incomeType === 'pension'

export const showDateRange = (values, index) => showTimePeriodOfPension(values, index)
  && (values.jobs[index].timePeriodOfJob === 'past'
    || values.jobs[index].timePeriodOfJob === 'future'
    || values.jobs[index].timePeriodOfJob === 'currentPortion')
  && values.jobs[index].timePeriodOfJob !== 'allYear'

export const showPayFrequency = (values, index, param) => (showTimePeriodOfPension(values, index)
  && values.jobs[index].timePeriodOfJob === 'allYear')
  || (getIncomeTimeframe(values, index, param) === 'future' && showDateRange(values, index))
  || (getIncomeTimeframe(values, index, param) === 'currentPortion' && showDateRange(values, index))

export const showPensionEachPayment = (values, index, param) =>
  showPayFrequency(values, index, param) && values.jobs[index].payFrequency !== '' && getIncomeTimeframe(values, index, param) === 'future'

export const showDateLastPayPeriod = (values, index, param) => showPayFrequency(values, index, param)
  && values.jobs[index].payFrequency !== ''
  && (getIncomeTimeframe(values, index, param) === 'currentPortion' || values.jobs[index].timePeriodOfJob === 'allYear')

export const showWagesPaidLastPayPeriod = (values, index, param) => showDateLastPayPeriod(values, index, param)
  && values.jobs[index].dateLastPayPeriod !== ''

export const showWagesPaidYTD = (values, index, param) => (showDateLastPayPeriod(values, index, param)
  && values.jobs[index].dateLastPayPeriod !== '')
  || (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'past')

export const showIsIncomeAmountCorrect = (values, index, param) => (showWagesPaidLastPayPeriod(values, index, param)
  && showWagesPaidYTD(values, index, param) && values.jobs[index].wagesPerPayPeriod !== '' && values.jobs[index].wagesYTD !== ''
  && ((showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') || values.jobs[index].timePeriodOfJob === 'allYear'))
  || (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future'
    && showPayFrequency(values, index, param) && values.jobs[index].payFrequency !== ''
    && showPensionEachPayment(values, index, param) && values.jobs[index].pensionEachPayment !== '')

export const showCorrectedWages = (values, index, param) => showIsIncomeAmountCorrect(values, index, param)
  && values.jobs[index].isIncomeAmountCorrect === 'no'

export const showTaxesPaidLastPayPeriod = (values, index, param) => ((showCorrectedWages(values, index, param)
  && values.jobs[index].correctedWages !== '')
  || (showIsIncomeAmountCorrect(values, index, param) && values.jobs[index].isIncomeAmountCorrect === 'yes'))
  && ((showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') || values.jobs[index].timePeriodOfJob === 'allYear')

export const showTaxesPaidYTD = (values, index, param) => (((showCorrectedWages(values, index, param)
  && values.jobs[index].correctedWages !== '')
  || (showIsIncomeAmountCorrect(values, index, param) && values.jobs[index].isIncomeAmountCorrect === 'yes'))
  && ((showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') || values.jobs[index].timePeriodOfJob === 'allYear'))
  || (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'past' && showWagesPaidYTD(values, index, param) && values.jobs[index].wagesYTD !== '')

export const showcontributeToCafeteriaPlan = (values, index, param) => showTimePeriodOfPension(values, index)
  && (values.jobs[index].timePeriodOfJob === 'allYear' || (showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion'))
  && showTaxesPaidYTD(values, index, param) && values.jobs[index].taxesYTD !== ''

export const showCafeteriaPlanPayPeriodAmount = (values, index, param) => showcontributeToCafeteriaPlan(values, index, param)
  && values.jobs[index].contributeToCafeteriaPlan === 'yes'

export const showCafeteriaPlanYTDAmount = (values, index, param) => showcontributeToCafeteriaPlan(values, index, param)
  && values.jobs[index].contributeToCafeteriaPlan === 'yes'
