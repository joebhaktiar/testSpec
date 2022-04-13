import moment from 'moment'
import { formatMoney } from '../../../helpers'
import getAnnualIncome from '../helpers/getAnnualIncome'
import * as ToolTips from '../Structure/ToolTipsHtml'
import * as salaryScenarios from './scenarios/salaryScenarios'
import * as pensionScenarios from './scenarios/pensionScenarios'
import * as hourlyScenarios from './scenarios/hourlyScenarios'
import * as ssiScenarios from './scenarios/ssiScenarios'
import { isPast, isFuture, isCurrentPortion, getIncomeTimeframe } from './scenarios/helpers'
import { getToday } from '../../../helpers/dateHelper'

const getDateRange = (values, index, param) => {
  const today = param.today ? new Date(param.today) : new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const currentYear = param.current_year

  let minFromDate = moment(`12/31/${currentYear - 1}`)
  let maxFromDate = moment(`01/1/${currentYear}`)
  let minToDate = moment(`12/31/${currentYear - 1}`)
  let maxToDate = moment(`01/1/${currentYear + 1}`)
  let focusedDate = moment(getToday(param))

  if (values.jobs[index].incomeType === 'ssi') {
    minFromDate = moment(`01/01/${currentYear}`)
    maxFromDate = moment(`01/01/${currentYear + 1}`)
    minToDate = moment(`01/01/${currentYear - 1}`)
    maxToDate = moment(`01/01/${currentYear + 1}`)
    focusedDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
  } else {
    switch (values.jobs[index].timePeriodOfJob) {
      case 'currentPortion':
        minFromDate = moment(`01/01/${currentYear}`)
        maxFromDate = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
        minToDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        maxToDate = moment(`01/01/${currentYear} + 1`)
        focusedDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        break
      case 'past':
        minFromDate = moment(`01/01/${currentYear}`)
        maxFromDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        minToDate = moment(`01/01/${currentYear}`)
        maxToDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
        focusedDate = moment(`${currentMonth}/${currentDay - 1}/${currentYear}`)
        break
      case 'future':
        minFromDate = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
        maxFromDate = moment(`01/01/${currentYear + 1}`)
        minToDate = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
        maxToDate = moment(`01/01/${currentYear + 1}`)
        focusedDate = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
        break
      default:
        minFromDate = moment(`01/01/${currentYear}`)
        maxFromDate = moment(`01/01/${currentYear + 1}`)
        minToDate = moment(`01/01/${currentYear}`)
        maxToDate = moment(`01/01/${currentYear + 1}`)
        focusedDate = moment(`${currentMonth}/${currentDay}/${currentYear}`)
    }
  }

  return {
    minFromDate,
    maxFromDate,
    minToDate,
    maxToDate,
    focusedDate
  }
}

const getDateLastPayPeriodRange = (values, index, param) => {
  const today = param.today ? new Date(param.today) : new Date()
  const currentMonth = today.getMonth() + 1
  const currentDay = today.getDate()
  const currentYear = param.current_year

  let firstDate = moment(`12/31/${currentYear - 1}`)
  let lowerLimit = moment(`12/31/${currentYear - 1}`)
  let upperLimit = moment(`1/1/${currentYear + 1}`)

  switch (getIncomeTimeframe(values, index, param)) {
    case 'currentPortion':
      firstDate = moment(values.jobs[index].dateRange.startDate)
      lowerLimit = firstDate
      upperLimit = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)

      break
    default:
      lowerLimit = moment(currentMonth === 1 ? `12/01/${currentYear - 1}` : `01/01/${currentYear}`)
      upperLimit = moment(`${currentMonth}/${currentDay + 1}/${currentYear}`)
  }

  return { lowerLimit, upperLimit }
}

