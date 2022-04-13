import moment from 'moment'
import * as Yup from 'yup'
import * as hourlyScenarios from '../Form/scenarios/hourlyScenarios'
import * as salaryScenarios from '../Form/scenarios/salaryScenarios'
import * as pensionScenarios from '../Form/scenarios/pensionScenarios'
import * as ssiScenarios from '../Form/scenarios/ssiScenarios'
import { getIncomeTimeframe } from '../Form/scenarios/helpers'

// CONDITIONS
const incomeTypeRequired = (incomeType) => !(incomeType === '' || incomeType === undefined)

const timePeriodOfJobRequired = (timePeriodOfJob, values, data) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showTimePeriodOfJob(values, index))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showTimePeriodOfJob(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showTimePeriodOfPension(values, index)))
    && (timePeriodOfJob === '' || timePeriodOfJob === undefined))
}

const payFrequencyRequired = (payFrequency, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showPayFrequency(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showPayFrequency(values, index, param))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showPayFrequency(values, index, param)))
    && (payFrequency === '' || payFrequency === undefined))
}

const payStatementOptionsRequired = (payStatementOptions, values, data, param) => {
  const { index } = data.options

  return !(hourlyScenarios.showPayStatementOptions(values, index, param)
    && (payStatementOptions === '' || payStatementOptions === undefined))
}

const hourlyPayStatementsRequired = (hourlyPayStatements, values, data, param) => {
  const index = parseInt(data.path.split('.')[0].split('[')[1].split(']')[0])

  return !(hourlyScenarios.showHourlyPayStatements(values, index, param)
    && (hourlyPayStatements === '' || hourlyPayStatements === undefined))
}

const wagesYTDRequired = (wagesYTD, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showWagesPaidYTD(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary'
      && (salaryScenarios.showWagesPaidYTD(values, index, param) || salaryScenarios.showWagesPaidYTDPast(values, index, param)))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showWagesPaidYTD(values, index, param)))
    && (wagesYTD === '' || wagesYTD === undefined))
}

const isIncomeAmountCorrectRequired = (isIncomeAmountCorrect, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showIsIncomeAmountCorrect(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showIsIncomeAmountCorrect(values, index, param))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showIsIncomeAmountCorrect(values, index, param)))
    && (isIncomeAmountCorrect === '' || isIncomeAmountCorrect === undefined))
}

const correctedWagesRequired = (correctedWages, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showCorrectedWages(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showCorrectedWages(values, index, param))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showCorrectedWages(values, index, param)))
    && (correctedWages === '' || correctedWages === undefined))
}

const taxesPerPayPeriodRequired = (taxesPerPayPeriod, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showTaxesPaidLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showTaxesPaidLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showTaxesPaidLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showTaxesPaidLastPayPeriod(values, index, param)))
    && (taxesPerPayPeriod === '' || taxesPerPayPeriod === undefined))
}

const taxesYTDRequired = (taxesYTD, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showTaxesPaidYTD(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary'
      && (salaryScenarios.showTaxesPaidYTD(values, index, param) || salaryScenarios.showTaxesPaidYTDPast(values, index, param)))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showTaxesPaidYTD(values, index, param))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showTaxesPaidYTD(values, index, param)))
    && (taxesYTD === '' || taxesYTD === undefined))
}

const contributeToCafeteriaPlanRequired = (contributeToCafeteriaPlan, values, data, param) => {
  const { index } = data.options

  return !((values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showcontributeToCafeteriaPlan(values, index, param))
    && (contributeToCafeteriaPlan === '' || contributeToCafeteriaPlan === undefined))
}

const cafeteriaPlanPayPeriodAmountRequired = (cafeteriaPlanPayPeriodAmount, values, data, param) => {
  const { index } = data.options

  return !((values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showCafeteriaPlanPayPeriodAmount(values, index, param))
    && (cafeteriaPlanPayPeriodAmount === '' || cafeteriaPlanPayPeriodAmount === undefined))
}

const cafeteriaPlanYTDAmountRequired = (cafeteriaPlanYTDAmount, values, data, param) => {
  const { index } = data.options

  return !((values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showCafeteriaPlanYTDAmount(values, index, param))
    && (cafeteriaPlanYTDAmount === '' || cafeteriaPlanYTDAmount === undefined))
}

