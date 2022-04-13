import moment from 'moment'
import { futureJobCheck, calculateNoOfDaysPerPP } from '../../../../calculations/twe/utils/income/getTotalIncome'
import { getToday } from '../../../../helpers/dateHelper'

// HELPERS
export const isPast = (values, index, param) => {
  return (moment(new Date(values?.jobs[index]?.dateRange?.startDate), 'MM/DD/YYYY').isBefore(moment(getToday(param)))
    && moment(new Date(values?.jobs[index]?.dateRange?.endDate), 'MM/DD/YYYY').isBefore(moment(getToday(param))))
}

export const isFuture = (values, index, param) => {
  return (moment(new Date(values?.jobs[index]?.dateRange?.startDate)).isAfter(moment(getToday(param)))
    && moment(new Date(values?.jobs[index]?.dateRange?.endDate), 'MM/DD/YYYY').isAfter(moment(getToday(param))))
}

export const isCurrentPortion = (values, index, param) => {
  return (moment(new Date(values?.jobs[index]?.dateRange?.startDate), 'MM/DD/YYYY').isBefore(moment(getToday(param)))
    && moment(new Date(values?.jobs[index]?.dateRange?.endDate), 'MM/DD/YYYY').isAfter(moment(getToday(param))))
}

// Function to determine if an income source is past, future, or current portion
export const getIncomeTimeframe = (values, index, param) => {
  let timeFrame = null

  if (values?.jobs[index]?.timePeriodOfJob === 'allYear') {
    timeFrame = 'allYear'
  } else if (values?.jobs[index]?.dateRange.startDate !== '' && values?.jobs[index]?.dateRange.endDate !== '') {
    if (isPast(values, index, param)) {
      timeFrame = 'past'
    } else if (isFuture(values, index, param) || futureJobCheck(values?.jobs[index]?.dateRange?.startDate, calculateNoOfDaysPerPP(values?.jobs[index]?.payFrequency), param)) {
      timeFrame = 'future'
    } else {
      timeFrame = 'currentPortion'
    }
  }

  return timeFrame
}