// FORM ELEMENTS
export const salaryFormElements = (values, site, lang, langCode, index, setFieldValue, errors, param) => {
  const getShow = (values, index, errors, questionScenario) => {
    if (salaryScenarios.showDateRange(values, index)
      && errors
      && errors?.jobs
      && (errors?.jobs[index]?.dateRange?.startDate || errors?.jobs[index]?.dateRange?.endDate)) {
      return false
    }

    if (salaryScenarios.showDateLastPayPeriod(values, index, param)
      && errors
      && errors?.jobs
      && errors?.jobs[index]?.dateLastPayPeriod) {
      return false
    }

    return questionScenario
  }

  const getDateRangeLabel = (values, index) => {
    let dateRangeLabel = `incomeWithholding.label.dateRange${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Past`

    if (values.jobs[index].timePeriodOfJob === 'past') {
      dateRangeLabel = `incomeWithholding.label.dateRange${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Past`
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      dateRangeLabel = `incomeWithholding.label.dateRange${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    } else if (values.jobs[index].timePeriodOfJob === 'currentPortion') {
      dateRangeLabel = `incomeWithholding.label.dateRange${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    }

    return dateRangeLabel
  }

  const getPayFrequencyLabel = (values, index) => {
    let payFrequencyLabel = `incomeWithholding.label.payFrequency${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`

    if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      payFrequencyLabel = `incomeWithholding.label.payFrequency${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      payFrequencyLabel = `incomeWithholding.label.payFrequency${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    }

    return payFrequencyLabel
  }

  const getIsIncomeAmountCorrect = (values, index) => {
    let isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrect${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`

    if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrect${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrect${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    }

    return isIncomeAmountCorrect
  }

  const getRetirementLabel = (values, index) => {
    let retirementLabel = site.forms.aboutYou.values.filingStatus === 'married'
      ? 'incomeWithholding.label.retirementAllYearMFJ'
      : 'incomeWithholding.label.retirementAllYear'

    if (values.jobs[index].timePeriodOfJob === 'past') {
      retirementLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.retirementPastMFJ'
        : 'incomeWithholding.label.retirementPast'
    } else if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      retirementLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.retirementAllYearMFJ'
        : 'incomeWithholding.label.retirementAllYear'
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      retirementLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.retirementFutureMFJ'
        : 'incomeWithholding.label.retirementFuture'
    }

    return retirementLabel
  }

  const getCafeteriaPlanLabel = (values, index) => {
    let cafeterialPlanLabel = site.forms.aboutYou.values.filingStatus === 'married'
      ? 'incomeWithholding.label.cafeterialPlanAllYearMFJ'
      : 'incomeWithholding.label.cafeterialPlanAllYear'

    if (values.jobs[index].timePeriodOfJob === 'past') {
      cafeterialPlanLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.cafeterialPlanPastMFJ'
        : 'incomeWithholding.label.cafeterialPlanPast'
    } else if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      cafeterialPlanLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.cafeterialPlanAllYearMFJ'
        : 'incomeWithholding.label.cafeterialPlanAllYear'
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      cafeterialPlanLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.cafeterialPlanFutureMFJ'
        : 'incomeWithholding.label.cafeterialPlanFuture'
    }

    return cafeterialPlanLabel
  }

  const getBonusPastLabel = (values, index) => {
    let bonusPastLabel = site.forms.aboutYou.values.filingStatus === 'married'
      ? 'incomeWithholding.label.bonusPastAllYearMFJ'
      : 'incomeWithholding.label.bonusPastAllYear'

    if (values.jobs[index].timePeriodOfJob === 'past') {
      bonusPastLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.bonusPastPastMFJ'
        : 'incomeWithholding.label.bonusPastPast'
    } else if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      bonusPastLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.bonusPastAllYearMFJ'
        : 'incomeWithholding.label.bonusPastAllYear'
    }

    return bonusPastLabel
  }

  const getBonusFutureLabel = (values, index) => {
    let bonusFutureLabel = site.forms.aboutYou.values.filingStatus === 'married'
      ? 'incomeWithholding.label.bonusFutureAllYearMFJ'
      : 'incomeWithholding.label.bonusFutureAllYear'

    if (values.jobs[index].timePeriodOfJob === 'future') {
      bonusFutureLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.bonusFutureFutureMFJ'
        : 'incomeWithholding.label.bonusFutureFuture'
    } else if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      bonusFutureLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.bonusFutureAllYearMFJ'
        : 'incomeWithholding.label.bonusFutureAllYear'
    }

    return bonusFutureLabel
  }

  const getContributionsOptions = (values, index) => {
    if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'past') {
      return ([
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.retirement.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.retirement.info,
          name: `jobs.${index}.contributionsAndBonuses.retirement.checked`,
          label: lang(getRetirementLabel(values, index)),
          groupName: 'retirement',
          showFields: values.jobs[index].contributionsAndBonuses.retirement.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.retirement.checked`].open,
            ariaLabel: '401k - Help Tip',
            elements: () => ToolTips.retirementToolTip(),
            dataTestID: `retirement${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.retirement.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.retirement.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.retirementYTD'),
                name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amountYTD`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `retirement${index}YTD-${fieldArrIndex}`,
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.info,
          name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`,
          label: lang(getCafeteriaPlanLabel(values, index)),
          groupName: 'cafeteriaPlan',
          showFields: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`].open,
            ariaLabel: 'Cafeteria Plan - Help Tip',
            elements: () => ToolTips.cafeteriaPlanToolTip(),
            dataTestID: `cafeteriaPlan${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.cafeterialPlanYTD'),
                name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amountYTD`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `cafeteriaPlan${index}-${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.bonusPast.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.bonusPast.info,
          name: `jobs.${index}.contributionsAndBonuses.bonusPast.checked`,
          label: lang(getBonusPastLabel(values, index)),
          groupName: 'bonusPast',
          showFields: values.jobs[index].contributionsAndBonuses.bonusPast.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.bonusPast.checked`].open,
            ariaLabel: 'Bonus Past - Help Tip',
            elements: () => ToolTips.bonusPastToolTip(),
            dataTestID: `bonusPast${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.bonusPast.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.bonusPast.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.bonusCurrencyLabel'),
                name: `jobs.${index}.contributionsAndBonuses.bonusPast.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `bonusPast${index}-${fieldArrIndex}`,
              },
            ]
          )
        },
      ])
    }

    if (salaryScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
      return (
        [
          {
            checkedValue: values.jobs[index].contributionsAndBonuses.retirement.checked,
            fieldArray: values.jobs[index].contributionsAndBonuses.retirement.info,
            name: `jobs.${index}.contributionsAndBonuses.retirement.checked`,
            label: lang(getRetirementLabel(values, index)),
            groupName: 'retirement',
            showFields: values.jobs[index].contributionsAndBonuses.retirement.checked,
            disabled: values.jobs[index].noContributions.length > 0,
            noAdd: true,
            helpTip: {
              page: 'incomeWithholding',
              expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.retirement.checked`].open,
              ariaLabel: '401k - Help Tip',
              elements: () => ToolTips.retirementToolTip(),
              dataTestID: `retirement${index}`
            },
            handleChange: () => {
              if (values.jobs[index].contributionsAndBonuses.retirement.checked) {
                setFieldValue(`jobs.${index}.contributionsAndBonuses.retirement.info`, [{ amount: '' }])
              }
            },
            formElements: (fieldArrIndex) => (
              [
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.retirementPayPeriod'),
                  name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amount`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `retirement${index}-${fieldArrIndex}`,
                },
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.retirementYTD'),
                  name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amountYTD`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `retirement${index}YTD-${fieldArrIndex}`,
                },
              ]
            )
          },
          {
            checkedValue: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
            fieldArray: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.info,
            name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`,
            label: lang(getCafeteriaPlanLabel(values, index)),
            groupName: 'cafeteriaPlan',
            showFields: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
            disabled: values.jobs[index].noContributions.length > 0,
            helpTip: {
              page: 'incomeWithholding',
              expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`].open,
              ariaLabel: 'Cafeteria Plan - Help Tip',
              elements: () => ToolTips.cafeteriaPlanToolTip(),
              dataTestID: `cafeteriaPlan${index}`
            },
            handleChange: () => {
              if (values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked) {
                setFieldValue(`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info`, [{ amount: '' }])
              }
            },
            formElements: (fieldArrIndex, remove) => (
              [
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.cafeterialPlanPayPeriod'),
                  name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amount`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `cafeteriaPlan${index}-${fieldArrIndex}`,
                  removeBtnObj: {
                    dataTestID: `deleteButton${fieldArrIndex}`,
                    ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                    fieldArrIndex,
                    remove,
                  }
                },
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.cafeterialPlanYTD'),
                  name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amountYTD`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `cafeteriaPlan${index}YTD-${fieldArrIndex}`,
                  removeBtnObj: {
                    dataTestID: `deleteButton${fieldArrIndex}`,
                    ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                    fieldArrIndex,
                    remove,
                  }
                },
              ]
            )
          },
          {
            checkedValue: values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
            fieldArray: values.jobs[index].contributionsAndBonuses.bonusFuture.info,
            name: `jobs.${index}.contributionsAndBonuses.bonusFuture.checked`,
            label: lang(getBonusFutureLabel(values, index)),
            groupName: 'bonusFuture',
            showFields: values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
            disabled: values.jobs[index].noContributions.length > 0,
            noAdd: true,
            helpTip: {
              page: 'incomeWithholding',
              expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.bonusFuture.checked`].open,
              ariaLabel: 'Future Bonus - Help Tip',
              elements: () => ToolTips.bonusFutureToolTip(),
              dataTestID: `bonusFuture${index}`
            },
            handleChange: () => {
              if (values.jobs[index].contributionsAndBonuses.bonusFuture.checked) {
                setFieldValue(`jobs.${index}.contributionsAndBonuses.bonusFuture.info`, [{ amount: '', employerWillWithhold: [] }])
              }
            },
            formElements: (fieldArrIndex) => (
              [
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.bonusCurrencyLabel'),
                  name: `jobs.${index}.contributionsAndBonuses.bonusFuture.info[${fieldArrIndex}].amount`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `bonusFuture${index}-${fieldArrIndex}`,
                },
                {
                  inputType: 'checkbox',
                  name: `jobs.${index}.contributionsAndBonuses.bonusFuture.info[${fieldArrIndex}]employerWillWithhold`,
                  options: [
                    {
                      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.bonusFutureEmployerWillWithholdMFJ' : 'incomeWithholding.label.bonusFutureEmployerWillWithhold'),
                      id: 'employerWillWithhold',
                      value: 'employerWillWithhold',
                      checkedValue: values?.jobs[index]?.contributionsAndBonuses?.bonusFuture?.info[fieldArrIndex]?.employerWillWithhold.includes('employerWillWithhold'),
                      dataTestId: `employerWillWithhold${index}`,
                    },
                  ]
                },
              ]
            )
          },
        ]
      )
    }

    return (
      [
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.retirement.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.retirement.info,
          name: `jobs.${index}.contributionsAndBonuses.retirement.checked`,
          label: lang(getRetirementLabel(values, index)),
          groupName: 'retirement',
          showFields: values.jobs[index].contributionsAndBonuses.retirement.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.retirement.checked`].open,
            ariaLabel: '401k - Help Tip',
            elements: () => ToolTips.retirementToolTip(),
            dataTestID: `retirement${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.retirement.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.retirement.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.retirementPayPeriod'),
                name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `retirement${index}-${fieldArrIndex}`,
              },
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.retirementYTD'),
                name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amountYTD`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `retirement${index}YTD-${fieldArrIndex}`,
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.info,
          name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`,
          label: lang(getCafeteriaPlanLabel(values, index)),
          groupName: 'cafeteriaPlan',
          showFields: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`].open,
            ariaLabel: 'Cafeteria Plan - Help Tip',
            elements: () => ToolTips.cafeteriaPlanToolTip(),
            dataTestID: `cafeteriaPlan${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.cafeterialPlanPayPeriod'),
                name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `cafeteriaPlan${index}-${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.cafeterialPlanYTD'),
                name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amountYTD`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `cafeteriaPlan${index}YTD-${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.bonusFuture.info,
          name: `jobs.${index}.contributionsAndBonuses.bonusFuture.checked`,
          label: lang(getBonusFutureLabel(values, index)),
          groupName: 'bonusFuture',
          showFields: values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.bonusFuture.checked`].open,
            ariaLabel: 'Future Bonus - Help Tip',
            elements: () => ToolTips.bonusFutureToolTip(),
            dataTestID: `bonusFuture${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.bonusFuture.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.bonusFuture.info`, [{ amount: '', employerWillWithhold: [] }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.bonusCurrencyLabel'),
                name: `jobs.${index}.contributionsAndBonuses.bonusFuture.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `bonusFuture${index}-${fieldArrIndex}`,
              },
              {
                inputType: 'checkbox',
                name: `jobs.${index}.contributionsAndBonuses.bonusFuture.info[${fieldArrIndex}]employerWillWithhold`,
                options: [
                  {
                    label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.bonusFutureEmployerWillWithholdMFJ' : 'incomeWithholding.label.bonusFutureEmployerWillWithhold'),
                    id: 'employerWillWithhold',
                    value: 'employerWillWithhold',
                    checkedValue: values?.jobs[index]?.contributionsAndBonuses?.bonusFuture?.info[fieldArrIndex]?.employerWillWithhold.includes('employerWillWithhold'),
                    dataTestId: `employerWillWithhold${index}`,
                  },
                ]
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.bonusPast.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.bonusPast.info,
          name: `jobs.${index}.contributionsAndBonuses.bonusPast.checked`,
          label: lang(getBonusPastLabel(values, index)),
          groupName: 'bonusPast',
          showFields: values.jobs[index].contributionsAndBonuses.bonusPast.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.bonusPast.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.bonusPast.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.bonusCurrencyLabel'),
                name: `jobs.${index}.contributionsAndBonuses.bonusPast.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `bonusPast${index}-${fieldArrIndex}`,
              },
            ]
          )
        },
      ]
    )
  }

  return ([
    {
      inputType: 'radio',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.timePeriodOfJobMFJ' : 'incomeWithholding.label.timePeriodOfJob'),
      name: `jobs.${index}.timePeriodOfJob`,
      id: 'timePeriodOfJob',
      required: true,
      show: salaryScenarios.showTimePeriodOfJob(values, index),
      className: 'mt-6',
      dataTestId: `timePeriodOfJob${index}`,
      options: [
        {
          id: `jobs.${index}.timePeriodOfJob-allYear`,
          value: 'allYear',
          label: lang('incomeWithholding.label.allYear'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob-currentPortion`,
          value: 'currentPortion',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.currentPortionMFJ' : 'incomeWithholding.label.currentPortion'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob-past`,
          value: 'past',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.pastMFJ' : 'incomeWithholding.label.past'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob-future`,
          value: 'future',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.futureMFJ' : 'incomeWithholding.label.future'),
        },
      ]
    },
    {
      inputType: 'dateRange',
      name: `jobs.${index}.dateRange`,
      label: lang(getDateRangeLabel(values, index)),
      required: true,
      dataTestId: `dateRange${index}`,
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.dateRange`].open,
        ariaLabel: 'Date Range - Help Tip',
        elements: () => ToolTips.dateRangeToolTip(),
      },
      show: salaryScenarios.showDateRange(values, index),
      fromLabel: lang('incomeWithholding.label.from'),
      toLabel: lang('incomeWithholding.label.to'),
      fromId: `jobs.${index}.dateRange.startDate`,
      toId: `jobs.${index}.dateRange.endDate`,
      fromPlaceholder: lang('global.placeholder.dateField'),
      toPlaceholder: lang('global.placeholder.dateField'),
      isRequired: true,
      index,
      startDateName: `jobs.${index}.dateRange.startDate`,
      endDateName: `jobs.${index}.dateRange.endDate`,
      minFromDate: getDateRange(values, index, param).minFromDate,
      maxFromDate: getDateRange(values, index, param).maxFromDate,
      minToDate: getDateRange(values, index, param).minToDate,
      maxToDate: getDateRange(values, index, param).maxToDate,
      focusedDate: getDateRange(values, index, param).focusedDate,
      langCode,
      fromHintText: lang('global.p.dateFieldHintText'),
      toHintText: lang('global.p.dateFieldHintText'),
    },
    {
      inputType: 'radio',
      label: lang(getPayFrequencyLabel(values, index)),
      name: `jobs.${index}.payFrequency`,
      id: 'payFrequency',
      required: true,
      show: (salaryScenarios.showDateRange(values, index)
        && errors && errors?.jobs
        && (errors?.jobs[index]?.dateRange?.startDate || errors?.jobs[index]?.dateRange?.endDate))
        ? false : salaryScenarios.showPayFrequency(values, index, param),
      className: 'mt-6',
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.payFrequency`].open,
        ariaLabel: 'Pay Frequency - Help Tip',
        elements: () => ToolTips.payFrequencyToolTip(),
      },
      dataTestId: `payFrequency${index}`,
      options: [
        {
          id: `jobs.${index}.payFrequency-weekly`,
          value: 'weekly',
          label: lang('incomeWithholding.label.weekly'),
        },
        {
          id: `jobs.${index}.payFrequency-biweekly`,
          value: 'biweekly',
          label: lang('incomeWithholding.label.biweekly'),
        },
        {
          id: `jobs.${index}.payFrequency-twiceMonthly`,
          value: 'twiceMonthly',
          label: lang('incomeWithholding.label.twiceMonthly'),
        },
        {
          id: `jobs.${index}.payFrequency-monthly`,
          value: 'monthly',
          label: lang('incomeWithholding.label.monthly'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'numOfDepHeading',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${salaryScenarios.showDateLastPayPeriod(values, index, param) ? 'inline-block' : 'hidden'}
        }`,
          text: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.h3.paystubTitleMFJ' : 'incomeWithholding.h3.paystubTitle'),
          dataTestID: `paystubTitle${index}`
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.annualSalaryMFJ' : 'incomeWithholding.label.annualSalary'),
      name: `jobs.${index}.annualSalary`,
      show: getShow(values, index, errors, salaryScenarios.showAnnualSalary(values, index, param)),
      required: true,
      placeholder: lang('global.placeholder.amount'),
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.annualSalary`].open,
        ariaLabel: 'Annual Salary - Help Tip',
        elements: () => ToolTips.annualSalaryToolTip(),
      },
      className: 'mt-6',
      dataTestId: `annualSalary${index}`,
    },
    {
      inputType: 'dateField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.dateLastPayPeriodMFJ' : 'incomeWithholding.label.dateLastPayPeriod'),
      name: `jobs.${index}.dateLastPayPeriod`,
      id: `jobs.${index}.dateLastPayPeriod`,
      placeholder: lang('global.placeholder.dateField'),
      show: salaryScenarios.showDateLastPayPeriod(values, index, param),
      required: true,
      className: 'mt-6',
      lowerLimit: getDateLastPayPeriodRange(values, index, param).lowerLimit,
      upperLimit: getDateLastPayPeriodRange(values, index, param).upperLimit,
      focusedDate: moment(getToday(param)),
      langCode,
      hintText: lang('global.p.dateFieldHintText'),
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.wagesPerPayPeriod'),
      name: `jobs.${index}.wagesPerPayPeriod`,
      show: getShow(values, index, errors, salaryScenarios.showWagesPaidLastPayPeriod(values, index, param)),
      required: true,
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `wagesPerPayPeriod${index}`,
    },
    {
      inputType: 'currencyField',
      label: salaryScenarios.showWagesPaidYTDPast(values, index, param)
        ? lang('incomeWithholding.label.wagesYTDPast') : lang('incomeWithholding.label.wagesYTD'),
      name: `jobs.${index}.wagesYTD`,
      show: getShow(values, index, errors, salaryScenarios.showWagesPaidYTD(values, index, param) || salaryScenarios.showWagesPaidYTDPast(values, index, param)),
      required: true,
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `wagesYTD${index}`,
    },
    {
      inputType: 'radio',
      label: lang(getIsIncomeAmountCorrect(values, index), { ':income': formatMoney(getAnnualIncome(site, index, param).calculatedAnnualIncome) }),
      name: `jobs.${index}.isIncomeAmountCorrect`,
      id: 'isIncomeAmountCorrect',
      required: true,
      show: getShow(values, index, errors, salaryScenarios.showIsIncomeAmountCorrect(values, index, param)),
      className: 'mt-6',
      dataTestId: `isIncomeAmountCorrect${index}`,
      options: [
        {
          id: `jobs.${index}.isIncomeAmountCorrect - yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `jobs.${index}.isIncomeAmountCorrect - no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.correctedWagesMFJ' : 'incomeWithholding.label.correctedWages'),
      name: `jobs.${index}.correctedWages`,
      required: true,
      show: getShow(values, index, errors, salaryScenarios.showCorrectedWages(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `correctedWages${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.taxesPerPayPeriod'),
      name: `jobs.${index}.taxesPerPayPeriod`,
      required: true,
      show: getShow(values, index, errors, salaryScenarios.showTaxesPaidLastPayPeriod(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.taxesPerPayPeriod`].open,
        ariaLabel: 'Taxes per pay period - Help Tip',
        elements: () => ToolTips.taxesPerPayPeriodToolTip(),
      },
      className: 'mt-6',
      dataTestId: `taxesPerPayPeriod${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.taxesYTD'),
      name: `jobs.${index}.taxesYTD`,
      required: true,
      show: getShow(values, index, errors, salaryScenarios.showTaxesPaidYTD(values, index, param) || salaryScenarios.showTaxesPaidYTDPast(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `taxesYTD${index}`,
    },
    {
      inputType: 'conditionalCheckbox',
      label: lang('incomeWithholding.label.contributionsAndBonuses'),
      name: `jobs.${index}.contributionsAndBonuses`,
      placeholder: lang('global.placeholder.amount'),
      show: getShow(values, index, errors, salaryScenarios.showContributionsAndBonuses(values, index, param)),
      className: 'inline',
      pushObject: {
        amount: ''
      },
      options: getContributionsOptions(values, index),
    },
    {
      inputType: 'checkbox',
      name: `jobs.${index}.noContributions`,
      dataTestId: `noContributionsCheckboxGroup${index}`,
      className: 'mt-3',
      show: getShow(values, index, errors, salaryScenarios.showContributionsAndBonuses(values, index, param)),
      options: [
        {
          id: 'none',
          value: 'none',
          label: lang('incomeWithholding.label.noContibutions'),
          checkedValue: values.jobs[index].noContributions.includes('none'),
          dataTestId: 'none',
          className: 'mt-0',
          disabled: values.jobs[index].contributionsAndBonuses.retirement.checked
            || values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked
            || values.jobs[index].contributionsAndBonuses.bonusPast.checked
            || values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
        },
      ]
    },
  ])
}

export const pensionFormElements = (values, site, lang, langCode, index, errors, param) => {
  const getShow = (values, index, errors, questionScenario) => {
    if (pensionScenarios.showDateRange(values, index)
      && errors
      && errors?.jobs
      && (errors?.jobs[index]?.dateRange?.startDate || errors?.jobs[index]?.dateRange?.endDate)) {
      return false
    }

    if (pensionScenarios.showDateLastPayPeriod(values, index, param)
      && errors
      && errors?.jobs
      && errors?.jobs[index]?.dateLastPayPeriod) {
      return false
    }

    return questionScenario
  }

  const getPayFrequencyLabel = (values, index) => {
    let payFrequencyLabel = `incomeWithholding.label.payFrequencyPension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`

    if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      payFrequencyLabel = `incomeWithholding.label.payFrequencyPension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      payFrequencyLabel = `incomeWithholding.label.payFrequencyPension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    }

    return payFrequencyLabel
  }

  const getWagesPerPayPeriodLabel = (values, index) => {
    let payFrequencyLabel = 'incomeWithholding.label.wagesPerPayPeriodPensionAllYear'

    if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      payFrequencyLabel = 'incomeWithholding.label.wagesPerPayPeriodPensionAllYear'
    }

    return payFrequencyLabel
  }

  const getWagesYTDPensionLabel = (values, index) => {
    let payFrequencyLabel = 'incomeWithholding.label.wagesYTDPensionAllYear'

    if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      payFrequencyLabel = 'incomeWithholding.label.wagesYTDPensionAllYear'
    } else if (values.jobs[index].timePeriodOfJob === 'past') {
      payFrequencyLabel = 'incomeWithholding.label.wagesYTDPensionPast'
    }

    return payFrequencyLabel
  }

  const getIsIncomeAmountCorrect = (values, index) => {
    let isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrectPension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`

    if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrectPension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrectPension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    }

    return isIncomeAmountCorrect
  }

  const getDateRangeLabel = (values, index) => {
    let dateRangeLabel = `incomeWithholding.label.dateRangePension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Past`

    if (values.jobs[index].timePeriodOfJob === 'past') {
      dateRangeLabel = `incomeWithholding.label.dateRangePension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Past`
    } else if (values.jobs[index].timePeriodOfJob === 'future' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      dateRangeLabel = `incomeWithholding.label.dateRangePension${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    }

    return dateRangeLabel
  }

  return ([
    {
      inputType: 'radio',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.timePeriodOfPensionMFJ' : 'incomeWithholding.label.timePeriodOfPension'),
      name: `jobs.${index}.timePeriodOfJob`,
      id: 'timePeriodOfJob',
      required: true,
      show: pensionScenarios.showTimePeriodOfPension(values, index),
      className: 'mt-6',
      dataTestId: `timePeriodOfJob${index}`,
      options: [
        {
          id: `jobs.${index}.timePeriodOfJob - allYear`,
          value: 'allYear',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.allYearPensionMFJ' : 'incomeWithholding.label.allYearPension'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob - past`,
          value: 'past',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.pastPensionMFJ' : 'incomeWithholding.label.pastPension'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob - future`,
          value: 'future',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.futurePensionMFJ' : 'incomeWithholding.label.futurePension'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob - currentPortion`,
          value: 'currentPortion',
          label: lang('incomeWithholding.label.currentPortionPension'),
        },
      ]
    },
    {
      inputType: 'dateRange',
      name: `jobs.${index}.dateRange`,
      label: lang(getDateRangeLabel(values, index)),
      required: true,
      dataTestId: `dateRange${index}`,
      show: pensionScenarios.showDateRange(values, index),
      fromLabel: lang('incomeWithholding.label.from'),
      toLabel: lang('incomeWithholding.label.to'),
      fromId: `jobs.${index}.dateRange.startDate`,
      toId: `jobs.${index}.dateRange.endDate`,
      fromPlaceholder: lang('global.placeholder.dateField'),
      toPlaceholder: lang('global.placeholder.dateField'),
      isRequired: true,
      index,
      startDateName: `jobs.${index}.dateRange.startDate`,
      endDateName: `jobs.${index}.dateRange.endDate`,
      minFromDate: getDateRange(values, index, param).minFromDate,
      maxFromDate: getDateRange(values, index, param).maxFromDate,
      minToDate: getDateRange(values, index, param).minToDate,
      maxToDate: getDateRange(values, index, param).maxToDate,
      focusedDate: getDateRange(values, index, param).focusedDate,
      langCode,
      fromHintText: lang('global.p.dateFieldHintText'),
      toHintText: lang('global.p.dateFieldHintText'),
    },
    {
      inputType: 'radio',
      label: lang(getPayFrequencyLabel(values, index)),
      name: `jobs.${index}.payFrequency`,
      id: 'payFrequency',
      required: true,
      show: (pensionScenarios.showDateRange(values, index)
        && errors && errors?.jobs
        && (errors?.jobs[index]?.dateRange?.startDate || errors?.jobs[index]?.dateRange?.endDate))
        ? false : pensionScenarios.showPayFrequency(values, index, param),
      className: 'mt-6',
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.payFrequency`].open,
        ariaLabel: 'Pay Frequency - Help Tip',
        elements: () => ToolTips.pensionPayFrequencyToolTip(),
      },
      dataTestId: `payFrequency${index}`,
      options: [
        {
          id: `jobs.${index}.payFrequency - weekly`,
          value: 'weekly',
          label: lang('incomeWithholding.label.weekly'),
        },
        {
          id: `jobs.${index}.payFrequency - biweekly`,
          value: 'biweekly',
          label: lang('incomeWithholding.label.biweekly'),
        },
        {
          id: `jobs.${index}.payFrequency - twiceMonthly`,
          value: 'twiceMonthly',
          label: lang('incomeWithholding.label.twiceMonthly'),
        },
        {
          id: `jobs.${index}.payFrequency - monthly`,
          value: 'monthly',
          label: lang('incomeWithholding.label.monthly'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'numOfDepHeading',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${pensionScenarios.showDateLastPayPeriod(values, index, param) ? 'inline-block' : 'hidden'}`,
          text: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.h3.paystubTitlePensionMFJ' : 'incomeWithholding.h3.paystubTitlePension'),
          dataTestID: `paystubTitle${index}`
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.pensionEachPaymentMFJ' : 'incomeWithholding.label.pensionEachPayment'),
      name: `jobs.${index}.pensionEachPayment`,
      required: true,
      show: getShow(values, index, errors, pensionScenarios.showPensionEachPayment(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `pensionEachPayment${index}`,
    },
    {
      inputType: 'dateField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.dateLastPayPeriodPensionMFJ' : 'incomeWithholding.label.dateLastPayPeriodPension'),
      name: `jobs.${index}.dateLastPayPeriod`,
      id: `jobs.${index}.dateLastPayPeriod`,
      placeholder: lang('global.placeholder.dateField'),
      show: pensionScenarios.showDateLastPayPeriod(values, index, param),
      required: true,
      className: 'mt-6',
      lowerLimit: getDateLastPayPeriodRange(values, index, param).lowerLimit,
      upperLimit: getDateLastPayPeriodRange(values, index, param).upperLimit,
      focusedDate: moment(getToday(param)),
      langCode,
      hintText: lang('global.p.dateFieldHintText'),
    },
    {
      inputType: 'currencyField',
      label: lang(getWagesPerPayPeriodLabel(values, index)),
      name: `jobs.${index}.wagesPerPayPeriod`,
      show: getShow(values, index, errors, pensionScenarios.showWagesPaidLastPayPeriod(values, index, param)),
      required: true,
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `wagesPerPayPeriod${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang(getWagesYTDPensionLabel(values, index)),
      name: `jobs.${index}.wagesYTD`,
      show: getShow(values, index, errors, pensionScenarios.showWagesPaidYTD(values, index, param)),
      required: true,
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `wagesYTD${index}`,
    },
    {
      inputType: 'radio',
      label: lang(getIsIncomeAmountCorrect(values, index), { ':income': formatMoney(getAnnualIncome(site, index, param).calculatedAnnualIncome) }),
      name: `jobs.${index}.isIncomeAmountCorrect`,
      id: 'isIncomeAmountCorrect',
      required: true,
      show: getShow(values, index, errors, pensionScenarios.showIsIncomeAmountCorrect(values, index, param)),
      className: 'mt-6',
      dataTestId: `isIncomeAmountCorrect${index}`,
      options: [
        {
          id: `jobs.${index}.isIncomeAmountCorrect - yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `jobs.${index}.isIncomeAmountCorrect - no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.correctedWagesPensionMFJ' : 'incomeWithholding.label.correctedWagesPension'),
      name: `jobs.${index}.correctedWages`,
      required: true,
      show: getShow(values, index, errors, pensionScenarios.showCorrectedWages(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `correctedWages${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.taxesPerPayPeriod'),
      name: `jobs.${index}.taxesPerPayPeriod`,
      required: true,
      show: getShow(values, index, errors, pensionScenarios.showTaxesPaidLastPayPeriod(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.taxesPerPayPeriod`].open,
        ariaLabel: 'Taxes per pay period - Help Tip',
        elements: () => ToolTips.taxesPerPayPeriodToolTip(),
      },
      className: 'mt-6',
      dataTestId: `taxesPerPayPeriod${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.taxesYTD'),
      name: `jobs.${index}.taxesYTD`,
      required: true,
      show: getShow(values, index, errors, pensionScenarios.showTaxesPaidYTD(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `taxesYTD${index}`,
    },
    {
      inputType: 'radio',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.contributeToCafeteriaPlanMFJ' : 'incomeWithholding.label.contributeToCafeteriaPlan'),
      name: `jobs.${index}.contributeToCafeteriaPlan`,
      id: 'contributeToCafeteriaPlan',
      required: true,
      show: getShow(values, index, errors, pensionScenarios.showcontributeToCafeteriaPlan(values, index, param)),
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributeToCafeteriaPlan`].open,
        ariaLabel: 'Contribute To Cafeteria Plan - Help Tip',
        elements: () => ToolTips.cafeteriaPlanToolTip(),
      },
      className: 'mt-6',
      dataTestId: `contributeToCafeteriaPlan${index}`,
      options: [
        {
          id: `jobs.${index}.contributeToCafeteriaPlan - yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `jobs.${index}.contributeToCafeteriaPlan - no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.cafeteriaPlanPayPeriodAmount'),
      name: `jobs.${index}.cafeteriaPlanPayPeriodAmount`,
      required: true,
      show: getShow(values, index, errors, pensionScenarios.showCafeteriaPlanPayPeriodAmount(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `cafeteriaPlanPayPeriodAmount${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.cafeteriaPlanYTDAmount'),
      name: `jobs.${index}.cafeteriaPlanYTDAmount`,
      required: true,
      show: getShow(values, index, errors, pensionScenarios.showCafeteriaPlanYTDAmount(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `cafeteriaPlanYTDAmount${index}`,
    },
  ])
}

export const hourlyFormElements = (values, site, lang, langCode, index, setFieldValue, errors, param) => {
  const getShow = (values, index, errors, questionScenario) => {
    if (hourlyScenarios.showDateRange(values, index, param)
      && errors
      && errors?.jobs
      && (errors?.jobs[index]?.dateRange?.startDate || errors?.jobs[index]?.dateRange?.endDate)) {
      return false
    }

    if (hourlyScenarios.showDateLastPayPeriod(values, index, param)
      && errors
      && errors?.jobs
      && errors?.jobs[index]?.dateLastPayPeriod) {
      return false
    }

    return questionScenario
  }

  const getDateRangeLabel = (values, index) => {
    let dateRangeLabel = `incomeWithholding.label.dateRange${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Past`

    if (values.jobs[index].timePeriodOfJob === 'past') {
      dateRangeLabel = `incomeWithholding.label.dateRange${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Past`
    } else if (values.jobs[index].timePeriodOfJob === 'future' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      dateRangeLabel = `incomeWithholding.label.dateRange${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    }

    return dateRangeLabel
  }

  const getPayFrequencyLabel = (values, index) => {
    let payFrequencyLabel = `incomeWithholding.label.payFrequency${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`

    if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      payFrequencyLabel = `incomeWithholding.label.payFrequency${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      payFrequencyLabel = `incomeWithholding.label.payFrequency${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    }

    return payFrequencyLabel
  }

  const getIsIncomeAmountCorrect = (values, index) => {
    let isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrectHourly${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYearlast2To3Statements`

    if (hourlyScenarios.showPayStatementOptions(values, index, param) && values.jobs[index].payStatementOptions === 'last2To3Statements') {
      if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
        isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrectHourly${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYearlast2To3Statements`
      }
    } else {
      if (values.jobs[index].timePeriodOfJob === 'allYear') {
        isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrectHourly${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`
      } else if (values.jobs[index].timePeriodOfJob === 'future') {
        isIncomeAmountCorrect = `incomeWithholding.label.isIncomeAmountCorrectHourly${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
      }
    }

    return isIncomeAmountCorrect
  }

  const getRetirementLabel = (values, index) => {
    let retirementLabel = site.forms.aboutYou.values.filingStatus === 'married'
      ? 'incomeWithholding.label.retirementAllYearMFJ'
      : 'incomeWithholding.label.retirementAllYear'

    if (values.jobs[index].timePeriodOfJob === 'past') {
      retirementLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.retirementPastMFJ'
        : 'incomeWithholding.label.retirementPast'
    } else if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      retirementLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.retirementAllYearMFJ'
        : 'incomeWithholding.label.retirementAllYear'
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      retirementLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.retirementFutureMFJ'
        : 'incomeWithholding.label.retirementFuture'
    }

    return retirementLabel
  }

  const getCafeteriaPlanLabel = (values, index) => {
    let cafeterialPlanLabel = site.forms.aboutYou.values.filingStatus === 'married'
      ? 'incomeWithholding.label.cafeterialPlanAllYearMFJ'
      : 'incomeWithholding.label.cafeterialPlanAllYear'

    if (values.jobs[index].timePeriodOfJob === 'past') {
      cafeterialPlanLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.cafeterialPlanPastMFJ'
        : 'incomeWithholding.label.cafeterialPlanPast'
    } else if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      cafeterialPlanLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.cafeterialPlanAllYearMFJ'
        : 'incomeWithholding.label.cafeterialPlanAllYear'
    } else if (values.jobs[index].timePeriodOfJob === 'future') {
      cafeterialPlanLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.cafeterialPlanFutureMFJ'
        : 'incomeWithholding.label.cafeterialPlanFuture'
    }

    return cafeterialPlanLabel
  }

  const getBonusPastLabel = (values, index) => {
    let bonusPastLabel = site.forms.aboutYou.values.filingStatus === 'married'
      ? 'incomeWithholding.label.bonusPastAllYearMFJ'
      : 'incomeWithholding.label.bonusPastAllYear'

    if (values.jobs[index].timePeriodOfJob === 'past') {
      bonusPastLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.bonusPastPastMFJ'
        : 'incomeWithholding.label.bonusPastPast'
    } else if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      bonusPastLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.bonusPastAllYearMFJ'
        : 'incomeWithholding.label.bonusPastAllYear'
    }

    return bonusPastLabel
  }

  const getBonusFutureLabel = (values, index) => {
    let bonusFutureLabel = site.forms.aboutYou.values.filingStatus === 'married'
      ? 'incomeWithholding.label.bonusFutureAllYearMFJ'
      : 'incomeWithholding.label.bonusFutureAllYear'

    if (values.jobs[index].timePeriodOfJob === 'future') {
      bonusFutureLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.bonusFutureFutureMFJ'
        : 'incomeWithholding.label.bonusFutureFuture'
    } else if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      bonusFutureLabel = site.forms.aboutYou.values.filingStatus === 'married'
        ? 'incomeWithholding.label.bonusFutureAllYearMFJ'
        : 'incomeWithholding.label.bonusFutureAllYear'
    }

    return bonusFutureLabel
  }

  const getWagesYTDLabel = (values, index) => {
    let wagesYTDLabel = 'incomeWithholding.label.wagesYTDHourlyAverage'

    if (values.jobs[index].timePeriodOfJob === 'allYear' || values.jobs[index].timePeriodOfJob === 'currentPortion') {
      if (values.jobs[index].payStatementOptions === 'lastStatement') {
        wagesYTDLabel = 'incomeWithholding.label.wagesYTDHourlyAverage'
      } else {
        wagesYTDLabel = `incomeWithholding.label.wagesYTDHourly${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}`
      }
    } else if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'past') {
      wagesYTDLabel = 'incomeWithholding.label.wagesYTDPast'
    }

    return wagesYTDLabel
  }

  const getContributionsOptions = (values, index) => {
    if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'past') {
      return ([
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.retirement.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.retirement.info,
          name: `jobs.${index}.contributionsAndBonuses.retirement.checked`,
          label: lang(getRetirementLabel(values, index)),
          groupName: 'retirement',
          showFields: values.jobs[index].contributionsAndBonuses.retirement.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.retirement.checked`].open,
            ariaLabel: '401k - Help Tip',
            elements: () => ToolTips.retirementToolTip(),
            dataTestID: `retirement${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.retirement.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.retirement.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.retirementYTD'),
                name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amountYTD`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `retirement${index}YTD-${fieldArrIndex}`,
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.info,
          name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`,
          label: lang(getCafeteriaPlanLabel(values, index)),
          groupName: 'cafeteriaPlan',
          showFields: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`].open,
            ariaLabel: 'Cafeteria Plan - Help Tip',
            elements: () => ToolTips.cafeteriaPlanToolTip(),
            dataTestID: `cafeteriaPlan${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.cafeterialPlanYTD'),
                name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amountYTD`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `cafeteriaPlan${index}-${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.bonusPast.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.bonusPast.info,
          name: `jobs.${index}.contributionsAndBonuses.bonusPast.checked`,
          label: lang(getBonusPastLabel(values, index)),
          groupName: 'bonusPast',
          showFields: values.jobs[index].contributionsAndBonuses.bonusPast.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.bonusPast.checked`].open,
            ariaLabel: 'Bonus Past - Help Tip',
            elements: () => ToolTips.bonusPastToolTip(),
            dataTestID: `bonusPast${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.bonusPast.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.bonusPast.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.bonusCurrencyLabel'),
                name: `jobs.${index}.contributionsAndBonuses.bonusPast.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `bonusPast${index}-${fieldArrIndex}`,
              },
            ]
          )
        },
      ])
    }

    if (hourlyScenarios.showDateRange(values, index) && getIncomeTimeframe(values, index, param) === 'future') {
      return (
        [
          {
            checkedValue: values.jobs[index].contributionsAndBonuses.retirement.checked,
            fieldArray: values.jobs[index].contributionsAndBonuses.retirement.info,
            name: `jobs.${index}.contributionsAndBonuses.retirement.checked`,
            label: lang(getRetirementLabel(values, index)),
            groupName: 'retirement',
            showFields: values.jobs[index].contributionsAndBonuses.retirement.checked,
            disabled: values.jobs[index].noContributions.length > 0,
            noAdd: true,
            helpTip: {
              page: 'incomeWithholding',
              expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.retirement.checked`].open,
              ariaLabel: '401k - Help Tip',
              elements: () => ToolTips.retirementToolTip(),
              dataTestID: `retirement${index}`
            },
            handleChange: () => {
              if (values.jobs[index].contributionsAndBonuses.retirement.checked) {
                setFieldValue(`jobs.${index}.contributionsAndBonuses.retirement.info`, [{ amount: '' }])
              }
            },
            formElements: (fieldArrIndex) => (
              [
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.retirementPayPeriod'),
                  name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amount`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `retirement${index}-${fieldArrIndex}`,
                },
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.retirementYTD'),
                  name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amountYTD`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `retirement${index}YTD-${fieldArrIndex}`,
                },
              ]
            )
          },
          {
            checkedValue: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
            fieldArray: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.info,
            name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`,
            label: lang(getCafeteriaPlanLabel(values, index)),
            groupName: 'cafeteriaPlan',
            showFields: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
            disabled: values.jobs[index].noContributions.length > 0,
            helpTip: {
              page: 'incomeWithholding',
              expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`].open,
              ariaLabel: 'Cafeteria Plan - Help Tip',
              elements: () => ToolTips.cafeteriaPlanToolTip(),
              dataTestID: `cafeteriaPlan${index}`
            },
            handleChange: () => {
              if (values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked) {
                setFieldValue(`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info`, [{ amount: '' }])
              }
            },
            formElements: (fieldArrIndex, remove) => (
              [
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.cafeterialPlanPayPeriod'),
                  name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amount`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `cafeteriaPlan${index}-${fieldArrIndex}`,
                  removeBtnObj: {
                    dataTestID: `deleteButton${fieldArrIndex}`,
                    ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                    fieldArrIndex,
                    remove,
                  }
                },
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.cafeterialPlanYTD'),
                  name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amountYTD`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `cafeteriaPlan${index}YTD-${fieldArrIndex}`,
                  removeBtnObj: {
                    dataTestID: `deleteButton${fieldArrIndex}`,
                    ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                    fieldArrIndex,
                    remove,
                  }
                },
              ]
            )
          },
          {
            checkedValue: values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
            fieldArray: values.jobs[index].contributionsAndBonuses.bonusFuture.info,
            name: `jobs.${index}.contributionsAndBonuses.bonusFuture.checked`,
            label: lang(getBonusFutureLabel(values, index)),
            groupName: 'bonusFuture',
            showFields: values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
            disabled: values.jobs[index].noContributions.length > 0,
            noAdd: true,
            helpTip: {
              page: 'incomeWithholding',
              expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.bonusFuture.checked`].open,
              ariaLabel: 'Future Bonus - Help Tip',
              elements: () => ToolTips.bonusFutureToolTip(),
              dataTestID: `bonusFuture${index}`
            },
            handleChange: () => {
              if (values.jobs[index].contributionsAndBonuses.bonusFuture.checked) {
                setFieldValue(`jobs.${index}.contributionsAndBonuses.bonusFuture.info`, [{ amount: '', employerWillWithhold: [] }])
              }
            },
            formElements: (fieldArrIndex) => (
              [
                {
                  inputType: 'currencyField',
                  label: lang('incomeWithholding.label.bonusCurrencyLabel'),
                  name: `jobs.${index}.contributionsAndBonuses.bonusFuture.info[${fieldArrIndex}].amount`,
                  placeholder: lang('global.placeholder.amount'),
                  className: 'mt-6',
                  dataTestId: `bonusFuture${index}-${fieldArrIndex}`,
                },
                {
                  inputType: 'checkbox',
                  name: `jobs.${index}.contributionsAndBonuses.bonusFuture.info[${fieldArrIndex}]employerWillWithhold`,
                  options: [
                    {
                      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.bonusFutureEmployerWillWithholdMFJ' : 'incomeWithholding.label.bonusFutureEmployerWillWithhold'),
                      id: 'employerWillWithhold',
                      value: 'employerWillWithhold',
                      checkedValue: values?.jobs[index]?.contributionsAndBonuses?.bonusFuture?.info[fieldArrIndex]?.employerWillWithhold.includes('employerWillWithhold'),
                      dataTestId: `employerWillWithhold${index}`,
                    },
                  ]
                },
              ]
            )
          },
        ]
      )
    }

    return (
      [
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.retirement.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.retirement.info,
          name: `jobs.${index}.contributionsAndBonuses.retirement.checked`,
          label: lang(getRetirementLabel(values, index)),
          groupName: 'retirement',
          showFields: values.jobs[index].contributionsAndBonuses.retirement.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.retirement.checked`].open,
            ariaLabel: '401k - Help Tip',
            elements: () => ToolTips.retirementToolTip(),
            dataTestID: `retirement${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.retirement.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.retirement.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.retirementPayPeriod'),
                name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `retirement${index}-${fieldArrIndex}`,
              },
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.retirementYTD'),
                name: `jobs.${index}.contributionsAndBonuses.retirement.info[${fieldArrIndex}].amountYTD`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `retirement${index}YTD-${fieldArrIndex}`,
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.info,
          name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`,
          label: lang(getCafeteriaPlanLabel(values, index)),
          groupName: 'cafeteriaPlan',
          showFields: values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.checked`].open,
            ariaLabel: 'Cafeteria Plan - Help Tip',
            elements: () => ToolTips.cafeteriaPlanToolTip(),
            dataTestID: `cafeteriaPlan${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex, remove) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.cafeterialPlanPayPeriod'),
                name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `cafeteriaPlan${index}-${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.cafeterialPlanYTD'),
                name: `jobs.${index}.contributionsAndBonuses.cafeteriaPlan.info[${fieldArrIndex}].amountYTD`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `cafeteriaPlan${index}YTD-${fieldArrIndex}`,
                removeBtnObj: {
                  dataTestID: `deleteButton${fieldArrIndex}`,
                  ariaLabel: `Remove Cafeteria plan: ${fieldArrIndex + 1}`,
                  fieldArrIndex,
                  remove,
                }
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.bonusFuture.info,
          name: `jobs.${index}.contributionsAndBonuses.bonusFuture.checked`,
          label: lang(getBonusFutureLabel(values, index)),
          groupName: 'bonusFuture',
          showFields: values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          helpTip: {
            page: 'incomeWithholding',
            expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.contributionsAndBonuses.bonusFuture.checked`].open,
            ariaLabel: 'Future Bonus - Help Tip',
            elements: () => ToolTips.bonusFutureToolTip(),
            dataTestID: `bonusFuture${index}`
          },
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.bonusFuture.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.bonusFuture.info`, [{ amount: '', employerWillWithhold: [] }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.bonusCurrencyLabel'),
                name: `jobs.${index}.contributionsAndBonuses.bonusFuture.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `bonusFuture${index}-${fieldArrIndex}`,
              },
              {
                inputType: 'checkbox',
                name: `jobs.${index}.contributionsAndBonuses.bonusFuture.info[${fieldArrIndex}]employerWillWithhold`,
                options: [
                  {
                    label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.bonusFutureEmployerWillWithholdMFJ' : 'incomeWithholding.label.bonusFutureEmployerWillWithhold'),
                    id: 'employerWillWithhold',
                    value: 'employerWillWithhold',
                    checkedValue: values?.jobs[index]?.contributionsAndBonuses?.bonusFuture?.info[fieldArrIndex]?.employerWillWithhold.includes('employerWillWithhold'),
                    dataTestId: `employerWillWithhold${index}`,
                  },
                ]
              },
            ]
          )
        },
        {
          checkedValue: values.jobs[index].contributionsAndBonuses.bonusPast.checked,
          fieldArray: values.jobs[index].contributionsAndBonuses.bonusPast.info,
          name: `jobs.${index}.contributionsAndBonuses.bonusPast.checked`,
          label: lang(getBonusPastLabel(values, index)),
          groupName: 'bonusPast',
          showFields: values.jobs[index].contributionsAndBonuses.bonusPast.checked,
          disabled: values.jobs[index].noContributions.length > 0,
          noAdd: true,
          handleChange: () => {
            if (values.jobs[index].contributionsAndBonuses.bonusPast.checked) {
              setFieldValue(`jobs.${index}.contributionsAndBonuses.bonusPast.info`, [{ amount: '' }])
            }
          },
          formElements: (fieldArrIndex) => (
            [
              {
                inputType: 'currencyField',
                label: lang('incomeWithholding.label.bonusCurrencyLabel'),
                name: `jobs.${index}.contributionsAndBonuses.bonusPast.info[${fieldArrIndex}].amount`,
                placeholder: lang('global.placeholder.amount'),
                className: 'mt-6',
                dataTestId: `bonusPast${index}-${fieldArrIndex}`,
              },
            ]
          )
        },
      ]
    )
  }

  return ([
    {
      inputType: 'radio',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.timePeriodOfJobMFJ' : 'incomeWithholding.label.timePeriodOfJob'),
      name: `jobs.${index}.timePeriodOfJob`,
      id: 'timePeriodOfJob',
      required: true,
      show: hourlyScenarios.showTimePeriodOfJob(values, index),
      className: 'mt-6',
      dataTestId: `timePeriodOfJob${index}`,
      options: [
        {
          id: `jobs.${index}.timePeriodOfJob - allYear`,
          value: 'allYear',
          label: lang('incomeWithholding.label.allYear'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob - currentPortion`,
          value: 'currentPortion',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.currentPortionMFJ' : 'incomeWithholding.label.currentPortion'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob - past`,
          value: 'past',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.pastMFJ' : 'incomeWithholding.label.past'),
        },
        {
          id: `jobs.${index}.timePeriodOfJob - future`,
          value: 'future',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.futureMFJ' : 'incomeWithholding.label.future'),
        },
      ]
    },
    {
      inputType: 'dateRange',
      name: `jobs.${index}.dateRange`,
      label: lang(getDateRangeLabel(values, index)),
      required: true,
      dataTestId: `dateRange${index}`,
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.dateRange`].open,
        ariaLabel: 'Date Range - Help Tip',
        elements: () => ToolTips.dateRangeToolTip(),
      },
      show: hourlyScenarios.showDateRange(values, index),
      fromLabel: lang('incomeWithholding.label.from'),
      toLabel: lang('incomeWithholding.label.to'),
      fromId: `jobs.${index}.dateRange.startDate`,
      toId: `jobs.${index}.dateRange.endDate`,
      fromPlaceholder: lang('global.placeholder.dateField'),
      toPlaceholder: lang('global.placeholder.dateField'),
      isRequired: true,
      index,
      startDateName: `jobs.${index}.dateRange.startDate`,
      endDateName: `jobs.${index}.dateRange.endDate`,
      minFromDate: getDateRange(values, index, param).minFromDate,
      maxFromDate: getDateRange(values, index, param).maxFromDate,
      minToDate: getDateRange(values, index, param).minToDate,
      maxToDate: getDateRange(values, index, param).maxToDate,
      focusedDate: getDateRange(values, index, param).focusedDate,
      langCode,
      fromHintText: lang('global.p.dateFieldHintText'),
      toHintText: lang('global.p.dateFieldHintText'),
    },
    {
      inputType: 'radio',
      label: lang(getPayFrequencyLabel(values, index)),
      name: `jobs.${index}.payFrequency`,
      id: 'payFrequency',
      required: true,
      show: (hourlyScenarios.showDateRange(values, index)
        && errors && errors?.jobs
        && (errors?.jobs[index]?.dateRange?.startDate || errors?.jobs[index]?.dateRange?.endDate))
        ? false : hourlyScenarios.showPayFrequency(values, index, param),
      className: 'mt-6',
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.payFrequency`].open,
        ariaLabel: 'Pay Frequency - Help Tip',
        elements: () => ToolTips.payFrequencyToolTip(),
      },
      dataTestId: `payFrequency${index}`,
      options: [
        {
          id: `jobs.${index}.payFrequency - weekly`,
          value: 'weekly',
          label: lang('incomeWithholding.label.weekly'),
        },
        {
          id: `jobs.${index}.payFrequency - biweekly`,
          value: 'biweekly',
          label: lang('incomeWithholding.label.biweekly'),
        },
        {
          id: `jobs.${index}.payFrequency - twiceMonthly`,
          value: 'twiceMonthly',
          label: lang('incomeWithholding.label.twiceMonthly'),
        },
        {
          id: `jobs.${index}.payFrequency - monthly`,
          value: 'monthly',
          label: lang('incomeWithholding.label.monthly'),
        },
      ]
    },
    {
      inputType: 'htmlBuilder',
      elements: [
        {
          key: 'numOfDepHeading',
          type: 'Heading',
          level: '3',
          className: `font-bold text-xl mt-6 ${hourlyScenarios.showDateLastPayPeriod(values, index, param) ? 'inline-block' : 'hidden'} `,
          text: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.h3.paystubTitleMFJ' : 'incomeWithholding.h3.paystubTitle'),
          dataTestID: `paystubTitle${index}`
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.hourlyWageMFJ' : 'incomeWithholding.label.hourlyWage'),
      name: `jobs.${index}.hourlyWage`,
      required: true,
      show: getShow(values, index, errors, hourlyScenarios.showHourlyWage(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `hourlyWage${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.hoursMFJ' : 'incomeWithholding.label.hours'),
      name: `jobs.${index}.hours`,
      required: true,
      show: getShow(values, index, errors, hourlyScenarios.showHours(values, index, param)),
      allowDecimals: false,
      prefix: '',
      maxLength: 3,
      placeholder: lang('global.placeholder.hours'),
      className: 'mt-6',
      dataTestId: `hours${index}`,
    },
    {
      inputType: 'dateField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.dateLastPayPeriodMFJ' : 'incomeWithholding.label.dateLastPayPeriod'),
      name: `jobs.${index}.dateLastPayPeriod`,
      id: `jobs.${index}.dateLastPayPeriod`,
      placeholder: lang('global.placeholder.dateField'),
      show: hourlyScenarios.showDateLastPayPeriod(values, index, param),
      required: true,
      className: 'mt-6',
      lowerLimit: getDateLastPayPeriodRange(values, index, param).lowerLimit,
      upperLimit: getDateLastPayPeriodRange(values, index, param).upperLimit,
      focusedDate: moment(getToday(param)),
      langCode,
      hintText: lang('global.p.dateFieldHintText'),
    },
    {
      inputType: 'radio',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.payStatementOptionsMFJ' : 'incomeWithholding.label.payStatementOptions'),
      name: `jobs.${index}.payStatementOptions`,
      id: 'payStatementOptions',
      required: true,
      show: getShow(values, index, errors, hourlyScenarios.showPayStatementOptions(values, index, param)),
      className: 'mt-6',
      dataTestId: `payStatementOptions${index}`,
      options: [
        {
          id: `jobs.${index}.payStatementOptions - lastStatement`,
          value: 'lastStatement',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.lastStatementMFJ' : 'incomeWithholding.label.lastStatement'),
        },
        {
          id: `jobs.${index}.payStatementOptions - last2To3Statements`,
          value: 'last2To3Statements',
          label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.last2To3StatementsMFJ' : 'incomeWithholding.label.last2To3Statements'),
        },
      ]
    },
    {
      inputType: 'currencyFieldArray',
      name: `jobs.${index}.hourlyPayStatements`,
      required: true,
      show: getShow(values, index, errors, hourlyScenarios.showHourlyPayStatements(values, index, param)),
      className: values.jobs[index].payStatementOptions === 'last2To3Statements' ? 'ml-8' : '',
      noAdd: values.jobs[index].payStatementOptions === 'lastStatement',
      jobsIndex: index,
      placeholder: lang('global.placeholder.amount'),
      addBtnText: 'incomeWithholding.button.addPayStatement',
    },
    {
      inputType: 'currencyField',
      label: lang(getWagesYTDLabel(values, index)),
      name: `jobs.${index}.wagesYTD`,
      show: getShow(values, index, errors, hourlyScenarios.showWagesPaidYTD(values, index, param)),
      required: true,
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `wagesYTD${index}`,
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.wagesYTD`].open,
        ariaLabel: 'Wages Year to Date - Help Tip',
        elements: () => ToolTips.wagesYTDToolTip(),
      },
    },
    {
      inputType: 'radio',
      label: lang(getIsIncomeAmountCorrect(values, index), { ':payPeriodIncome': formatMoney(getAnnualIncome(site, index, param).perPayPeriodHourly), ':income': formatMoney(getAnnualIncome(site, index, param).calculatedAnnualIncome) }),
      name: `jobs.${index}.isIncomeAmountCorrect`,
      id: 'isIncomeAmountCorrect',
      required: true,
      show: getShow(values, index, errors, hourlyScenarios.showIsIncomeAmountCorrect(values, index, param)),
      className: 'mt-6',
      dataTestId: `isIncomeAmountCorrect${index}`,
      options: [
        {
          id: `jobs.${index}.isIncomeAmountCorrect - yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `jobs.${index}.isIncomeAmountCorrect - no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'currencyField',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.correctedWagesMFJ' : 'incomeWithholding.label.correctedWages'),
      name: `jobs.${index}.correctedWages`,
      required: true,
      show: getShow(values, index, errors, hourlyScenarios.showCorrectedWages(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `correctedWages${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.taxesPerPayPeriod'),
      name: `jobs.${index}.taxesPerPayPeriod`,
      required: true,
      show: getShow(values, index, errors, hourlyScenarios.showTaxesPaidLastPayPeriod(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.taxesPerPayPeriod`].open,
        ariaLabel: 'Taxes per pay period - Help Tip',
        elements: () => ToolTips.taxesPerPayPeriodToolTip(),
      },
      className: 'mt-6',
      dataTestId: `taxesPerPayPeriod${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.taxesYTD'),
      name: `jobs.${index}.taxesYTD`,
      required: true,
      show: getShow(values, index, errors, hourlyScenarios.showTaxesPaidYTD(values, index, param)),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `taxesYTD${index}`,
    },
    {
      inputType: 'conditionalCheckbox',
      name: `jobs.${index}.contributionsAndBonuses`,
      label: lang('incomeWithholding.label.contributionsAndBonuses'),
      show: getShow(values, index, errors, hourlyScenarios.showContributionsAndBonuses(values, index, param)),
      className: 'inline',
      nested: true,
      nestedName: 'jobs',
      nestedIndex: index,
      placeholder: lang('global.placeholder.amount'),
      options: getContributionsOptions(values, index)
    },
    {
      inputType: 'checkbox',
      name: `jobs.${index}.noContributions`,
      dataTestId: `noContributionsCheckboxGroup${index}`,
      className: 'mt-3',
      show: getShow(values, index, errors, hourlyScenarios.showContributionsAndBonuses(values, index, param)),
      options: [
        {
          id: 'none',
          value: 'none',
          label: lang('incomeWithholding.label.noContibutions'),
          dataTestId: 'none',
          className: 'mt-0',
          checkedValue: values.jobs[index].noContributions.includes('none'),
          disabled: values.jobs[index].contributionsAndBonuses.retirement.checked
            || values.jobs[index].contributionsAndBonuses.cafeteriaPlan.checked
            || values.jobs[index].contributionsAndBonuses.bonusPast.checked
            || values.jobs[index].contributionsAndBonuses.bonusFuture.checked,
        },
      ]
    },
  ])
}

export const otherSourcesFormElements = (values, site, lang, setFieldValue) => ([
  {
    inputType: 'conditionalCheckbox',
    label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.otherIncomeMFJ' : 'incomeWithholding.label.otherIncome'),
    name: 'otherIncome',
    placeholder: lang('global.placeholder.amount'),
    className: 'inline',
    pushObject: {
      amount: '',
      taxes: '',
    },
    options: [
      {
        checkedValue: values.otherIncome.scholarship.checked,
        fieldArray: values.otherIncome.scholarship.info,
        name: 'otherIncome.scholarship.checked',
        label: lang('incomeWithholding.label.scholarship'),
        groupName: 'scholarship',
        showFields: values.otherIncome.scholarship.checked,
        disabled: values.noOtherIncome.length > 0,
        helpTip: {
          page: 'incomeWithholding',
          expanded: site.forms.incomeWithholding.helpTips['otherIncome.scholarship.checked'].open,
          ariaLabel: 'Scholarship - Help Tip',
          elements: () => ToolTips.scholarshipToolTip(),
          dataTestID: 'scholarship'
        },
        handleChange: () => {
          if (values.otherIncome.scholarship.checked) {
            setFieldValue('otherIncome.scholarship.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `otherIncome.scholarship.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `scholarship${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
            {
              inputType: 'currencyField',
              label: lang('global.label.taxes'),
              name: `otherIncome.scholarship.info[${fieldArrIndex}].taxes`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `scholarship${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.otherIncome.unemployment.checked,
        fieldArray: values.otherIncome.unemployment.info,
        name: 'otherIncome.unemployment.checked',
        label: lang('incomeWithholding.label.unemployment'),
        groupName: 'unemployment',
        showFields: values.otherIncome.unemployment.checked,
        disabled: values.noOtherIncome.length > 0,
        handleChange: () => {
          if (values.otherIncome.unemployment.checked) {
            setFieldValue('otherIncome.unemployment.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `otherIncome.unemployment.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `unemployment${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
            {
              inputType: 'currencyField',
              label: lang('global.label.taxes'),
              name: `otherIncome.unemployment.info[${fieldArrIndex}].taxes`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `unemployment${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.otherIncome.selfEmployment.checked,
        fieldArray: values.otherIncome.selfEmployment.info,
        name: 'otherIncome.selfEmployment.checked',
        label: lang('incomeWithholding.label.selfEmployment'),
        groupName: 'selfEmployment',
        showFields: values.otherIncome.selfEmployment.checked,
        disabled: values.noOtherIncome.length > 0,
        helpTip: {
          page: 'incomeWithholding',
          expanded: site.forms.incomeWithholding.helpTips['otherIncome.selfEmployment.checked'].open,
          ariaLabel: 'Self-Employment - Help Tip',
          elements: () => ToolTips.selfEmploymentToolTip(),
          dataTestID: 'selfEmployment'
        },
        handleChange: () => {
          if (values.otherIncome.selfEmployment.checked) {
            setFieldValue('otherIncome.selfEmployment.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `otherIncome.selfEmployment.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `selfEmployment${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
            {
              inputType: 'currencyField',
              label: lang('global.label.taxes'),
              name: `otherIncome.selfEmployment.info[${fieldArrIndex}].taxes`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `selfEmployment${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.otherIncome.investments.checked,
        fieldArray: values.otherIncome.investments.info,
        name: 'otherIncome.investments.checked',
        label: lang('incomeWithholding.label.investments'),
        groupName: 'investments',
        showFields: values.otherIncome.investments.checked,
        disabled: values.noOtherIncome.length > 0,
        helpTip: {
          page: 'incomeWithholding',
          expanded: site.forms.incomeWithholding.helpTips['otherIncome.investments.checked'].open,
          ariaLabel: 'Investments - Help Tip',
          elements: () => ToolTips.investmentsToolTip(),
          dataTestID: 'investments'
        },
        handleChange: () => {
          if (values.otherIncome.investments.checked) {
            setFieldValue('otherIncome.investments.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `otherIncome.investments.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `investments${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
            {
              inputType: 'currencyField',
              label: lang('global.label.taxes'),
              name: `otherIncome.investments.info[${fieldArrIndex}].taxes`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `investments${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.otherIncome.otherTaxableIncome.checked,
        fieldArray: values.otherIncome.otherTaxableIncome.info,
        name: 'otherIncome.otherTaxableIncome.checked',
        label: lang('incomeWithholding.label.otherTaxableIncome'),
        groupName: 'otherTaxableIncome',
        showFields: values.otherIncome.otherTaxableIncome.checked,
        disabled: values.noOtherIncome.length > 0,
        helpTip: {
          page: 'incomeWithholding',
          expanded: site.forms.incomeWithholding.helpTips['otherIncome.otherTaxableIncome.checked'].open,
          ariaLabel: 'Other Taxable Income - Help Tip',
          elements: () => ToolTips.otherTaxableIncomeToolTip(),
          dataTestID: 'otherTaxableIncome'
        },
        handleChange: () => {
          if (values.otherIncome.otherTaxableIncome.checked) {
            setFieldValue('otherIncome.otherTaxableIncome.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `otherIncome.otherTaxableIncome.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `otherTaxableIncome${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      {
        checkedValue: values.otherIncome.otherTaxes.checked,
        fieldArray: values.otherIncome.otherTaxes.info,
        name: 'otherIncome.otherTaxes.checked',
        label: lang('incomeWithholding.label.otherTaxes'),
        groupName: 'otherTaxes',
        showFields: values.otherIncome.otherTaxes.checked,
        disabled: values.noOtherIncome.length > 0,
        helpTip: {
          page: 'incomeWithholding',
          expanded: site.forms.incomeWithholding.helpTips['otherIncome.otherTaxes.checked'].open,
          ariaLabel: 'Other Taxes - Help Tip',
          elements: () => ToolTips.otherTaxesToolTip(),
          dataTestID: 'otherTaxes'
        },
        handleChange: () => {
          if (values.otherIncome.otherTaxes.checked) {
            setFieldValue('otherIncome.otherTaxes.info', [{ amount: '' }])
          }
        },
        formElements: (fieldArrIndex, remove) => (
          [
            {
              inputType: 'currencyField',
              label: lang('global.label.amount'),
              name: `otherIncome.otherTaxes.info[${fieldArrIndex}].amount`,
              placeholder: lang('global.placeholder.amount'),
              className: 'mt-6',
              dataTestId: `otherTaxes${fieldArrIndex}`,
              removeBtnObj: {
                dataTestID: `deleteButton${fieldArrIndex}`,
                ariaLabel: `Remove Student Loan Interest Deduction: ${fieldArrIndex + 1}`,
                fieldArrIndex,
                remove,
              }
            },
          ]
        )
      },
      // {
      //   checkedValue: values?.otherIncome?.plannedEstimatedTaxPayments?.checked,
      //   fieldArray: values?.otherIncome?.plannedEstimatedTaxPayments?.info,
      //   name: 'otherIncome.plannedEstimatedTaxPayments.checked',
      //   label: lang('incomeWithholding.label.plannedEstimatedTaxPayments'),
      //   groupName: 'plannedEstimatedTaxPayments',
      //   showFields: values?.otherIncome?.plannedEstimatedTaxPayments?.checked,
      //   disabled: values?.noOtherIncome?.length > 0,
      //   noAdd: true,
      //   handleChange: () => {
      //     if (values?.otherIncome?.plannedEstimatedTaxPayments?.checked) {
      //       setFieldValue('otherIncome.plannedEstimatedTaxPayments.info', [{ amount: '' }])
      //     }
      //   },
      //   formElements: (fieldArrIndex) => (
      //     [
      //       {
      //         inputType: 'currencyField',
      //         label: lang('global.label.amount'),
      //         name: `otherIncome.plannedEstimatedTaxPayments.info[${fieldArrIndex}].amount`,
      //         placeholder: lang('global.placeholder.amount'),
      //         className: 'mt-4',
      //         dataTestId: `plannedEstimatedTaxPayments${fieldArrIndex}-input`,
      //       },
      //     ]
      //   )
      // },
    ]
  },
  {
    inputType: 'checkbox',
    name: 'noOtherIncome',
    dataTestId: 'noOtherIncomeCheckbox',
    className: 'mt-3',
    options: [
      {
        id: 'none',
        value: 'none',
        label: lang('incomeWithholding.label.noOtherIncome'),
        dataTestId: 'none',
        className: 'mt-0',
        checkedValue: site.forms.incomeWithholding.values.noOtherIncome.includes('none'),
        disabled: values.otherIncome.scholarship.checked
          || values.otherIncome.unemployment.checked
          || values.otherIncome.selfEmployment.checked
          || values.otherIncome.investments.checked
          || values.otherIncome.otherTaxableIncome.checked
          || values.otherIncome.otherTaxes.checked
      },
    ]
  },
])

export const ssiFormElements = (values, site, lang, langCode, index, param) => {
  const getTaxesYTDLabel = (values, index) => {
    let taxesYTDLabel = `incomeWithholding.label.taxesYTDSsiAllYear${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}`

    if (ssiScenarios.showDateRange(values, index) && isPast(values, index, param)) {
      taxesYTDLabel = 'incomeWithholding.label.taxesYTDSsiPast'
    } else if (values.jobs[index].ssiAllYear === 'yes' || (ssiScenarios.showDateRange(values, index) && isCurrentPortion(values, index, param))) {
      taxesYTDLabel = `incomeWithholding.label.taxesYTDSsiAllYear${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}`
    }

    return taxesYTDLabel
  }

  const getSsiMonthlyAmountLabel = (values, index) => {
    let payFrequencyLabel = `incomeWithholding.label.ssiMonthlyAmount${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`

    if (isFuture(values, index, param)) {
      payFrequencyLabel = `incomeWithholding.label.ssiMonthlyAmount${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}Future`
    } else if (values.jobs[index].ssiAllYear === 'yes' || (ssiScenarios.showDateRange(values, index) && isCurrentPortion(values, index, param))) {
      payFrequencyLabel = `incomeWithholding.label.ssiMonthlyAmount${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}AllYear`
    }

    return payFrequencyLabel
  }

  return ([
    {
      inputType: 'radio',
      label: lang(site.forms.aboutYou.values.filingStatus === 'married' ? 'incomeWithholding.label.ssiAllYearMFJ' : 'incomeWithholding.label.ssiAllYear'),
      name: `jobs.${index}.ssiAllYear`,
      id: 'ssiAllYear',
      required: true,
      show: ssiScenarios.showSsiAllYear(values, index),
      className: 'mt-6',
      dataTestId: `ssiAllYear${index}`,
      options: [
        {
          id: `jobs.${index}.ssiAllYear - yes`,
          value: 'yes',
          label: lang('global.label.yes'),
        },
        {
          id: `jobs.${index}.ssiAllYear - no`,
          value: 'no',
          label: lang('global.label.no'),
        },
      ]
    },
    {
      inputType: 'dateRange',
      name: `jobs.${index}.dateRange`,
      label: lang('incomeWithholding.label.dateRangeSSI'),
      required: true,
      dataTestId: `dateRange${index}`,
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.dateRange`].open,
        ariaLabel: 'Date Range - Help Tip',
        elements: () => ToolTips.dateRangeSSIToolTip(),
      },
      show: ssiScenarios.showDateRange(values, index),
      fromLabel: lang('incomeWithholding.label.from'),
      toLabel: lang('incomeWithholding.label.to'),
      fromId: `jobs.${index}.dateRange.startDate`,
      toId: `jobs.${index}.dateRange.endDate`,
      fromPlaceholder: lang('global.placeholder.dateField'),
      toPlaceholder: lang('global.placeholder.dateField'),
      isRequired: true,
      index,
      startDateName: `jobs.${index}.dateRange.startDate`,
      endDateName: `jobs.${index}.dateRange.endDate`,
      minFromDate: getDateRange(values, index, param).minFromDate,
      maxFromDate: getDateRange(values, index, param).maxFromDate,
      minToDate: getDateRange(values, index, param).minToDate,
      maxToDate: getDateRange(values, index, param).maxToDate,
      focusedDate: getDateRange(values, index, param).focusedDate,
      langCode,
      fromHintText: lang('global.p.dateFieldHintText'),
      toHintText: lang('global.p.dateFieldHintText'),
    },
    {
      inputType: 'currencyField',
      label: lang(getSsiMonthlyAmountLabel(values, index)),
      name: `jobs.${index}.ssiMonthlyAmount`,
      show: ssiScenarios.showSsiMonthlyAmount(values, index, param) || ssiScenarios.showSsiMonthlyAmountFuture(values, index, param),
      required: true,
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `ssiMonthlyAmount${index}`,
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.ssiMonthlyAmount`].open,
        ariaLabel: 'SSI Monthly Amount - Help Tip',
        elements: () => ToolTips.ssiMonthlyAmountToolTip(),
      },
    },
    {
      inputType: 'currencyField',
      label: lang('incomeWithholding.label.ssiBenefitsYTDSSI'),
      name: `jobs.${index}.ssiBenefitsYTD`,
      required: true,
      show: ssiScenarios.showSsiBenefitsYTD(values, index, param),
      placeholder: lang('global.placeholder.amount'),
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.ssiBenefitsYTD`].open,
        ariaLabel: 'SSI Benefits Year to Date - Help Tip',
        elements: () => ToolTips.ssiBenefitsYTDToolTip(),
      },
      className: 'mt-6',
      dataTestId: `ssiBenefitsYTD${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang(getTaxesYTDLabel(values, index)),
      name: `jobs.${index}.taxesYTD`,
      required: true,
      show: ssiScenarios.showTaxesPaidYTD(values, index, param),
      placeholder: lang('global.placeholder.amount'),
      className: 'mt-6',
      dataTestId: `taxesYTD${index}`,
    },
    {
      inputType: 'currencyField',
      label: lang(`incomeWithholding.label.taxesPerPayPeriodSSI${site.forms.aboutYou.values.filingStatus === 'married' ? 'MFJ' : ''}`),
      name: `jobs.${index}.taxesPerPayPeriod`,
      required: true,
      show: ssiScenarios.showTaxesPaidLastPayPeriod(values, index, param),
      placeholder: lang('global.placeholder.amount'),
      helpTip: {
        page: 'incomeWithholding',
        expanded: site.forms.incomeWithholding.helpTips[`jobs.${index}.taxesPerPayPeriod`].open,
        ariaLabel: 'Taxes Per Pay Period - Help Tip',
        elements: () => ToolTips.taxesPerPayPeriodToolTip(),
      },
      className: 'mt-6',
      dataTestId: `taxesPerPayPeriod${index}`,
    },
  ])
}