const ssiAllYearRequired = (ssiAllYear, values, data) => {
  const { index } = data.options

  return !((values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showSsiAllYear(values, index))
    && (ssiAllYear === '' || ssiAllYear === undefined))
}

const ssiMonthlyAmountRequired = (ssiMonthlyAmount, values, data, param) => {
  const { index } = data.options

  return !((values?.jobs[index]?.incomeType === 'ssi'
    && (ssiScenarios.showSsiMonthlyAmount(values, index, param) || ssiScenarios.showSsiMonthlyAmountFuture(values, index, param)))
    && (ssiMonthlyAmount === '' || ssiMonthlyAmount === undefined))
}

const ssiBenefitsYTDRequired = (ssiBenefitsYTD, values, data, param) => {
  const { index } = data.options

  return !((values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showSsiBenefitsYTD(values, index, param))
    && (ssiBenefitsYTD === '' || ssiBenefitsYTD === undefined))
}

const pensionEachPaymentRequired = (pensionEachPayment, values, data, param) => {
  const { index } = data.options

  return !((values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showPensionEachPayment(values, index, param))
    && (pensionEachPayment === '' || pensionEachPayment === undefined))
}

const annualSalaryRequired = (annualSalary, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showAnnualSalary(values, index, param)))
    && (annualSalary === '' || annualSalary === undefined))
}

const hourlyWageRequired = (hourlyWage, values, data, param) => {
  const { index } = data.options

  return !(hourlyScenarios.showHourlyWage(values, index, param)
    && (hourlyWage === '' || hourlyWage === undefined))
}

const hoursRequired = (hours, values, data, param) => {
  const { index } = data.options

  return !(hourlyScenarios.showHours(values, index, param)
    && (hours === '' || hours === undefined))
}

const wagesPerPayPeriodRequired = (wagesPerPayPeriod, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showWagesPaidLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showWagesPaidLastPayPeriod(values, index, param)))
    && (wagesPerPayPeriod === '' || wagesPerPayPeriod === undefined))
}

const getIsIncomeAmountCorrectMessage = (values, filingStatus, data) => {
  const index = parseInt(data.path.split('.')[1])
  const isPension = values?.jobs[index]?.incomeType === 'pension'

  return (filingStatus === 'married'
    ? isPension ? 'incomeWithholding.a.isIncomeAmountCorrectPensionMFJRequiredError' : 'incomeWithholding.a.isIncomeAmountCorrectMFJRequiredError'
    : isPension ? 'incomeWithholding.a.isIncomeAmountCorrectPensionRequiredError' : 'incomeWithholding.a.isIncomeAmountCorrectRequiredError')
}

const getWagesYTDMessage = (values, data) => {
  const index = parseInt(data.path.split('.')[1])

  return values?.jobs[index]?.incomeType === 'pension'
    ? 'incomeWithholding.a.wagesYTDPensionRequiredError'
    : 'incomeWithholding.a.wagesYTDRequiredError'
}

const getCorrectedWagesMessage = (values, data) => {
  const index = parseInt(data.path.split('.')[1])

  return values?.jobs[index]?.incomeType === 'pension'
    ? 'incomeWithholding.a.correctedWagesPensionRequiredError'
    : 'incomeWithholding.a.correctedWagesRequiredError'
}

const startDateRequired = (startDate, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateRange(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateRange(values, index, param)))
    && (startDate === '' || startDate === undefined))
}

const endDateRequired = (endDate, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateRange(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateRange(values, index)))
    && (endDate === '' || endDate === undefined))
}

const dateLastPayPeriodRequired = (dateLastPayPeriod, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateLastPayPeriod(values, index, param)))
    && (dateLastPayPeriod === '' || dateLastPayPeriod === undefined))
}

const startDateFormat = (startDate, values, data) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateRange(values, index)))
    && startDate && startDate.length < 10)
}

const endDateFormat = (endDate, values, data) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateRange(values, index)))
    && endDate && endDate.length < 10)
}

const dateLastPayPeriodFormat = (dateLastPayPeriod, values, data, param) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateLastPayPeriod(values, index, param)))
    && dateLastPayPeriod && dateLastPayPeriod.length < 10)
}

