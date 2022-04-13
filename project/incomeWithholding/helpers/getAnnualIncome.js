import moment from 'moment'
import { getIncomeTimeframe } from '../Form/scenarios/helpers'
import * as salaryScenarios from '../Form/scenarios/salaryScenarios'
import * as hourlyScenarios from '../Form/scenarios/hourlyScenarios'
import * as pensionScenarios from '../Form/scenarios/pensionScenarios'

const getAnnualIncome = (site, index, param) => {
  const { values } = site.forms.incomeWithholding
  const { incomeType,
    timePeriodOfJob,
    payFrequency,
    dateLastPayPeriod,
    wagesPerPayPeriod,
    wagesYTD,
    hourlyWage,
    hours,
    annualSalary,
    pensionEachPayment,
    hourlyPayStatements,
    dateRange } = site.forms.incomeWithholding.values.jobs[index]
  const dateLastPaid = dateLastPayPeriod ? moment(dateLastPayPeriod, 'MM/DD/YYYY') : moment(dateRange.startDate, 'MM/DD/YYYY')
  const lastDayOfYear = moment(`12/31/${param.current_year}`, 'MM/DD/YYYY')
  const endDate = moment(dateRange.endDate, 'MM/DD/YYYY')

  const diffsAllYear = {
    weeks: lastDayOfYear.diff(dateLastPaid, 'weeks'),
    months: lastDayOfYear.diff(dateLastPaid, 'months'),
  }

  const diffsPartial = {
    weeks: endDate.diff(dateLastPaid, 'weeks'),
    months: endDate.diff(dateLastPaid, 'months')
  }
  let calculatedAnnualIncome = null
  let perPayPeriodHourly = null

  switch (payFrequency) {
    case 'weekly':
      if (incomeType === 'salary') {
        if (salaryScenarios.showTimePeriodOfJob(values, index) && timePeriodOfJob === 'allYear') {
          calculatedAnnualIncome = diffsAllYear.weeks * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? diffsAllYear.weeks * wagesPerPayPeriod + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / 7) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          calculatedAnnualIncome = (parseInt(annualSalary) / 52) * diffsPartial.weeks
        }
      } else if (incomeType === 'hourly') {
        if (hourlyScenarios.showTimePeriodOfJob(values, index) && timePeriodOfJob === 'allYear') {
          const total = hourlyPayStatements.reduce((accumulator, currentVal) => parseInt(accumulator) + parseInt(currentVal))
          const average = total / hourlyPayStatements.length

          perPayPeriodHourly = average
          calculatedAnnualIncome = diffsAllYear.weeks * average + parseInt(wagesYTD)
        }

        if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          const total = hourlyPayStatements.reduce((accumulator, currentVal) => parseInt(accumulator) + parseInt(currentVal))
          const average = total / hourlyPayStatements.length

          perPayPeriodHourly = average
          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? diffsAllYear.weeks * average + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / 7) * average + parseInt(wagesYTD)
        }

        if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          perPayPeriodHourly = hourlyWage * hours

          calculatedAnnualIncome = diffsPartial.weeks * (parseInt(hourlyWage) * parseInt(hours))
        }
      } else if (incomeType === 'pension') {
        if (pensionScenarios.showTimePeriodOfPension(values, index) && timePeriodOfJob === 'allYear') {
          calculatedAnnualIncome = diffsAllYear.weeks * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (pensionScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? diffsAllYear.weeks * wagesPerPayPeriod + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / 7) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (pensionScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          calculatedAnnualIncome = parseInt(pensionEachPayment) * diffsPartial.weeks
        }
      }
      break
    case 'biweekly':
      if (incomeType === 'salary') {
        if (salaryScenarios.showTimePeriodOfJob(values, index) && timePeriodOfJob === 'allYear') {
          const paychecksRemaining = diffsAllYear.weeks % 2 === 0 ? diffsAllYear.weeks / 2 : (diffsAllYear.weeks - 1) / 2

          calculatedAnnualIncome = paychecksRemaining * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          const paychecksRemaining = diffsAllYear.weeks % 2 === 0 ? diffsAllYear.weeks / 2 : (diffsAllYear.weeks - 1) / 2

          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? paychecksRemaining * wagesPerPayPeriod + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / 14) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          const paychecksRemaining = diffsPartial.weeks % 2 === 0 ? diffsPartial.weeks / 2 : (diffsPartial.weeks - 1) / 2

          calculatedAnnualIncome = (parseInt(annualSalary) / 26) * paychecksRemaining
        }
      } else if (incomeType === 'hourly') {
        if (hourlyScenarios.showTimePeriodOfJob(values, index) && timePeriodOfJob === 'allYear') {
          const paychecksRemaining = diffsAllYear.weeks % 2 === 0 ? diffsAllYear.weeks / 2 : (diffsAllYear.weeks - 1) / 2
          const total = hourlyPayStatements.reduce((accumulator, currentVal) => parseInt(accumulator) + parseInt(currentVal))
          const average = total / hourlyPayStatements.length

          perPayPeriodHourly = average

          calculatedAnnualIncome = average * paychecksRemaining + parseInt(wagesYTD)
        }

        if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          const paychecksRemaining = diffsAllYear.weeks % 2 === 0 ? diffsAllYear.weeks / 2 : (diffsAllYear.weeks - 1) / 2
          const total = hourlyPayStatements.reduce((accumulator, currentVal) => parseInt(accumulator) + parseInt(currentVal))
          const average = total / hourlyPayStatements.length

          perPayPeriodHourly = average

          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31' ? average * paychecksRemaining + parseInt(wagesYTD)
            : average * (endDate.diff(dateLastPaid, 'days') / 14) + parseInt(wagesYTD)
        }

        if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          const paychecksRemaining = diffsPartial.weeks % 2 === 0 ? diffsPartial.weeks / 2 : (diffsPartial.weeks - 1) / 2

          perPayPeriodHourly = hourlyWage * hours

          calculatedAnnualIncome = paychecksRemaining * (parseInt(hourlyWage) * parseInt(hours))
        }
      } else if (incomeType === 'pension') {
        if (pensionScenarios.showTimePeriodOfPension(values, index) && timePeriodOfJob === 'allYear') {
          const paychecksRemaining = diffsAllYear.weeks % 2 === 0 ? diffsAllYear.weeks / 2 : (diffsAllYear.weeks - 1) / 2

          calculatedAnnualIncome = paychecksRemaining * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (pensionScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          const paychecksRemaining = diffsAllYear.weeks % 2 === 0 ? diffsAllYear.weeks / 2 : (diffsAllYear.weeks - 1) / 2
          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? paychecksRemaining * wagesPerPayPeriod + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / 14) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (pensionScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          const paychecksRemaining = diffsPartial.weeks % 2 === 0 ? diffsPartial.weeks / 2 : (diffsPartial.weeks - 1) / 2

          calculatedAnnualIncome = parseInt(pensionEachPayment) * paychecksRemaining
        }
      }
      break
    case 'twiceMonthly':
      if (incomeType === 'salary') {
        if (salaryScenarios.showTimePeriodOfJob(values, index) && timePeriodOfJob === 'allYear') {
          calculatedAnnualIncome = (diffsAllYear.months * 2) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? (diffsAllYear.months * 2) * wagesPerPayPeriod + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / (365 / 24)) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          calculatedAnnualIncome = (parseInt(annualSalary) / 24) * (diffsPartial.months * 2)
        }
      } else if (incomeType === 'hourly') {
        if (hourlyScenarios.showTimePeriodOfJob(values, index) && timePeriodOfJob === 'allYear') {
          const total = hourlyPayStatements.reduce((accumulator, currentVal) => parseInt(accumulator) + parseInt(currentVal))
          const average = total / hourlyPayStatements.length

          perPayPeriodHourly = average

          calculatedAnnualIncome = average * (diffsAllYear.months * 2) + parseInt(wagesYTD)
        }

        if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          const total = hourlyPayStatements.reduce((accumulator, currentVal) => parseInt(accumulator) + parseInt(currentVal))
          const average = total / hourlyPayStatements.length

          perPayPeriodHourly = average

          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? average * (diffsAllYear.months * 2) + parseInt(wagesYTD)
            : average * (endDate.diff(dateLastPaid, 'days') / (365 / 24)) + parseInt(wagesYTD)
        }

        if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          perPayPeriodHourly = hourlyWage * hours

          calculatedAnnualIncome = (diffsPartial.months * 2) * (parseInt(hourlyWage) * parseInt(hours))
        }
      } else if (incomeType === 'pension') {
        if (pensionScenarios.showTimePeriodOfPension(values, index) && timePeriodOfJob === 'allYear') {
          calculatedAnnualIncome = (diffsAllYear.months * 2) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (pensionScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? (diffsAllYear.months * 2) * wagesPerPayPeriod + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / (365 / 24)) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (pensionScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          calculatedAnnualIncome = parseInt(pensionEachPayment) * (diffsPartial.months * 2)
        }
      }
      break
    case 'monthly':
      if (incomeType === 'salary') {
        if (salaryScenarios.showTimePeriodOfJob(values, index) && timePeriodOfJob === 'allYear') {
          calculatedAnnualIncome = diffsAllYear.months * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? diffsAllYear.months * wagesPerPayPeriod + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / (365 / 12)) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          calculatedAnnualIncome = (parseInt(annualSalary) / 12) * diffsPartial.months
        }
      } else if (incomeType === 'hourly') {
        if (hourlyScenarios.showTimePeriodOfJob(values, index) && timePeriodOfJob === 'allYear') {
          const total = hourlyPayStatements.reduce((accumulator, currentVal) => parseInt(accumulator) + parseInt(currentVal))
          const average = total / hourlyPayStatements.length

          perPayPeriodHourly = average

          calculatedAnnualIncome = average * diffsAllYear.months + parseInt(wagesYTD)
        }

        if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          const total = hourlyPayStatements.reduce((accumulator, currentVal) => parseInt(accumulator) + parseInt(currentVal))
          const average = total / hourlyPayStatements.length

          perPayPeriodHourly = average

          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? average * diffsAllYear.months + parseInt(wagesYTD)
            : average * (endDate.diff(dateLastPaid, 'days') / (365 / 12)) + parseInt(wagesYTD)
        }

        if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          perPayPeriodHourly = hourlyWage * hours

          calculatedAnnualIncome = diffsPartial.months * (parseInt(hourlyWage) * parseInt(hours))
        }
      } else if (incomeType === 'pension') {
        if (pensionScenarios.showTimePeriodOfPension(values, index) && timePeriodOfJob === 'allYear') {
          calculatedAnnualIncome = diffsAllYear.months * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (pensionScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'currentPortion') {
          calculatedAnnualIncome = endDate.format('MM/DD') === '12/31'
            ? diffsAllYear.months * wagesPerPayPeriod + parseInt(wagesYTD)
            : (endDate.diff(dateLastPaid, 'days') / (365 / 12)) * wagesPerPayPeriod + parseInt(wagesYTD)
        }

        if (pensionScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
          calculatedAnnualIncome = parseInt(pensionEachPayment) * diffsPartial.months
        }
      }
      break
    default:
      calculatedAnnualIncome = 0
  }

  let correctedAnnualIncome = calculatedAnnualIncome

  if ((hourlyScenarios.showCorrectedWages(values, index, param)
    || salaryScenarios.showCorrectedWages(values, index, param)
    || pensionScenarios.showCorrectedWages(values, index, param))
    && values.jobs[index].correctedWages !== '') {
    correctedAnnualIncome = parseInt(values.jobs[index].correctedWages)
  }

  return { calculatedAnnualIncome, correctedAnnualIncome, perPayPeriodHourly }
}

export default getAnnualIncome