const startDateSequential = (startDate, values, data) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateRange(values, index)))
    && startDate
    && values?.jobs[index]?.dateRange?.endDate.length === 10
    && moment(new Date(values?.jobs[index]?.dateRange?.endDate), 'MM/DD/YYYY').isBefore(moment(new Date(startDate), 'MM/DD/YYYY')))
}

const endDateSequential = (endDate, values, data) => {
  const { index } = data.options

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateRange(values, index)))
    && endDate
    && values?.jobs[index]?.dateRange?.startDate.length === 10
    && moment(new Date(endDate), 'MM/DD/YYYY').isBefore(moment(new Date(values?.jobs[index]?.dateRange?.startDate), 'MM/DD/YYYY')))
}

const getStartDateRange = (values, index, param) => {
  const today = param.today ? new Date(param.today) : new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const currentYear = param.current_year

  let firstDate = moment(`12/31/${currentYear - 1}`)
  let lastDate = moment(`1/1/${currentYear + 1}`)
  let errorFirstDate = moment(`12/31/${currentYear - 1}`)
  let errorEndDate = moment(`1/1/${currentYear + 1}`)

  if (values?.jobs[index]?.incomeType === 'ssi') {
    firstDate = moment(`12/31/${currentYear - 1}`)
    lastDate = moment(`1/1/${currentYear + 1}`)
    errorFirstDate = moment(`12/31/${currentYear - 1}`).add(1, 'days')
    errorEndDate = moment(`1/1/${currentYear + 1}`).subtract(1, 'days')
  } else {
    switch (values?.jobs[index]?.timePeriodOfJob) {
      case 'currentPortion':
        firstDate = moment(`12/31/${currentYear - 1}`)
        lastDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        errorFirstDate = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
        errorEndDate = moment(`1/1/${currentYear + 1}`).subtract(1, 'days')
        break
      case 'past':
        firstDate = moment(`12/31/${currentYear - 1}`)
        lastDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        errorFirstDate = moment(`01/01/${currentYear}`)
        errorEndDate = moment(`${currentMonth}/${currentDay}/${currentYear}`).subtract(1, 'days')
        break
      case 'future':
        firstDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        lastDate = moment(`1/1/${currentYear + 1}`)
        errorFirstDate = moment(`${currentMonth}/${currentDay}/${currentYear}`).add(1, 'days')
        errorEndDate = moment(`12/31/${currentYear}`)
        break
      default:
        firstDate = moment(`12/31/${currentYear - 1}`)
        lastDate = moment(`1/1/${currentYear + 1}`)
        errorFirstDate = moment(`1/01/${currentYear}`)
        errorEndDate = moment(`12/31/${currentYear}`)
    }
  }

  return {
    firstDate,
    lastDate,
    errorFirstDate,
    errorEndDate
  }
}

const startDateRange = (startDate, values, data, param) => {
  const { index } = data.options
  const start = moment(startDate)

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateRange(values, index)))
    && !(start.isBetween(getStartDateRange(values, index, param).firstDate, getStartDateRange(values, index, param).lastDate)))
}

const getEndDateRange = (values, index, param) => {
  const today = param.today ? new Date(param.today) : new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const currentYear = param.current_year

  let firstDate = moment(`12/31/${currentYear - 1}`)
  let lastDate = moment(`1/1/${currentYear + 1}`)
  let errorFirstDate = moment(`12/31/${currentYear - 1}`)
  let errorEndDate = moment(`1/1/${currentYear + 1}`)

  if (values?.jobs[index]?.incomeType === 'ssi') {
    firstDate = moment(`12/31/${currentYear - 1}`)
    lastDate = moment(`1/1/${currentYear + 1}`)
    errorFirstDate = moment(`12/31/${currentYear - 1}`).add(1, 'days')
    errorEndDate = moment(`1/1/${currentYear + 1}`).subtract(1, 'days')
  } else {
    switch (values?.jobs[index]?.timePeriodOfJob) {
      case 'currentPortion':
        firstDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        lastDate = moment(`1/1/${currentYear + 1}`)
        errorFirstDate = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
        errorEndDate = moment(`1/1/${currentYear + 1}`).subtract(1, 'days')
        break
      case 'past':
        firstDate = moment(`12/31/${currentYear - 1}`)
        lastDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        errorFirstDate = moment(`01/01/${currentYear}`)
        errorEndDate = moment(`${currentMonth}/${currentDay}/${currentYear}`).subtract(1, 'days')
        break
      case 'future':
        firstDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        lastDate = moment(`1/1/${currentYear + 1}`)
        errorFirstDate = moment(`${currentMonth}/${currentDay}/${currentYear}`).add(1, 'days')
        errorEndDate = moment(`12/31/${currentYear}`)
        break
      default:
        firstDate = moment(`12/31/${currentYear - 1}`)
        lastDate = moment(`1/1/${currentYear + 1}`)
        errorFirstDate = moment(`1/01/${currentYear}`)
        errorEndDate = moment(`12/31/${currentYear}`)
    }
  }

  return {
    firstDate,
    lastDate,
    errorFirstDate,
    errorEndDate
  }
}

const endDateRange = (endDate, values, data, param) => {
  const { index } = data.options
  const end = moment(endDate)

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'ssi' && ssiScenarios.showDateRange(values, index))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateRange(values, index)))
    && !(end.isBetween(getEndDateRange(values, index, param).firstDate, getEndDateRange(values, index, param).lastDate)))
}

const getDateLastPayPeriodRange = (values, index, param) => {
  const today = param.today ? new Date(param.today) : new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const currentYear = param.current_year
  let firstDate = moment(`12/31/${currentYear - 1}`)
  let lastDate = moment(`1/1/${currentYear + 1}`)
  let errorFirstDate = moment(`12/31/${currentYear - 1}`)
  let errorEndDate = moment(`1/1/${currentYear} + 1`)

  switch (getIncomeTimeframe(values, index, param)) {
    case 'currentPortion':
      firstDate = moment(values.jobs[index].dateRange.startDate).subtract(1, 'days')
      lastDate = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
      errorFirstDate = firstDate
      errorEndDate = lastDate
      break
    default:
      firstDate = moment(currentMonth === 1 ? `11/30/${currentYear - 1}` : `12/31/${currentYear - 1}`)
      lastDate = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
      errorFirstDate = moment(currentMonth === 1 ? `12/01/${currentYear - 1}` : `01/01/${currentYear}`)
      errorEndDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
  }

  return {
    firstDate,
    lastDate,
    errorFirstDate,
    errorEndDate
  }
}

const dateLastPayPeriodRange = (dateLastPayPeriod, values, data, param) => {
  const { index } = data.options
  const lastPayDate = moment(dateLastPayPeriod)

  return !(((values?.jobs[index]?.incomeType === 'hourly' && hourlyScenarios.showDateLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'salary' && salaryScenarios.showDateLastPayPeriod(values, index, param))
    || (values?.jobs[index]?.incomeType === 'pension' && pensionScenarios.showDateLastPayPeriod(values, index, param)))
    && !(lastPayDate.isBetween(getDateLastPayPeriodRange(values, index, param).firstDate, getDateLastPayPeriodRange(values, index, param).lastDate)))
}

// ERROR MESSAGE HELPER FUNCTIONS
const getStartDateRangeError = (data, values, lang, param) => {
  const index = parseInt(data.path.split('[')[1].split(']')[0])

  return lang('incomeWithholding.a.dateRangeError', { ':firstDate': getStartDateRange(values, index, param).errorFirstDate.format('MM/DD/YYYY'), ':endDate': getStartDateRange(values, index, param).errorEndDate.format('MM/DD/YYYY') })
}

const getEndDateRangeError = (data, values, lang, param) => {
  const index = parseInt(data.path.split('[')[1].split(']')[0])

  return lang('incomeWithholding.a.dateRangeError', { ':firstDate': getEndDateRange(values, index, param).errorFirstDate.format('MM/DD/YYYY'), ':endDate': getEndDateRange(values, index, param).errorEndDate.format('MM/DD/YYYY') })
}

const getDateLastPayPeriodRequiredError = (data, values, filingStatus) => {
  const index = parseInt(data.path.split('[')[1].split(']')[0])
  let error = null

  if (values?.jobs[index]?.incomeType === 'pension') {
    error = filingStatus === 'married'
      ? 'incomeWithholding.a.dateLastPensionPaymentMFJRequiredError'
      : 'incomeWithholding.a.dateLastPayPeriodRequiredError'
  } else {
    error = 'incomeWithholding.a.dateLastPayPeriodRequiredError'
  }

  return error
}

const getDateLastPayPeriodDateRangeError = (data, values, lang, param) => {
  const index = parseInt(data.path.split('[')[1].split(']')[0])

  return lang('incomeWithholding.a.dateRangeError', { ':firstDate': getDateLastPayPeriodRange(values, index, param).errorFirstDate.format('MM/DD/YYYY'), ':endDate': getDateLastPayPeriodRange(values, index, param).errorEndDate.format('MM/DD/YYYY') })
}

const getWagesPerPayPeriodMessage = (values, data) => {
  const index = parseInt(data.path.split('.')[1])

  return values?.jobs[index]?.incomeType === 'pension'
    ? 'incomeWithholding.a.wagesPerPayPeriodPensionRequiredError'
    : 'incomeWithholding.a.wagesPerPayPeriodRequiredError'
}

// SCHEMA
const validationSchema = (lang, values, filingStatus, param) => Yup.object({}).shape({
  jobs: Yup.array().of(Yup.object({}).shape({
    incomeType: Yup.string()
      .test('incomeType is required', lang('incomeWithholding.a.incomeTypeRequiredError'), (incomeType) => incomeTypeRequired(incomeType)),
    timePeriodOfJob: Yup.string()
      .test('timePeriodOfJob is required', lang('incomeWithholding.a.timePeriodOfJobRequiredError'), (timePeriodOfJob, data) => timePeriodOfJobRequired(timePeriodOfJob, values, data)),
    payFrequency: Yup.string()
      .test('payFrequency is required', lang('incomeWithholding.a.payFrequencyRequiredError'), (payFrequency, data) => payFrequencyRequired(payFrequency, values, data, param)),
    dateLastPayPeriod: Yup.string()
      .test('dateLastPayPeriod is required', (data) => lang(getDateLastPayPeriodRequiredError(data, values, filingStatus)), (dateLastPayPeriod, data) => dateLastPayPeriodRequired(dateLastPayPeriod, values, data, param))
      .test('dateLastPayPeriod format', lang('incomeWithholding.a.dateFormatError'), (dateLastPayPeriod, data) => dateLastPayPeriodFormat(dateLastPayPeriod, values, data, param))
      .test('dateLastPayPeriod range', (data) => getDateLastPayPeriodDateRangeError(data, values, lang, param), (dateLastPayPeriod, data) => dateLastPayPeriodRange(dateLastPayPeriod, values, data, param)),
    payStatementOptions: Yup.string()
      .test('payStatementOptions is required', lang('incomeWithholding.a.payStatementOptionsRequiredError'), (payStatementOptions, data) => payStatementOptionsRequired(payStatementOptions, values, data, param)),
    hourlyPayStatements: Yup.array().of(Yup.string()
      .test('hourlyPayStatements is required', lang('incomeWithholding.a.hourlyPayStatementsRequiredError'), (hourlyPayStatements, data) => hourlyPayStatementsRequired(hourlyPayStatements, values, data, param))),
    wagesYTD: Yup.string()
      .test('wagesYTD is required', (data) => lang(getWagesYTDMessage(values, data)), (wagesYTD, data) => wagesYTDRequired(wagesYTD, values, data, param)),
    isIncomeAmountCorrect: Yup.string()
      .test('isIncomeAmountCorrect is required', (data) => lang(getIsIncomeAmountCorrectMessage(values, filingStatus, data)), (isIncomeAmountCorrect, data) => isIncomeAmountCorrectRequired(isIncomeAmountCorrect, values, data, param)),
    correctedWages: Yup.string()
      .test('correctedWages is required', (data) => lang(getCorrectedWagesMessage(values, data)), (correctedWages, data) => correctedWagesRequired(correctedWages, values, data, param)),
    taxesPerPayPeriod: Yup.string()
      .test('taxesPerPayPeriod is required', lang('incomeWithholding.a.taxesPerPayPeriodRequiredError'), (taxesPerPayPeriod, data) => taxesPerPayPeriodRequired(taxesPerPayPeriod, values, data, param)),
    taxesYTD: Yup.string()
      .test('taxesYTD is required', lang('incomeWithholding.a.taxesYTDRequiredError'), (taxesYTD, data) => taxesYTDRequired(taxesYTD, values, data, param)),
    dateRange: Yup.object({}).shape({
      startDate: Yup.string()
        .test('startDate is required', lang('incomeWithholding.a.startDateRequiredError'), (startDate, data) => startDateRequired(startDate, values, data, param))
        .test('startDate format', lang('incomeWithholding.a.dateFormatError'), (startDate, data) => startDateFormat(startDate, values, data))
        .test('startDate sequential', lang('incomeWithholding.a.startDateSequenceError'), (startDate, data) => startDateSequential(startDate, values, data))
        .test('startDate range', (data) => getStartDateRangeError(data, values, lang, param), (startDate, data) => startDateRange(startDate, values, data, param)),
      endDate: Yup.string()
        .test('endDate is required', lang('incomeWithholding.a.endDateRequiredError'), (endDate, data) => endDateRequired(endDate, values, data, param))
        .test('endDate format', lang('incomeWithholding.a.dateFormatError'), (endDate, data) => endDateFormat(endDate, values, data))
        .test('endDate sequential', lang('incomeWithholding.a.endDateSequenceError'), (endDate, data) => endDateSequential(endDate, values, data))
        .test('endDate range', (data) => getEndDateRangeError(data, values, lang, param), (endDate, data) => endDateRange(endDate, values, data, param)),
    }),
    hourlyWage: Yup.string()
      .test('hourlyWage is required', lang('incomeWithholding.a.hourlyWageRequiredError'), (hourlyWage, data) => hourlyWageRequired(hourlyWage, values, data, param)),
    hours: Yup.string()
      .test('hours is required', lang('incomeWithholding.a.hoursRequiredError'), (hours, data) => hoursRequired(hours, values, data, param)),
    wagesPerPayPeriod: Yup.string()
      .test('wagesPerPayPeriod is required', (data) => lang(getWagesPerPayPeriodMessage(values, data)), (wagesPerPayPeriod, data) => wagesPerPayPeriodRequired(wagesPerPayPeriod, values, data, param)),
    annualSalary: Yup.string()
      .test('annualSalary is required', lang('incomeWithholding.a.annualSalaryRequiredError'), (annualSalary, data) => annualSalaryRequired(annualSalary, values, data, param)),
    contributeToCafeteriaPlan: Yup.string()
      .test('contributeToCafeteriaPlan is required', lang('incomeWithholding.a.contributeToCafeteriaPlanRequiredError'), (contributeToCafeteriaPlan, data) => contributeToCafeteriaPlanRequired(contributeToCafeteriaPlan, values, data, param)),
    cafeteriaPlanPayPeriodAmount: Yup.string()
      .test('cafeteriaPlanPayPeriodAmount is required', lang('incomeWithholding.a.cafeteriaPlanPayPeriodAmountRequiredError'), (cafeteriaPlanPayPeriodAmount, data) => cafeteriaPlanPayPeriodAmountRequired(cafeteriaPlanPayPeriodAmount, values, data, param)),
    cafeteriaPlanYTDAmount: Yup.string()
      .test('cafeteriaPlanYTDAmount is required', lang('incomeWithholding.a.cafeteriaPlanYTDAmountRequiredError'), (cafeteriaPlanYTDAmount, data) => cafeteriaPlanYTDAmountRequired(cafeteriaPlanYTDAmount, values, data, param)),
    pensionEachPayment: Yup.string()
      .test('pensionEachPayment is required', lang('incomeWithholding.a.pensionEachPaymentRequiredError'), (pensionEachPayment, data) => pensionEachPaymentRequired(pensionEachPayment, values, data, param)),
    ssiAllYear: Yup.string()
      .test('ssiAllYear is required', lang('incomeWithholding.a.ssiAllYearRequiredError'), (ssiAllYear, data) => ssiAllYearRequired(ssiAllYear, values, data)),
    ssiMonthlyAmount: Yup.string()
      .test('ssiMonthlyAmount is required', lang('incomeWithholding.a.ssiMonthlyAmountRequiredError'), (ssiMonthlyAmount, data) => ssiMonthlyAmountRequired(ssiMonthlyAmount, values, data, param)),
    ssiBenefitsYTD: Yup.string()
      .test('ssiBenefitsYTD is required', lang('incomeWithholding.a.ssiBenefitsYTDRequiredError'), (ssiBenefitsYTD, data) => ssiBenefitsYTDRequired(ssiBenefitsYTD, values, data, param)),
  }))
})

export default validationSchema
